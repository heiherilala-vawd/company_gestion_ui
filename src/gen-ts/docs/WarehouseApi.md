# WarehouseApi

All URIs are relative to *https://api-dev.company.com*

| Method                                                         | HTTP request                                    | Description                                         |
| -------------------------------------------------------------- | ----------------------------------------------- | --------------------------------------------------- |
| [**crupdateWarehouses**](WarehouseApi.md#crupdatewarehouses)   | **PUT** /companies/{comp_id}/warehouses         | Create new warehouses or update existing warehouses |
| [**deleteWarehouseById**](WarehouseApi.md#deletewarehousebyid) | **DELETE** /companies/{comp_id}/warehouses/{id} | Delete a warehouse by identifier                    |
| [**getWarehouseById**](WarehouseApi.md#getwarehousebyid)       | **GET** /companies/{comp_id}/warehouses/{id}    | Get warehouse by identifier                         |
| [**getWarehouses**](WarehouseApi.md#getwarehouses)             | **GET** /companies/{comp_id}/warehouses         | Get all warehouses                                  |

## crupdateWarehouses

> Array&lt;Warehouse&gt; crupdateWarehouses(compId, crupdateWarehouse)

Create new warehouses or update existing warehouses

### Example

```ts
import { Configuration, WarehouseApi } from 'api-client'
import type { CrupdateWarehousesRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new WarehouseApi(config)

  const body = {
    // string
    compId: comp_btp001,
    // Array<CrupdateWarehouse>
    crupdateWarehouse: [
      {
        id: 'wh_001',
        name: 'Entrepôt Nord',
        description: 'Entrepôt principal pour le chantier de Lyon',
        job_id: 'job_001',
        comment: "Agrandissement de l'entrepôt",
      },
      {
        name: 'Entrepôt Est',
        description: 'Entrepôt pour les équipements électriques',
        job_id: 'job_001',
        comment: 'Nouveau stockage pour le matériel électrique',
      },
    ],
  } satisfies CrupdateWarehousesRequest

  try {
    const data = await api.crupdateWarehouses(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name                  | Type                       | Description | Notes                     |
| --------------------- | -------------------------- | ----------- | ------------------------- |
| **compId**            | `string`                   |             | [Defaults to `undefined`] |
| **crupdateWarehouse** | `Array<CrupdateWarehouse>` |             |                           |

### Return type

[**Array&lt;Warehouse&gt;**](Warehouse.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                       | Response headers |
| ----------- | --------------------------------- | ---------------- |
| **200**     | The created or updated warehouses | -                |
| **400**     | Bad request                       | -                |
| **403**     | Forbidden                         | -                |
| **404**     | Not found                         | -                |
| **429**     | Too many requests to the API      | -                |
| **500**     | Internal server error             | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## deleteWarehouseById

> deleteWarehouseById(compId, id)

Delete a warehouse by identifier

### Example

```ts
import { Configuration, WarehouseApi } from 'api-client'
import type { DeleteWarehouseByIdRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new WarehouseApi(config)

  const body = {
    // string
    compId: comp_btp001,
    // string
    id: wh_001,
  } satisfies DeleteWarehouseByIdRequest

  try {
    const data = await api.deleteWarehouseById(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name       | Type     | Description | Notes                     |
| ---------- | -------- | ----------- | ------------------------- |
| **compId** | `string` |             | [Defaults to `undefined`] |
| **id**     | `string` |             | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                    | Response headers |
| ----------- | ------------------------------ | ---------------- |
| **204**     | Warehouse deleted successfully | -                |
| **400**     | Bad request                    | -                |
| **403**     | Forbidden                      | -                |
| **404**     | Not found                      | -                |
| **429**     | Too many requests to the API   | -                |
| **500**     | Internal server error          | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getWarehouseById

> Warehouse getWarehouseById(compId, id)

Get warehouse by identifier

### Example

```ts
import { Configuration, WarehouseApi } from 'api-client'
import type { GetWarehouseByIdRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new WarehouseApi(config)

  const body = {
    // string
    compId: comp_btp001,
    // string
    id: wh_001,
  } satisfies GetWarehouseByIdRequest

  try {
    const data = await api.getWarehouseById(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name       | Type     | Description | Notes                     |
| ---------- | -------- | ----------- | ------------------------- |
| **compId** | `string` |             | [Defaults to `undefined`] |
| **id**     | `string` |             | [Defaults to `undefined`] |

### Return type

[**Warehouse**](Warehouse.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **200**     | The identified warehouse     | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getWarehouses

> Array&lt;Warehouse&gt; getWarehouses(compId, page, pageSize, jobId, name, description)

Get all warehouses

### Example

```ts
import { Configuration, WarehouseApi } from 'api-client'
import type { GetWarehousesRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new WarehouseApi(config)

  const body = {
    // string
    compId: comp_btp001,
    // number (optional)
    page: 1,
    // number (optional)
    pageSize: 20,
    // string (optional)
    jobId: job_001,
    // string | Filter warehouses by name, case is ignored (optional)
    name: Entrepôt,
    // string | Filter warehouses by description, case is ignored (optional)
    description: stockage,
  } satisfies GetWarehousesRequest

  try {
    const data = await api.getWarehouses(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name            | Type     | Description                                       | Notes                                |
| --------------- | -------- | ------------------------------------------------- | ------------------------------------ |
| **compId**      | `string` |                                                   | [Defaults to `undefined`]            |
| **page**        | `number` |                                                   | [Optional] [Defaults to `undefined`] |
| **pageSize**    | `number` |                                                   | [Optional] [Defaults to `undefined`] |
| **jobId**       | `string` |                                                   | [Optional] [Defaults to `undefined`] |
| **name**        | `string` | Filter warehouses by name, case is ignored        | [Optional] [Defaults to `undefined`] |
| **description** | `string` | Filter warehouses by description, case is ignored | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;Warehouse&gt;**](Warehouse.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **200**     | List of warehouses           | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
