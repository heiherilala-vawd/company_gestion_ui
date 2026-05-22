---
name: dynamic-resources
description: >
  Adapt React Admin to hierarchical or contextual REST APIs where URLs
  follow patterns like /orgs/{id}/projects/{id}/tasks. Covers URL schema
  resolution, custom data provider patterns, hierarchy context management,
  and cascade selectors. Use this whenever your backend uses nested URLs,
  dynamic resource paths, context-dependent API calls, or non-flat REST
  endpoints — including when debugging why a React Admin data provider is
  hitting the wrong URL or returning empty data.
---

# Dynamic Resources (Hierarchical API Pattern for React Admin)

## Problem

React Admin expects a flat REST API: `GET /{resource}`, `GET /{resource}/{id}`. This assumption breaks when your backend uses nested or contextual URLs:

```
GET /organizations/{orgId}/projects
GET /organizations/{orgId}/projects/{projectId}/tasks
```

You need to **translate** React Admin's flat resource names into the correct hierarchical URLs at runtime.

This skill teaches a generic 4-layer pattern to bridge the gap without forking React Admin. It works with any backend URL structure and any number of hierarchy levels.

## Why This Pattern

Scattering URL construction across components or hardcoding paths in the data provider leads to:
- Duplicated logic when two resources share the same URL pattern
- Silent bugs when a resource is moved to a different hierarchy level
- Impossible-to-test URL construction buried inside fetch calls
- Painful onboarding — every developer must rediscover the URL scheme

A declarative schema + resolver **centralizes** all URL logic. One place to read, one place to change, one place to test.

## When to Use This Skill

- You are creating a new resource that lives under a parent context (organization, project, workspace, team — any parent-child API relationship)
- You need to add a new hierarchy level (a new parent entity that scopes all child resources)
- The data provider is hitting 404s because the URL doesn't include the parent ID
- You need to debug why `getList('tasks')` is calling `/tasks` instead of `/organizations/{id}/tasks`
- You're modifying or replacing the data provider and need to understand the URL contract
- You're setting up a new React Admin project with a non-flat backend from scratch
- You see "undefined" or "null" in API URLs — a context value is missing

Do NOT load this skill for standard CRUD work on flat API endpoints like `GET /users`, `GET /users/{id}`.

## How to Apply

### Step 1: Map your URL schema

Identify every resource in your API and write its URL pattern. Highlight the parts that change based on context (parent IDs, user IDs, etc.) — those become `{placeholders}`. Group resources by which placeholders they share — each group is one hierarchy level.

```typescript
const RESOURCE_URLS: Record<string, string> = {
  'users':              '/users',
  'organizations':      '/organizations',
  'projects':           '/organizations/{orgId}/projects',
  'tasks':              '/organizations/{orgId}/projects/{projectId}/tasks',
  'comments':           '/organizations/{orgId}/projects/{projectId}/tasks/{taskId}/comments',
}
```

**Why a declarative schema?** Because you can read it at a glance and know your entire URL structure. Compare that to hunting through 5 files for scattered string concatenations.

### Step 2: Choose a context source

Decide where `{placeholder}` values come from:
- **localStorage** — persists across tabs and sessions, good for "current workspace" type selections
- **URL search params** — bookmarkable/shareable state via `?orgId=xxx`
- **React context** — reactive, no persistence, good for transient selections
- **Hybrid** — read from URL on load, persist changes to localStorage

The context source is injectable — wrap it in a `{ get(key): string | null }` interface so your resolver stays pure and testable.

### Step 3: Implement the URL resolver

The resolver is a pure function: `resource name + context values → URL`. Implement three variants: one for list queries (with query string), one for single-entity queries (with ID), and one for mutations (create/update at the resource root).

```typescript
function createURLResolver(schema, context, apiBaseUrl): URLResolver
// → { getListUrl, getOneUrl, createUrl, updateUrl, deleteUrl }
```

**Why keep it pure?** Pure functions are trivially testable: mock the context source, pass a resource name, assert the output URL. No DOM, no mocks, no setup.

### Step 4: Build or wrap the data provider

Choose the right approach:

| Situation | Approach |
|-----------|----------|
| You already have a working provider (ra-data-simple-rest, etc.) | **Wrapper** — wrap it, override only the URL step |
| You need auth headers, date serialization, custom error handling | **Full custom** — implement from scratch |
| You only have a few hierarchical resources among many flat ones | **Fallback** — resolve only listed resources, fallback to flat for the rest |

Neither is "better" — choose based on how much control you need vs. how much you want to reuse.

### Step 5: Create hierarchy contexts

One React context per hierarchy level. Each context stores the current selection, persists it, and provides `selectEntity` / `clearEntity`.

Use a factory to avoid repeating the same boilerplate:

```typescript
const { Provider, useEntity } = createHierarchyContext({
  storageKey: 'currentOrgId',
  entityName: 'Organization',
})
```

**Crucial: make child contexts re-mount when the parent changes.** Use a `key` prop on the child provider so React unmounts and remounts everything below — stale child selections are automatically cleared, and selectors re-fetch with the new parent ID:

```typescript
function ProjectProvider({ children }) {
  const org = useOrganization()
  return <InternalProjectProvider key={org.currentId}>{children}</InternalProjectProvider>
}
```

### Step 6: Create cascade selectors

One dropdown per hierarchy level. Each fetches its options from the parent context's scoped endpoint. When the user changes the parent, the child re-fetches automatically (because the `key` prop forced remount).

Place selectors in the app bar so the user can navigate the hierarchy from anywhere.

### Step 7: Nest and test

Nest providers outer-to-inner matching URL hierarchy, wrap `<Admin>`, and test:
- **Unit**: URL resolver (pure function tests)
- **Integration**: data provider (mocked fetch)
- **Component**: context + selectors (React Testing Library)
- **E2E**: full cascade + CRUD (Cypress)

## Common Pitfalls

| Pitfall | Symptom | Fix |
|---------|---------|-----|
| Placeholder missing at runtime | `undefined` in URL, 404 errors | Ensure context source provides every key the schema references |
| Parent change doesn't clear child | Stale child selection persists | Add `key={parent.currentId}` to child provider |
| Selector fetches before parent is ready | Empty dropdown or wrong data | Guard with `if (!parentId) return null` |
| Schema lists resource but resolver falls to flat | URL doesn't have hierarchy but should | Check `schema[resource]` returns the right template |
| Placeholder value not URL-encoded | Spaces/special chars break the URL | Use `encodeURIComponent()` on every placeholder |

## Reference Files

- `references/url-resolver.md` — Full schema definition with resolver implementation
- `references/data-provider.md` — Wrapper vs custom provider, CRUD conventions, error handling
- `references/hierarchy-context.md` — Context factory, provider nesting, child clearing
- `references/hierarchy-selectors.md` — Cascade dropdown component, auto-select strategy
- `references/testing.md` — Unit, integration, component, and E2E test patterns
