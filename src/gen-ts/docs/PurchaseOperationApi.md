# PurchaseOperationApi

All URIs are relative to *https://api-dev.company.com*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createPurchaseOperation**](PurchaseOperationApi.md#createpurchaseoperation) | **POST** /companies/{comp_id}/job/{job_id}/user/{user_id}/purchase_operations | Register a purchase operation with optional travel |



## createPurchaseOperation

> Array&lt;Purchase&gt; createPurchaseOperation(compId, jobId, userId, purchaseOperationRequest)

Register a purchase operation with optional travel

### Example

```ts
import {
  Configuration,
  PurchaseOperationApi,
} from 'api-client';
import type { CreatePurchaseOperationRequest } from 'api-client';

async function example() {
  console.log("🚀 Testing api-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new PurchaseOperationApi(config);

  const body = {
    // string
    compId: comp_btp001,
    // string
    jobId: job_001,
    // string
    userId: usr_123456,
    // PurchaseOperationRequest
    purchaseOperationRequest: {"equipment_lines":[{"equipment":{"id":"eq_003","name":"Bétonnière 500L"},"expense_id":"exp_001","purchase_id":"purch_003","travel_equipment_id":"travel_eq_001","unit_price":1200}],"material_lines":[{"material":{"id":"mat_004","name":"Acier à béton HA12"},"expense_id":"exp_001","purchase_id":"purch_004","travel_material_id":"travel_mat_001","quantity":100,"unit_price":15}],"travel":{"expense_id":"exp_003","departure_location":{"id":"wh_001","name":"Entrepôt Nord"},"arrival_location":{"id":"wh_002","name":"Entrepôt Sud"},"departure_date":"2024-02-25T09:00:00Z","arrival_date":"2024-02-25T17:00:00Z","fee":500},"comment":"Achat groupé avec transport"},
  } satisfies CreatePurchaseOperationRequest;

  try {
    const data = await api.createPurchaseOperation(body);
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
| **jobId** | `string` |  | [Defaults to `undefined`] |
| **userId** | `string` |  | [Defaults to `undefined`] |
| **purchaseOperationRequest** | [PurchaseOperationRequest](PurchaseOperationRequest.md) |  | |

### Return type

[**Array&lt;Purchase&gt;**](Purchase.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The created or updated purchases |  -  |
| **400** | Bad request |  -  |
| **403** | Forbidden |  -  |
| **404** | Not found |  -  |
| **429** | Too many requests to the API |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

