# MaterialWarehouseApi

All URIs are relative to *https://api-dev.company.com*

| Method                                                                               | HTTP request                                    | Description                               |
| ------------------------------------------------------------------------------------ | ----------------------------------------------- | ----------------------------------------- |
| [**crupdateMaterialWarehouses**](MaterialWarehouseApi.md#crupdatematerialwarehouses) | **PUT** /companies/{comp_id}/material_warehouse | Create or update material warehouse stock |
| [**getMaterialWarehouses**](MaterialWarehouseApi.md#getmaterialwarehouses)           | **GET** /companies/{comp_id}/material_warehouse | Get all material warehouse stock records  |

## crupdateMaterialWarehouses

> Array&lt;MaterialWarehouseInfo&gt; crupdateMaterialWarehouses(compId, crupdateMaterialWarehouse)

Create or update material warehouse stock

### Example

```ts
import {
  Configuration,
  MaterialWarehouseApi,
} from 'api-client';
import type { CrupdateMaterialWarehousesRequest } from 'api-client';

async function example() {
  console.log("🚀 Testing api-client SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new MaterialWarehouseApi(config);

  const body = {
    // string
    compId: comp_btp001,
    // Array<CrupdateMaterialWarehouse>
    crupdateMaterialWarehouse: ...,
  } satisfies CrupdateMaterialWarehousesRequest;

  try {
    const data = await api.crupdateMaterialWarehouses(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name                          | Type                               | Description | Notes                     |
| ----------------------------- | ---------------------------------- | ----------- | ------------------------- |
| **compId**                    | `string`                           |             | [Defaults to `undefined`] |
| **crupdateMaterialWarehouse** | `Array<CrupdateMaterialWarehouse>` |             |                           |

### Return type

[**Array&lt;MaterialWarehouseInfo&gt;**](MaterialWarehouseInfo.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                                       | Response headers |
| ----------- | ------------------------------------------------- | ---------------- |
| **200**     | The created or updated material warehouse records | -                |
| **400**     | Bad request                                       | -                |
| **403**     | Forbidden                                         | -                |
| **404**     | Not found                                         | -                |
| **429**     | Too many requests to the API                      | -                |
| **500**     | Internal server error                             | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getMaterialWarehouses

> Array&lt;MaterialWarehouseView&gt; getMaterialWarehouses(compId, page, pageSize, materialId, warehouseId, notArrived)

Get all material warehouse stock records

### Example

```ts
import { Configuration, MaterialWarehouseApi } from 'api-client'
import type { GetMaterialWarehousesRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new MaterialWarehouseApi(config)

  const body = {
    // string
    compId: comp_btp001,
    // number (optional)
    page: 1,
    // number (optional)
    pageSize: 20,
    // string | Filter by material ID (optional)
    materialId: mat_001,
    // string | Filter by warehouse ID (optional)
    warehouseId: wh_001,
    // boolean | Filter records where quantity > 0 in route or at_seller warehouse (optional)
    notArrived: true,
  } satisfies GetMaterialWarehousesRequest

  try {
    const data = await api.getMaterialWarehouses(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name            | Type      | Description                                                          | Notes                                |
| --------------- | --------- | -------------------------------------------------------------------- | ------------------------------------ |
| **compId**      | `string`  |                                                                      | [Defaults to `undefined`]            |
| **page**        | `number`  |                                                                      | [Optional] [Defaults to `undefined`] |
| **pageSize**    | `number`  |                                                                      | [Optional] [Defaults to `undefined`] |
| **materialId**  | `string`  | Filter by material ID                                                | [Optional] [Defaults to `undefined`] |
| **warehouseId** | `string`  | Filter by warehouse ID                                               | [Optional] [Defaults to `undefined`] |
| **notArrived**  | `boolean` | Filter records where quantity &gt; 0 in route or at_seller warehouse | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;MaterialWarehouseView&gt;**](MaterialWarehouseView.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                        | Response headers |
| ----------- | ---------------------------------- | ---------------- |
| **200**     | List of material warehouse records | -                |
| **400**     | Bad request                        | -                |
| **403**     | Forbidden                          | -                |
| **404**     | Not found                          | -                |
| **429**     | Too many requests to the API       | -                |
| **500**     | Internal server error              | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
