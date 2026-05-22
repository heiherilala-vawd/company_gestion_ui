# URL Schema & Resolver

## Concept

A **URL schema** is a declarative map that associates each resource name with a URL template. A **URL resolver** reads the schema, resolves `{placeholder}` variables from a context source, and returns the final URL.

This keeps URL logic in one place, makes hierarchy levels visible, and avoids scattering URL construction across the codebase.

## URL Schema

Define a constant that maps resource names to URL templates:

```typescript
const RESOURCE_URLS: Record<string, string> = {
  // Root resources (no context)
  'users':              '/users',
  'roles':              '/roles',

  // Level 1 — scoped by organization
  'organizations':      '/organizations',
  'projects':           '/organizations/{orgId}/projects',

  // Level 2 — scoped by organization + project
  'tasks':              '/organizations/{orgId}/projects/{projectId}/tasks',
  'milestones':         '/organizations/{orgId}/projects/{projectId}/milestones',

  // Level 3 — scoped by organization + project + task
  'comments':           '/organizations/{orgId}/projects/{projectId}/tasks/{taskId}/comments',
  'attachments':        '/organizations/{orgId}/projects/{projectId}/tasks/{taskId}/attachments',

  // Special endpoints (not standard CRUD)
  'task_assignees':     '/organizations/{orgId}/projects/{projectId}/tasks/{taskId}/assignees',
}
```

### Naming Rules

- Resource names should be plural and lowercase (React Admin convention)
- Placeholders use `{camelCase}` syntax
- Every placeholder corresponds to a key in the context source (localStorage, React context, URL params)
- Resources with the same placeholder set belong to the same hierarchy level

## URL Resolver

A pure function that takes a resource name and returns the resolved URL:

```typescript
interface ContextSource {
  get(key: string): string | null
}

interface URLResolver {
  getListUrl(resource: string, query?: string): string
  getOneUrl(resource: string, id: string): string
  createUrl(resource: string): string
  updateUrl(resource: string): string
  deleteUrl(resource: string, id: string): string
}

function createURLResolver(
  schema: Record<string, string>,
  context: ContextSource,
  apiBaseUrl: string = '',
): URLResolver {
  const resolve = (resource: string): string => {
    const template = schema[resource]
    if (!template) {
      // Fallback to flat URL for unknown resources
      return `${apiBaseUrl}/${resource}`
    }
    // Replace {placeholders} with values from context source
    const url = template.replace(/\{(\w+)\}/g, (_, key) => {
      const value = context.get(key)
      if (!value) throw new Error(`Missing context value: ${key} (for resource: ${resource})`)
      return encodeURIComponent(value)
    })
    return `${apiBaseUrl}${url}`
  }

  return {
    getListUrl: (resource, query) => {
      const base = resolve(resource)
      return query ? `${base}?${query}` : base
    },
    getOneUrl: (resource, id) => `${resolve(resource)}/${encodeURIComponent(id)}`,
    createUrl: (resource) => resolve(resource),
    updateUrl: (resource) => resolve(resource),
    deleteUrl: (resource, id) => `${resolve(resource)}/${encodeURIComponent(id)}`,
  }
}
```

The `context.get(key)` abstraction lets you plug in any source:

```typescript
// From localStorage
const localStorageSource: ContextSource = {
  get: (key) => localStorage.getItem(key),
}

// From URL search params
const urlParamSource: ContextSource = {
  get: (key) => new URLSearchParams(window.location.search).get(key),
}

// From React context (via a ref or callback)
const reactContextSource: ContextSource = {
  get: (key) => contextValuesRef.current[key] ?? null,
}
```

## Context Key Convention

Choose a naming convention for your placeholders and stick to it. Common options:

| Convention | Example | Notes |
|------------|---------|-------|
| `{resource}Id` | `{orgId}`, `{projectId}` | Clear and explicit |
| `{resource}_id` | `{org_id}`, `{project_id}` | Matches database/snake_case conventions |
| `current{Resource}Id` | `{currentOrgId}` | Distinct from entity IDs |

The convention must match between the URL templates and the context source keys.

## Fallback Strategy

Resources not listed in the schema fall back to the flat `/{resource}` or `/{resource}/{id}` pattern. This lets you mix flat and hierarchical resources without listing everything.

```typescript
const resolve = (resource: string): string => {
  const template = schema[resource]
  if (!template) return `${apiBaseUrl}/${resource}`
  // ...
}
```

## Verification Checklist

- [ ] Every hierarchy level has a corresponding placeholder in the URL templates
- [ ] All placeholders resolve to a non-null value at runtime
- [ ] Resources not in the schema get a valid fallback URL
- [ ] Special/custom endpoints are listed if they use the same placeholders
- [ ] The context source is injectable (testable without DOM/browser)
- [ ] URL encoding is applied to placeholder values
