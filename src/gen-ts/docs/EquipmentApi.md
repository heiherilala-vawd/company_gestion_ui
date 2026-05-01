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
import {
  Configuration,
  EquipmentApi,
} from 'api-client';
import type { CrupdateEquipmentRequest } from 'api-client';

async function example() {
  console.log("🚀 Testing api-client SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new EquipmentApi(config);

  const body = {
    // string
    compId: compId_example,
    // Array<CrupdateEquipment>
    crupdateEquipment: ...,
  } satisfies CrupdateEquipmentRequest;

  try {
    const data = await api.crupdateEquipment(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
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
    compId: compId_example,
    // string
    id: id_example,
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

> Array&lt;Equipment&gt; getEquipment(compId, page, pageSize, warehouseId, name, description, floorNumber, storageNumber)

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
    compId: compId_example,
    // number (optional)
    page: 56,
    // number (optional)
    pageSize: 56,
    // string (optional)
    warehouseId: warehouseId_example,
    // string | Filter equipment by name, case is ignored (optional)
    name: name_example,
    // string | Filter equipment by description, case is ignored (optional)
    description: description_example,
    // number (optional)
    floorNumber: 56,
    // number (optional)
    storageNumber: 56,
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

| Name              | Type     | Description                                      | Notes                                |
| ----------------- | -------- | ------------------------------------------------ | ------------------------------------ |
| **compId**        | `string` |                                                  | [Defaults to `undefined`]            |
| **page**          | `number` |                                                  | [Optional] [Defaults to `undefined`] |
| **pageSize**      | `number` |                                                  | [Optional] [Defaults to `undefined`] |
| **warehouseId**   | `string` |                                                  | [Optional] [Defaults to `undefined`] |
| **name**          | `string` | Filter equipment by name, case is ignored        | [Optional] [Defaults to `undefined`] |
| **description**   | `string` | Filter equipment by description, case is ignored | [Optional] [Defaults to `undefined`] |
| **floorNumber**   | `number` |                                                  | [Optional] [Defaults to `undefined`] |
| **storageNumber** | `number` |                                                  | [Optional] [Defaults to `undefined`] |

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
    compId: compId_example,
    // string
    id: id_example,
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
