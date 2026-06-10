# PurchaseOrderApi

All URIs are relative to *https://api-dev.company.com*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**crupdatePurchaseOrders**](PurchaseOrderApi.md#crupdatepurchaseorders) | **PUT** /companies/{comp_id}/purchase_orders | Create or update purchase orders (crupdate) |
| [**deletePurchaseOrderById**](PurchaseOrderApi.md#deletepurchaseorderbyid) | **DELETE** /companies/{comp_id}/purchase_orders/{id} | Delete a purchase order |
| [**getPurchaseOrderById**](PurchaseOrderApi.md#getpurchaseorderbyid) | **GET** /companies/{comp_id}/purchase_orders/{id} | Get purchase order by ID |
| [**getPurchaseOrders**](PurchaseOrderApi.md#getpurchaseorders) | **GET** /companies/{comp_id}/purchase_orders | Get all purchase orders for a company |



## crupdatePurchaseOrders

> Array&lt;PurchaseOrder&gt; crupdatePurchaseOrders(compId, crupdatePurchaseOrder)

Create or update purchase orders (crupdate)

### Example

```ts
import {
  Configuration,
  PurchaseOrderApi,
} from 'api-client';
import type { CrupdatePurchaseOrdersRequest } from 'api-client';

async function example() {
  console.log("🚀 Testing api-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new PurchaseOrderApi(config);

  const body = {
    // string
    compId: comp_btp001,
    // Array<CrupdatePurchaseOrder>
    crupdatePurchaseOrder: ...,
  } satisfies CrupdatePurchaseOrdersRequest;

  try {
    const data = await api.crupdatePurchaseOrders(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **compId** | `string` |  | [Defaults to `undefined`] |
| **crupdatePurchaseOrder** | `Array<CrupdatePurchaseOrder>` |  | |

### Return type

[**Array&lt;PurchaseOrder&gt;**](PurchaseOrder.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Purchase orders created/updated |  -  |
| **400** | Bad request |  -  |
| **403** | Forbidden |  -  |
| **404** | Not found |  -  |
| **429** | Too many requests to the API |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deletePurchaseOrderById

> deletePurchaseOrderById(compId, id)

Delete a purchase order

### Example

```ts
import {
  Configuration,
  PurchaseOrderApi,
} from 'api-client';
import type { DeletePurchaseOrderByIdRequest } from 'api-client';

async function example() {
  console.log("🚀 Testing api-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new PurchaseOrderApi(config);

  const body = {
    // string
    compId: comp_btp001,
    // string
    id: po_001,
  } satisfies DeletePurchaseOrderByIdRequest;

  try {
    const data = await api.deletePurchaseOrderById(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **compId** | `string` |  | [Defaults to `undefined`] |
| **id** | `string` |  | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **204** | Purchase order deleted successfully |  -  |
| **400** | Bad request |  -  |
| **403** | Forbidden |  -  |
| **404** | Not found |  -  |
| **429** | Too many requests to the API |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getPurchaseOrderById

> PurchaseOrder getPurchaseOrderById(compId, id)

Get purchase order by ID

### Example

```ts
import {
  Configuration,
  PurchaseOrderApi,
} from 'api-client';
import type { GetPurchaseOrderByIdRequest } from 'api-client';

async function example() {
  console.log("🚀 Testing api-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new PurchaseOrderApi(config);

  const body = {
    // string
    compId: comp_btp001,
    // string
    id: po_001,
  } satisfies GetPurchaseOrderByIdRequest;

  try {
    const data = await api.getPurchaseOrderById(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **compId** | `string` |  | [Defaults to `undefined`] |
| **id** | `string` |  | [Defaults to `undefined`] |

### Return type

[**PurchaseOrder**](PurchaseOrder.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Purchase order found |  -  |
| **400** | Bad request |  -  |
| **403** | Forbidden |  -  |
| **404** | Not found |  -  |
| **429** | Too many requests to the API |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getPurchaseOrders

> Array&lt;PurchaseOrder&gt; getPurchaseOrders(compId, jobId)

Get all purchase orders for a company

### Example

```ts
import {
  Configuration,
  PurchaseOrderApi,
} from 'api-client';
import type { GetPurchaseOrdersRequest } from 'api-client';

async function example() {
  console.log("🚀 Testing api-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new PurchaseOrderApi(config);

  const body = {
    // string
    compId: comp_btp001,
    // string (optional)
    jobId: job_001,
  } satisfies GetPurchaseOrdersRequest;

  try {
    const data = await api.getPurchaseOrders(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **compId** | `string` |  | [Defaults to `undefined`] |
| **jobId** | `string` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;PurchaseOrder&gt;**](PurchaseOrder.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | List of purchase orders |  -  |
| **400** | Bad request |  -  |
| **403** | Forbidden |  -  |
| **404** | Not found |  -  |
| **429** | Too many requests to the API |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

