# Hierarchy Selectors (Cascade Dropdowns)

## Concept

A hierarchy selector is a dropdown that:
1. Fetches its options from the API (scoped to the current parent context)
2. Displays the current selection
3. Updates the context when the user picks a different item
4. Auto-selects the first item if nothing is chosen (`autoSelectFirst`)

Selectors are placed in the app bar or a dedicated toolbar so the user can navigate the hierarchy from anywhere.

## Generic Selector Component

```typescript
import { useState, useEffect } from 'react'
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from '@mui/material'

interface HierarchySelectorProps {
  label: string
  apiEndpoint: string            // URL to fetch available entities
  context: HierarchyContextType  // from createHierarchyContext
  labelField?: string            // which field to display (default: 'name')
  autoSelectFirst?: boolean
  disabled?: boolean
}

function HierarchySelector({
  label,
  apiEndpoint,
  context,
  labelField = 'name',
  autoSelectFirst = false,
  disabled = false,
}: HierarchySelectorProps) {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch options when apiEndpoint changes (parent context changed)
  useEffect(() => {
    let cancelled = false
    setLoading(true)

    fetch(apiEndpoint, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return
        const list = Array.isArray(data) ? data : data.data ?? []
        setItems(list)
        // Auto-select first if nothing selected
        if (autoSelectFirst && list.length > 0 && !context.currentId) {
          context.selectEntity(list[0].id)
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))

    return () => { cancelled = true }
  }, [apiEndpoint])

  const handleChange = (event: any) => {
    context.selectEntity(event.target.value)
  }

  return (
    <FormControl size="small" disabled={disabled || loading}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={context.currentId ?? ''}
        onChange={handleChange}
        label={label}
      >
        {loading ? (
          <MenuItem disabled>
            <CircularProgress size={20} />
          </MenuItem>
        ) : (
          items.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item[labelField] ?? item.id}
            </MenuItem>
          ))
        )}
      </Select>
    </FormControl>
  )
}
```

## Specialized Selectors

Create one selector per hierarchy level by pre-configuring the generic component:

```typescript
function OrganizationSelector() {
  const orgContext = useOrganization()
  return (
    <HierarchySelector
      label="Organization"
      apiEndpoint="/organizations"
      context={orgContext}
      autoSelectFirst={true}
    />
  )
}

function ProjectSelector() {
  const orgContext = useOrganization()
  const projectContext = useProject()
  const orgId = orgContext.currentId

  if (!orgId) return null  // Don't render until parent is set

  return (
    <HierarchySelector
      label="Project"
      apiEndpoint={`/organizations/${orgId}/projects`}
      context={projectContext}
      autoSelectFirst={true}
    />
  )
}

function TaskSelector() {
  const projectContext = useProject()
  const taskContext = useTask()
  const projectId = projectContext.currentId

  if (!projectId) return null

  return (
    <HierarchySelector
      label="Task"
      apiEndpoint={`/organizations/${orgContext.currentId}/projects/${projectId}/tasks`}
      context={taskContext}
      autoSelectFirst={false}
    />
  )
}
```

## Rendering Selectors

Place selectors in a toolbar, app bar, or sidebar — anywhere that's always visible:

```tsx
function AppBar() {
  return (
    <Toolbar>
      <OrganizationSelector />
      <ProjectSelector />
      <TaskSelector />
    </Toolbar>
  )
}
```

Each selector automatically hides or disables when its parent context is not set.

## Cascade Behavior

| Action | Effect |
|--------|--------|
| User selects Organization A | `currentOrgId = A` → `ProjectSelector` re-fetches with `orgId=A` → Project selection resets |
| User selects Project B | `currentProjectId = B` → `TaskSelector` re-fetches with `projectId=B` → Task selection resets |
| User clears Organization | `currentOrgId = null` → all child selectors hide/disable |
| No items in list | Selector shows empty state |

## Auto-Select Logic

The `autoSelectFirst` flag should be used strategically:

- **First level** (root): usually `true` — pick the first org by default
- **Middle levels**: `true` if the app needs a fully-specified context (all levels selected), `false` if the user should explicitly choose
- **Leaf levels**: usually `false` — let the user pick explicitly

## Error and Loading States

| State | Display |
|-------|---------|
| Loading | Spinner inside the select, select disabled |
| Empty list | Disabled with "No items" label (or hide entirely) |
| Network error | Keep previous selection, show error tooltip |
| Unauthorized | Redirect to login (handled by data provider) |

## Verification Checklist

- [ ] Each selector fetches from the correct endpoint (scoped to parent context)
- [ ] Selector is disabled/hidden when parent context is missing
- [ ] Changing parent selector causes child selectors to re-fetch and reset
- [ ] `autoSelectFirst` works correctly (selects first item only on initial load)
- [ ] Loading state is shown during fetch
- [ ] Selector uses the same auth mechanism as the data provider
- [ ] The `apiEndpoint` is built using the URL resolver (or follows the same pattern)
