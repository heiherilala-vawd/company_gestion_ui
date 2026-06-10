# TravelOperationApi

All URIs are relative to *https://api-dev.company.com*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createTravelOperation**](TravelOperationApi.md#createtraveloperation) | **POST** /companies/{comp_id}/job/{job_id}/user/{user_id}/travel_operations | Register a travel operation for equipment, materials or people |



## createTravelOperation

> TravelExpense createTravelOperation(compId, jobId, userId, travelOperationRequest)

Register a travel operation for equipment, materials or people

### Example

```ts
import {
  Configuration,
  TravelOperationApi,
} from 'api-client';
import type { CreateTravelOperationRequest } from 'api-client';

async function example() {
  console.log("🚀 Testing api-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new TravelOperationApi(config);

  const body = {
    // string
    compId: comp_btp001,
    // string
    jobId: job_001,
    // string
    userId: usr_123456,
    // TravelOperationRequest
    travelOperationRequest: {"comment":"Déplacement inter-entrepôts","travel":{"id":"travel_001","expense_id":"exp_010","departure_location":{"id":"wh_001","name":"Entrepôt Nord"},"arrival_location":{"id":"wh_002","name":"Entrepôt Sud"},"departure_date":"2024-02-25T09:00:00Z","arrival_date":"2024-02-25T17:00:00Z","fee":500},"equipment_lines":[{"id":"travel_eq_010","equipment":{"id":"eq_003"}}],"material_lines":[{"id":"travel_mat_010","material":{"id":"mat_004"},"quantity":100}],"people_lines":[{"id":"travel_people_010","user_id":"usr_999"}]},
  } satisfies CreateTravelOperationRequest;

  try {
    const data = await api.createTravelOperation(body);
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
| **travelOperationRequest** | [TravelOperationRequest](TravelOperationRequest.md) |  | |

### Return type

[**TravelExpense**](TravelExpense.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The identified travel expense |  -  |
| **400** | Bad request |  -  |
| **403** | Forbidden |  -  |
| **404** | Not found |  -  |
| **429** | Too many requests to the API |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

