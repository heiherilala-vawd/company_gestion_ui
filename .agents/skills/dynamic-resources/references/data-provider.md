# Custom Data Provider for Hierarchical APIs

## Approaches

There are two strategies. Choose based on your project's needs.

### Approach A: Wrapper (Composition)

Wrap an existing data provider (like `ra-data-simple-rest` or `ra-data-json-server`) and intercept only the URL building step.

```typescript
import { fetchUtils, DataProvider } from 'react-admin'

function createHierarchicalProvider(
  baseProvider: DataProvider,
  urlResolver: URLResolver,
  fetchJson: typeof fetchUtils.fetchJson = fetchUtils.fetchJson,
): DataProvider {
  const httpClient = (url: string, options?: RequestInit) => {
    // Wrap fetchJson to pass auth headers, handle errors, etc.
    return fetchJson(url, options)
  }

  return {
    getList: async (resource, params) => {
      const query = buildQueryString(params)
      const url = urlResolver.getListUrl(resource, query)
      const { json, headers } = await httpClient(url)
      return { data: json.data ?? json, total: json.total ?? json.length }
    },

    getOne: async (resource, params) => {
      const url = urlResolver.getOneUrl(resource, params.id)
      const { json } = await httpClient(url)
      return { data: json }
    },

    getMany: async (resource, params) => {
      const promises = params.ids.map((id) =>
        httpClient(urlResolver.getOneUrl(resource, id)).then((r) => r.json),
      )
      const results = await Promise.all(promises)
      return { data: results }
    },

    create: async (resource, params) => {
      const url = urlResolver.createUrl(resource)
      const { json } = await httpClient(url, {
        method: 'POST', // or 'PUT' depending on backend
        body: JSON.stringify(params.data),
      })
      return { data: json }
    },

    update: async (resource, params) => {
      const url = urlResolver.updateUrl(resource)
      const { json } = await httpClient(url, {
        method: 'PUT',
        body: JSON.stringify({ ...params.data, id: params.id }),
      })
      return { data: json }
    },

    updateMany: async (resource, params) => {
      const url = urlResolver.updateUrl(resource)
      const { json } = await httpClient(url, {
        method: 'PUT',
        body: JSON.stringify({ ids: params.ids, ...params.data }),
      })
      return { data: json.map((item) => item.id) }
    },

    delete: async (resource, params) => {
      const url = urlResolver.deleteUrl(resource, params.id)
      await httpClient(url, { method: 'DELETE' })
      return { data: { id: params.id } }
    },

    deleteMany: async (resource, params) => {
      const promises = params.ids.map((id) =>
        httpClient(urlResolver.deleteUrl(resource, id), { method: 'DELETE' }),
      )
      await Promise.all(promises)
      return { data: params.ids }
    },
  }
}
```

**Pros**: Quick to implement, reuses existing provider logic for pagination/sorting/filtering.
**Cons**: Depends on the base provider's conventions.

### Approach B: Full Custom Provider

Implement the data provider from scratch when you need full control (auth headers, custom error handling, date serialization, etc.).

```typescript
function createCustomProvider(urlResolver: URLResolver): DataProvider {
  const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    const token = localStorage.getItem('token')
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    }
    const response = await fetch(url, { ...options, headers })
    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('token')
        window.location.href = '/login'
        throw new Error('Session expired')
      }
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    if (response.status === 204) return {}
    return response.json()
  }

  return {
    getList: async (resource, params) => {
      const query = buildQueryString(params)
      const url = urlResolver.getListUrl(resource, query)
      const json = await fetchWithAuth(url)
      const data = Array.isArray(json) ? json : json.data ?? []
      return { data, total: json.total ?? data.length }
    },

    getOne: async (resource, params) => {
      const url = urlResolver.getOneUrl(resource, params.id)
      const data = await fetchWithAuth(url)
      return { data }
    },

    getMany: async (resource, params) => {
      const promises = params.ids.map((id) =>
        fetchWithAuth(urlResolver.getOneUrl(resource, id)),
      )
      const data = await Promise.all(promises)
      return { data }
    },

    create: async (resource, params) => {
      const url = urlResolver.createUrl(resource)
      const json = await fetchWithAuth(url, {
        method: 'PUT',
        body: JSON.stringify(Array.isArray(params.data) ? params.data : [params.data]),
      })
      return { data: Array.isArray(json) ? json[0] : json }
    },

    update: async (resource, params) => {
      const url = urlResolver.updateUrl(resource)
      const json = await fetchWithAuth(url, {
        method: 'PUT',
        body: JSON.stringify([{ ...params.data, id: params.id }]),
      })
      return { data: Array.isArray(json) ? json[0] : json }
    },

    delete: async (resource, params) => {
      const url = urlResolver.deleteUrl(resource, params.id)
      await fetchWithAuth(url, { method: 'DELETE' })
      return { data: { id: params.id } }
    },

    updateMany: async (resource, params) => { /* ... */ },
    deleteMany: async (resource, params) => { /* ... */ },
  }
}
```

## Handling CRUD Conventions

Backends differ in how they handle create/update. Common variations:

| Convention | create method | update method | Body format |
|------------|--------------|---------------|-------------|
| RESTful POST/PUT | `POST {resource}` | `PUT {resource}/{id}` | Single object |
| Bulk PUT | `PUT {resource}` | `PUT {resource}` | Array of objects |
| POST with nested path | `POST {parent}/{id}/{child}` | `PUT {child}/{id}` | Single object |

Configure these in the URL resolver or the data provider directly.

## ID Generation

Some backends return the created entity with an ID; others don't. If the response doesn't include an ID, generate one client-side:

```typescript
const ensureId = (item: any) => {
  if (item.id) return item
  // Composite key from parent resources
  if (item.parent1?.id && item.parent2?.id) {
    return { ...item, id: `${item.parent1.id}-${item.parent2.id}` }
  }
  return { ...item, id: crypto.randomUUID() }
}
```

## Error Handling

Always handle these cases in the data provider:

| Status | Action |
|--------|--------|
| 401 | Clear auth, redirect to login |
| 403 | Show "not authorized" notification |
| 404 | Show "not found" or redirect |
| 422/400 | Show validation errors |
| 5xx | Show generic error with retry option |

## Verification Checklist

- [ ] Every React Admin method (`getList`, `getOne`, `getMany`, `create`, `update`, `delete`, `updateMany`, `deleteMany`) is implemented
- [ ] The URL resolver is called for every API call
- [ ] Auth headers are attached to every request
- [ ] Error handling covers 401 (auto-redirect), 4xx (show notification), 5xx (generic error)
- [ ] Date/time strings are serialized correctly for the backend
- [ ] Response format matches what React Admin expects (`{ data, total }` for getList, `{ data }` for others)
- [ ] The provider is registered at the `<Admin dataProvider={...}>` level

## Helper: Build Query String

```typescript
function buildQueryString(params: {
  pagination?: { page: number; perPage: number }
  sort?: { field: string; order: string }
  filter?: Record<string, any>
}): string {
  const query = new URLSearchParams()
  if (params.pagination) {
    query.set('page', String(params.pagination.page))
    query.set('page_size', String(params.pagination.perPage))
  }
  if (params.sort) {
    query.set('sort', params.sort.field)
    query.set('order', params.sort.order)
  }
  if (params.filter) {
    Object.entries(params.filter).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        query.set(key, String(value))
      }
    })
  }
  return query.toString()
}
```
