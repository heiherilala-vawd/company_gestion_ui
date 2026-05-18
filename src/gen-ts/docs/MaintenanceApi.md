# MaintenanceApi

All URIs are relative to *https://api-dev.company.com*

| Method                                                               | HTTP request                                                                                           | Description                                     |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | ----------------------------------------------- |
| [**crupdateMaintenances**](MaintenanceApi.md#crupdatemaintenances)   | **PUT** /companies/{comp_id}/job/{job_id}/user/{user_id}/equipment/{equipment_id}/maintenances         | Create new maintenances or update existing ones |
| [**deleteMaintenanceById**](MaintenanceApi.md#deletemaintenancebyid) | **DELETE** /companies/{comp_id}/job/{job_id}/user/{user_id}/equipment/{equipment_id}/maintenances/{id} | Delete maintenance by identifier                |
| [**getMaintenanceById**](MaintenanceApi.md#getmaintenancebyid)       | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/equipment/{equipment_id}/maintenances/{id}    | Get maintenance by identifier                   |
| [**getMaintenances**](MaintenanceApi.md#getmaintenances)             | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/equipment/{equipment_id}/maintenances         | Get all maintenances for equipment              |

## crupdateMaintenances

> Array&lt;Maintenance&gt; crupdateMaintenances(compId, jobId, userId, equipmentId, crupdateMaintenance)

Create new maintenances or update existing ones

### Example

```ts
import { Configuration, MaintenanceApi } from 'api-client'
import type { CrupdateMaintenancesRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new MaintenanceApi(config)

  const body = {
    // string
    compId: comp_btp001,
    // string
    jobId: job_001,
    // string
    userId: usr_123456,
    // string
    equipmentId: eq_001,
    // Array<CrupdateMaintenance>
    crupdateMaintenance: [
      {
        id: 'maint_001',
        expense: { id: 'exp_002', amount: 5000, job_id: 'job_002' },
        description: 'Révision moteur périodique',
      },
    ],
  } satisfies CrupdateMaintenancesRequest

  try {
    const data = await api.crupdateMaintenances(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name                    | Type                         | Description | Notes                     |
| ----------------------- | ---------------------------- | ----------- | ------------------------- |
| **compId**              | `string`                     |             | [Defaults to `undefined`] |
| **jobId**               | `string`                     |             | [Defaults to `undefined`] |
| **userId**              | `string`                     |             | [Defaults to `undefined`] |
| **equipmentId**         | `string`                     |             | [Defaults to `undefined`] |
| **crupdateMaintenance** | `Array<CrupdateMaintenance>` |             |                           |

### Return type

[**Array&lt;Maintenance&gt;**](Maintenance.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                         | Response headers |
| ----------- | ----------------------------------- | ---------------- |
| **200**     | The created or updated maintenances | -                |
| **400**     | Bad request                         | -                |
| **403**     | Forbidden                           | -                |
| **404**     | Not found                           | -                |
| **429**     | Too many requests to the API        | -                |
| **500**     | Internal server error               | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## deleteMaintenanceById

> deleteMaintenanceById(compId, jobId, userId, equipmentId, id)

Delete maintenance by identifier

### Example

```ts
import { Configuration, MaintenanceApi } from 'api-client'
import type { DeleteMaintenanceByIdRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new MaintenanceApi(config)

  const body = {
    // string
    compId: comp_btp001,
    // string
    jobId: job_001,
    // string
    userId: usr_123456,
    // string
    equipmentId: eq_001,
    // string
    id: maint_001,
  } satisfies DeleteMaintenanceByIdRequest

  try {
    const data = await api.deleteMaintenanceById(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name            | Type     | Description | Notes                     |
| --------------- | -------- | ----------- | ------------------------- |
| **compId**      | `string` |             | [Defaults to `undefined`] |
| **jobId**       | `string` |             | [Defaults to `undefined`] |
| **userId**      | `string` |             | [Defaults to `undefined`] |
| **equipmentId** | `string` |             | [Defaults to `undefined`] |
| **id**          | `string` |             | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                             | Response headers |
| ----------- | --------------------------------------- | ---------------- |
| **204**     | Maintenance record deleted successfully | -                |
| **400**     | Bad request                             | -                |
| **403**     | Forbidden                               | -                |
| **404**     | Not found                               | -                |
| **429**     | Too many requests to the API            | -                |
| **500**     | Internal server error                   | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getMaintenanceById

> Maintenance getMaintenanceById(compId, jobId, userId, equipmentId, id)

Get maintenance by identifier

### Example

```ts
import { Configuration, MaintenanceApi } from 'api-client'
import type { GetMaintenanceByIdRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new MaintenanceApi(config)

  const body = {
    // string
    compId: comp_btp001,
    // string
    jobId: job_001,
    // string
    userId: usr_123456,
    // string
    equipmentId: eq_001,
    // string
    id: maint_001,
  } satisfies GetMaintenanceByIdRequest

  try {
    const data = await api.getMaintenanceById(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name            | Type     | Description | Notes                     |
| --------------- | -------- | ----------- | ------------------------- |
| **compId**      | `string` |             | [Defaults to `undefined`] |
| **jobId**       | `string` |             | [Defaults to `undefined`] |
| **userId**      | `string` |             | [Defaults to `undefined`] |
| **equipmentId** | `string` |             | [Defaults to `undefined`] |
| **id**          | `string` |             | [Defaults to `undefined`] |

### Return type

[**Maintenance**](Maintenance.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                       | Response headers |
| ----------- | --------------------------------- | ---------------- |
| **200**     | The identified maintenance record | -                |
| **400**     | Bad request                       | -                |
| **403**     | Forbidden                         | -                |
| **404**     | Not found                         | -                |
| **429**     | Too many requests to the API      | -                |
| **500**     | Internal server error             | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getMaintenances

> Array&lt;Maintenance&gt; getMaintenances(compId, jobId, userId, equipmentId, page, pageSize, description)

Get all maintenances for equipment

### Example

```ts
import { Configuration, MaintenanceApi } from 'api-client'
import type { GetMaintenancesRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new MaintenanceApi(config)

  const body = {
    // string
    compId: comp_btp001,
    // string
    jobId: job_001,
    // string
    userId: usr_123456,
    // string
    equipmentId: eq_001,
    // number (optional)
    page: 1,
    // number (optional)
    pageSize: 20,
    // string | Filter maintenances by description, case is ignored (optional)
    description: révision,
  } satisfies GetMaintenancesRequest

  try {
    const data = await api.getMaintenances(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name            | Type     | Description                                         | Notes                                |
| --------------- | -------- | --------------------------------------------------- | ------------------------------------ |
| **compId**      | `string` |                                                     | [Defaults to `undefined`]            |
| **jobId**       | `string` |                                                     | [Defaults to `undefined`]            |
| **userId**      | `string` |                                                     | [Defaults to `undefined`]            |
| **equipmentId** | `string` |                                                     | [Defaults to `undefined`]            |
| **page**        | `number` |                                                     | [Optional] [Defaults to `undefined`] |
| **pageSize**    | `number` |                                                     | [Optional] [Defaults to `undefined`] |
| **description** | `string` | Filter maintenances by description, case is ignored | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;Maintenance&gt;**](Maintenance.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **200**     | List of maintenances         | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
