# EquipmentApi

All URIs are relative to *https://api-dev.company.com*

| Method                                                         | HTTP request                                   | Description                                       |
| -------------------------------------------------------------- | ---------------------------------------------- | ------------------------------------------------- |
| [**crupdateEquipment**](EquipmentApi.md#crupdateequipment)     | **PUT** /companies/{comp_id}/equipment         | Create new equipment or update existing equipment |
| [**deleteEquipmentById**](EquipmentApi.md#deleteequipmentbyid) | **DELETE** /companies/{comp_id}/equipment/{id} | Delete equipment by identifier                    |
| [**getEquipment**](EquipmentApi.md#getequipment)               | **GET** /companies/{comp_id}/equipment         | Get all equipment                                 |
| [**getEquipmentById**](EquipmentApi.md#getequipmentbyid)       | **GET** /companies/{comp_id}/equipment/{id}    | Get equipment by identifier                       |

## crupdateEquipment

> Array&lt;Equipment&gt; crupdateEquipment(compId, crupdateEquipment)

Create new equipment or update existing equipment

### Example

```ts
import { Configuration, EquipmentApi } from 'api-client'
import type { CrupdateEquipmentRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new EquipmentApi(config)

  const body = {
    // string
    compId: comp_btp001,
    // Array<CrupdateEquipment>
    crupdateEquipment: [
      {
        id: 'eq_001',
        name: 'Pelleteuse CAT 320',
        description: 'Pelleteuse pour terrassement, 20 tonnes - Révisée',
        warehouse_id: 'wh_001',
        floor_number: 1,
        storage_number: 5,
        comment: 'Machine révisée et opérationnelle',
      },
      {
        name: 'Bétonnière 500L',
        description: 'Bétonnière électrique 500 litres',
        warehouse_id: 'wh_002',
        floor_number: 2,
        storage_number: 8,
        comment: 'Nouvelle bétonnière',
      },
    ],
  } satisfies CrupdateEquipmentRequest

  try {
    const data = await api.crupdateEquipment(body)
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
| **crupdateEquipment** | `Array<CrupdateEquipment>` |             |                           |

### Return type

[**Array&lt;Equipment&gt;**](Equipment.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                      | Response headers |
| ----------- | -------------------------------- | ---------------- |
| **200**     | The created or updated equipment | -                |
| **400**     | Bad request                      | -                |
| **403**     | Forbidden                        | -                |
| **404**     | Not found                        | -                |
| **429**     | Too many requests to the API     | -                |
| **500**     | Internal server error            | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## deleteEquipmentById

> deleteEquipmentById(compId, id)

Delete equipment by identifier

### Example

```ts
import { Configuration, EquipmentApi } from 'api-client'
import type { DeleteEquipmentByIdRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new EquipmentApi(config)

  const body = {
    // string
    compId: comp_btp001,
    // string
    id: eq_001,
  } satisfies DeleteEquipmentByIdRequest

  try {
    const data = await api.deleteEquipmentById(body)
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
| **204**     | Equipment deleted successfully | -                |
| **400**     | Bad request                    | -                |
| **403**     | Forbidden                      | -                |
| **404**     | Not found                      | -                |
| **429**     | Too many requests to the API   | -                |
| **500**     | Internal server error          | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getEquipment

> Array&lt;Equipment&gt; getEquipment(compId, page, pageSize, warehouseId, name, description, floorNumber, storageNumber, notArrived)

Get all equipment

### Example

```ts
import { Configuration, EquipmentApi } from 'api-client'
import type { GetEquipmentRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new EquipmentApi(config)

  const body = {
    // string
    compId: comp_btp001,
    // number (optional)
    page: 1,
    // number (optional)
    pageSize: 20,
    // string (optional)
    warehouseId: wh_001,
    // string | Filter equipment by name, case is ignored (optional)
    name: Pelleteuse,
    // string | Filter equipment by description, case is ignored (optional)
    description: terrassement,
    // number (optional)
    floorNumber: 1,
    // number (optional)
    storageNumber: 5,
    // boolean | Filter equipment not yet arrived (in route or at seller warehouse) (optional)
    notArrived: true,
  } satisfies GetEquipmentRequest

  try {
    const data = await api.getEquipment(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name              | Type      | Description                                                        | Notes                                |
| ----------------- | --------- | ------------------------------------------------------------------ | ------------------------------------ |
| **compId**        | `string`  |                                                                    | [Defaults to `undefined`]            |
| **page**          | `number`  |                                                                    | [Optional] [Defaults to `undefined`] |
| **pageSize**      | `number`  |                                                                    | [Optional] [Defaults to `undefined`] |
| **warehouseId**   | `string`  |                                                                    | [Optional] [Defaults to `undefined`] |
| **name**          | `string`  | Filter equipment by name, case is ignored                          | [Optional] [Defaults to `undefined`] |
| **description**   | `string`  | Filter equipment by description, case is ignored                   | [Optional] [Defaults to `undefined`] |
| **floorNumber**   | `number`  |                                                                    | [Optional] [Defaults to `undefined`] |
| **storageNumber** | `number`  |                                                                    | [Optional] [Defaults to `undefined`] |
| **notArrived**    | `boolean` | Filter equipment not yet arrived (in route or at seller warehouse) | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;Equipment&gt;**](Equipment.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **200**     | List of equipment            | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getEquipmentById

> Equipment getEquipmentById(compId, id)

Get equipment by identifier

### Example

```ts
import { Configuration, EquipmentApi } from 'api-client'
import type { GetEquipmentByIdRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new EquipmentApi(config)

  const body = {
    // string
    compId: comp_btp001,
    // string
    id: eq_001,
  } satisfies GetEquipmentByIdRequest

  try {
    const data = await api.getEquipmentById(body)
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

[**Equipment**](Equipment.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **200**     | The identified equipment     | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
