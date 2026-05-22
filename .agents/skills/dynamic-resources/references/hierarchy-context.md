# Hierarchy Context Management

## Concept

Each hierarchy level (e.g., Organization, Project, Task) gets a React context that:
1. Stores the currently selected entity ID
2. Persists it (localStorage, sessionStorage, URL params, etc.)
3. Provides `selectEntity` and `clearEntity` actions
4. Re-renders children when the selection changes

Contexts are nested so that changing a parent level automatically resets or refreshes child levels.

## Generic Context Factory

```typescript
import { createContext, useContext, useState, ReactNode } from 'react'

interface HierarchyContextConfig {
  storageKey: string       // e.g., 'currentOrgId'
  entityName: string       // e.g., 'Organization' (for error messages)
  storage?: Storage        // localStorage by default, but injectable
}

interface HierarchyContextType {
  currentId: string | null
  selectEntity: (id: string | null) => void
  clearEntity: () => void
  config: HierarchyContextConfig
}

function createHierarchyContext(config: HierarchyContextConfig) {
  const storage = config.storage ?? localStorage
  const Context = createContext<HierarchyContextType | undefined>(undefined)

  const Provider = ({ children }: { children: ReactNode }) => {
    const [currentId, setCurrentId] = useState<string | null>(() => {
      return storage.getItem(config.storageKey)
    })

    const selectEntity = (id: string | null) => {
      setCurrentId(id)
      if (id) {
        storage.setItem(config.storageKey, id)
      } else {
        storage.removeItem(config.storageKey)
      }
    }

    const clearEntity = () => {
      setCurrentId(null)
      storage.removeItem(config.storageKey)
    }

    return (
      <Context.Provider value={{ currentId, selectEntity, clearEntity, config }}>
        {children}
      </Context.Provider>
    )
  }

  const useEntity = (): HierarchyContextType => {
    const ctx = useContext(Context)
    if (!ctx) {
      throw new Error(`useEntity("${config.entityName}") must be used within its Provider`)
    }
    return ctx
  }

  return { Provider, useEntity }
}
```

## Usage Example

```typescript
// contexts.ts
const OrgContext = createHierarchyContext({
  storageKey: 'currentOrgId',
  entityName: 'Organization',
})

const ProjectContext = createHierarchyContext({
  storageKey: 'currentProjectId',
  entityName: 'Project',
})

const TaskContext = createHierarchyContext({
  storageKey: 'currentTaskId',
  entityName: 'Task',
})

export const OrganizationProvider = OrgContext.Provider
export const useOrganization = OrgContext.useEntity

export const ProjectProvider = ProjectContext.Provider
export const useProject = ProjectContext.useEntity

export const TaskProvider = TaskContext.Provider
export const useTask = TaskContext.useEntity
```

```tsx
// App.tsx
<OrganizationProvider>
  <ProjectProvider>
    <TaskProvider>
      <Admin dataProvider={provider}>
        {/* resources */}
      </Admin>
    </TaskProvider>
  </ProjectProvider>
</OrganizationProvider>
```

## Provider Order

The order of nesting must match the URL hierarchy:

```typescript
// URL template: /orgs/{orgId}/projects/{projectId}/tasks
// Provider order (outer → inner):  Org → Project → Task
// This matches the URL left-to-right: orgId → projectId → taskId
```

When Organization changes, ProjectProvider re-renders its children, which re-fetches the project list. TaskProvider does the same when Project changes.

## Clearing Child Contexts

When a parent selection changes, child selections become stale. The simplest solution: React unmounts and remounts children via a `key` prop.

```typescript
function ProjectProvider({ children }) {
  const org = useOrganization()
  // When orgId changes, force remount of all children
  return (
    <InternalProjectProvider key={org.currentId}>
      {children}
    </InternalProjectProvider>
  )
}
```

This ensures child selectors re-fetch their data when the parent changes, without manual cleanup.

## Persistence Options

| Source | When to Use |
|--------|-------------|
| `localStorage` | Persists across tabs and browser restarts |
| `sessionStorage` | Persists within the tab session |
| `URL search params` | Shareable/bookmarkable state (e.g., `?orgId=123`) |
| `React state only` | No persistence needed (resets on page reload) |
| Hybrid (URL + storage) | Read from URL on load, write to storage on change |

## Notification on Change

When a hierarchy level changes, other parts of the app may need to react. Use a custom event or a simple pub/sub:

```typescript
const hierarchyChangeEvent = new CustomEvent('hierarchy:change', {
  detail: { level: 'organization', id: 'org_123' },
})
window.dispatchEvent(hierarchyChangeEvent)

// Listen elsewhere:
window.addEventListener('hierarchy:change', (e) => {
  // Re-fetch data, update UI, etc.
})
```

## Verification Checklist

- [ ] Each hierarchy level has its own context with its own storage key
- [ ] Providers are nested in the correct order (matches URL hierarchy)
- [ ] Changing a parent context clears/resets child contexts
- [ ] The factory is generic — storage backend is injectable
- [ ] Error message is thrown when a hook is used outside its provider
- [ ] `selectEntity(null)` or `clearEntity()` correctly removes the stored value
