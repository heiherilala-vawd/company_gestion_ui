# MaterialConsumptionApi

All URIs are relative to *https://api-dev.company.com*

| Method                                                                                       | HTTP request                                              | Description                                                     |
| -------------------------------------------------------------------------------------------- | --------------------------------------------------------- | --------------------------------------------------------------- |
| [**crupdateMaterialConsumptions**](MaterialConsumptionApi.md#crupdatematerialconsumptions)   | **PUT** /companies/{comp_id}/material_consumption         | Create new material consumption records or update existing ones |
| [**deleteMaterialConsumptionById**](MaterialConsumptionApi.md#deletematerialconsumptionbyid) | **DELETE** /companies/{comp_id}/material_consumption/{id} | Delete a material consumption record by identifier              |
| [**getMaterialConsumptionById**](MaterialConsumptionApi.md#getmaterialconsumptionbyid)       | **GET** /companies/{comp_id}/material_consumption/{id}    | Get a material consumption record by identifier                 |
| [**getMaterialConsumptions**](MaterialConsumptionApi.md#getmaterialconsumptions)             | **GET** /companies/{comp_id}/material_consumption         | Get all material consumption records                            |

## crupdateMaterialConsumptions

> Array&lt;MaterialConsumption&gt; crupdateMaterialConsumptions(compId, crupdateMaterialConsumption)

Create new material consumption records or update existing ones

### Example

```ts
import {
  Configuration,
  MaterialConsumptionApi,
} from 'api-client';
import type { CrupdateMaterialConsumptionsRequest } from 'api-client';

async function example() {
  console.log("🚀 Testing api-client SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new MaterialConsumptionApi(config);

  const body = {
    // string
    compId: comp_btp001,
    // Array<CrupdateMaterialConsumption>
    crupdateMaterialConsumption: ...,
  } satisfies CrupdateMaterialConsumptionsRequest;

  try {
    const data = await api.crupdateMaterialConsumptions(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name                            | Type                                 | Description | Notes                     |
| ------------------------------- | ------------------------------------ | ----------- | ------------------------- |
| **compId**                      | `string`                             |             | [Defaults to `undefined`] |
| **crupdateMaterialConsumption** | `Array<CrupdateMaterialConsumption>` |             |                           |

### Return type

[**Array&lt;MaterialConsumption&gt;**](MaterialConsumption.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                                         | Response headers |
| ----------- | --------------------------------------------------- | ---------------- |
| **200**     | The created or updated material consumption records | -                |
| **400**     | Bad request                                         | -                |
| **403**     | Forbidden                                           | -                |
| **404**     | Not found                                           | -                |
| **429**     | Too many requests to the API                        | -                |
| **500**     | Internal server error                               | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## deleteMaterialConsumptionById

> deleteMaterialConsumptionById(compId, id)

Delete a material consumption record by identifier

### Example

```ts
import { Configuration, MaterialConsumptionApi } from 'api-client'
import type { DeleteMaterialConsumptionByIdRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new MaterialConsumptionApi(config)

  const body = {
    // string
    compId: comp_btp001,
    // string
    id: mc_001,
  } satisfies DeleteMaterialConsumptionByIdRequest

  try {
    const data = await api.deleteMaterialConsumptionById(body)
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

| Status code | Description                         | Response headers |
| ----------- | ----------------------------------- | ---------------- |
| **204**     | Material consumption record deleted | -                |
| **400**     | Bad request                         | -                |
| **403**     | Forbidden                           | -                |
| **404**     | Not found                           | -                |
| **429**     | Too many requests to the API        | -                |
| **500**     | Internal server error               | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getMaterialConsumptionById

> MaterialConsumption getMaterialConsumptionById(compId, id)

Get a material consumption record by identifier

### Example

```ts
import { Configuration, MaterialConsumptionApi } from 'api-client'
import type { GetMaterialConsumptionByIdRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new MaterialConsumptionApi(config)

  const body = {
    // string
    compId: comp_btp001,
    // string
    id: mc_001,
  } satisfies GetMaterialConsumptionByIdRequest

  try {
    const data = await api.getMaterialConsumptionById(body)
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

[**MaterialConsumption**](MaterialConsumption.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                     | Response headers |
| ----------- | ------------------------------- | ---------------- |
| **200**     | The material consumption record | -                |
| **400**     | Bad request                     | -                |
| **403**     | Forbidden                       | -                |
| **404**     | Not found                       | -                |
| **429**     | Too many requests to the API    | -                |
| **500**     | Internal server error           | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getMaterialConsumptions

> Array&lt;MaterialConsumption&gt; getMaterialConsumptions(compId, page, pageSize)

Get all material consumption records

### Example

```ts
import { Configuration, MaterialConsumptionApi } from 'api-client'
import type { GetMaterialConsumptionsRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new MaterialConsumptionApi(config)

  const body = {
    // string
    compId: comp_btp001,
    // number (optional)
    page: 1,
    // number (optional)
    pageSize: 20,
  } satisfies GetMaterialConsumptionsRequest

  try {
    const data = await api.getMaterialConsumptions(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name         | Type     | Description | Notes                                |
| ------------ | -------- | ----------- | ------------------------------------ |
| **compId**   | `string` |             | [Defaults to `undefined`]            |
| **page**     | `number` |             | [Optional] [Defaults to `undefined`] |
| **pageSize** | `number` |             | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;MaterialConsumption&gt;**](MaterialConsumption.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                          | Response headers |
| ----------- | ------------------------------------ | ---------------- |
| **200**     | List of material consumption records | -                |
| **400**     | Bad request                          | -                |
| **403**     | Forbidden                            | -                |
| **404**     | Not found                            | -                |
| **429**     | Too many requests to the API         | -                |
| **500**     | Internal server error                | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
