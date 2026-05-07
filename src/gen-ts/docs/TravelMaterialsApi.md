# TravelMaterialsApi

All URIs are relative to *https://api-dev.company.com*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**crupdateTravelMaterials**](TravelMaterialsApi.md#crupdatetravelmaterials) | **PUT** /companies/{comp_id}/job/{job_id}/user/{user_id}/travel_expenses/{travel_expenses_id}/travel_materials | Create new travel materials or update existing ones |
| [**deleteTravelMaterialsById**](TravelMaterialsApi.md#deletetravelmaterialsbyid) | **DELETE** /companies/{comp_id}/job/{job_id}/user/{user_id}/travel_expenses/{travel_expenses_id}/travel_materials/{id} | Delete travel materials by identifier |
| [**getTravelMaterials**](TravelMaterialsApi.md#gettravelmaterials) | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/travel_expenses/{travel_expenses_id}/travel_materials | Get all travel materials |
| [**getTravelMaterialsById**](TravelMaterialsApi.md#gettravelmaterialsbyid) | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/travel_expenses/{travel_expenses_id}/travel_materials/{id} | Get travel materials by identifier |



## crupdateTravelMaterials

> Array&lt;TravelMaterials&gt; crupdateTravelMaterials(compId, jobId, userId, travelExpensesId, crupdateTravelMaterials)

Create new travel materials or update existing ones

### Example

```ts
import {
  Configuration,
  TravelMaterialsApi,
} from 'api-client';
import type { CrupdateTravelMaterialsRequest } from 'api-client';

async function example() {
  console.log("🚀 Testing api-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new TravelMaterialsApi(config);

  const body = {
    // string
    compId: comp_btp001,
    // string
    jobId: job_001,
    // string
    userId: usr_123456,
    // string
    travelExpensesId: travel_001,
    // Array<CrupdateTravelMaterials>
    crupdateTravelMaterials: [{"id":"tm_001","travel_id":"travel_001","material":"mat_001","quantity":120,"quantity_received":115,"comment":"5 sacs manquants"}],
  } satisfies CrupdateTravelMaterialsRequest;

  try {
    const data = await api.crupdateTravelMaterials(body);
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
| **travelExpensesId** | `string` |  | [Defaults to `undefined`] |
| **crupdateTravelMaterials** | `Array<CrupdateTravelMaterials>` |  | |

### Return type

[**Array&lt;TravelMaterials&gt;**](TravelMaterials.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The created or updated travel materials |  -  |
| **400** | Bad request |  -  |
| **403** | Forbidden |  -  |
| **404** | Not found |  -  |
| **429** | Too many requests to the API |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteTravelMaterialsById

> deleteTravelMaterialsById(compId, jobId, userId, travelExpensesId, id)

Delete travel materials by identifier

### Example

```ts
import {
  Configuration,
  TravelMaterialsApi,
} from 'api-client';
import type { DeleteTravelMaterialsByIdRequest } from 'api-client';

async function example() {
  console.log("🚀 Testing api-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new TravelMaterialsApi(config);

  const body = {
    // string
    compId: comp_btp001,
    // string
    jobId: job_001,
    // string
    userId: usr_123456,
    // string
    travelExpensesId: travel_001,
    // string
    id: tm_001,
  } satisfies DeleteTravelMaterialsByIdRequest;

  try {
    const data = await api.deleteTravelMaterialsById(body);
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
| **travelExpensesId** | `string` |  | [Defaults to `undefined`] |
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
| **204** | Travel materials deleted successfully |  -  |
| **400** | Bad request |  -  |
| **403** | Forbidden |  -  |
| **404** | Not found |  -  |
| **429** | Too many requests to the API |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getTravelMaterials

> Array&lt;TravelMaterials&gt; getTravelMaterials(compId, jobId, userId, travelExpensesId, page, pageSize, travelId, materialId, quantity, quantityReceived, arrivalLocation, arrivalDateMin, arrivalDateMax, notArrived)

Get all travel materials

### Example

```ts
import {
  Configuration,
  TravelMaterialsApi,
} from 'api-client';
import type { GetTravelMaterialsRequest } from 'api-client';

async function example() {
  console.log("🚀 Testing api-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new TravelMaterialsApi(config);

  const body = {
    // string
    compId: comp_btp001,
    // string
    jobId: job_001,
    // string
    userId: usr_123456,
    // string
    travelExpensesId: travel_001,
    // number (optional)
    page: 1,
    // number (optional)
    pageSize: 20,
    // string (optional)
    travelId: travel_001,
    // string (optional)
    materialId: mat_001,
    // number (optional)
    quantity: 100,
    // number (optional)
    quantityReceived: 100,
    // string | Filter travel materials by arrival warehouse id (optional)
    arrivalLocation: wh_001,
    // Date | Filter travel materials by minimum arrival date (optional)
    arrivalDateMin: 2024-02-20T00:00:00Z,
    // Date | Filter travel materials by maximum arrival date (optional)
    arrivalDateMax: 2024-02-20T23:59:59Z,
    // boolean | Filter travel materials that have not arrived yet (no arrival date or location) (optional)
    notArrived: true,
  } satisfies GetTravelMaterialsRequest;

  try {
    const data = await api.getTravelMaterials(body);
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
| **travelExpensesId** | `string` |  | [Defaults to `undefined`] |
| **page** | `number` |  | [Optional] [Defaults to `undefined`] |
| **pageSize** | `number` |  | [Optional] [Defaults to `undefined`] |
| **travelId** | `string` |  | [Optional] [Defaults to `undefined`] |
| **materialId** | `string` |  | [Optional] [Defaults to `undefined`] |
| **quantity** | `number` |  | [Optional] [Defaults to `undefined`] |
| **quantityReceived** | `number` |  | [Optional] [Defaults to `undefined`] |
| **arrivalLocation** | `string` | Filter travel materials by arrival warehouse id | [Optional] [Defaults to `undefined`] |
| **arrivalDateMin** | `Date` | Filter travel materials by minimum arrival date | [Optional] [Defaults to `undefined`] |
| **arrivalDateMax** | `Date` | Filter travel materials by maximum arrival date | [Optional] [Defaults to `undefined`] |
| **notArrived** | `boolean` | Filter travel materials that have not arrived yet (no arrival date or location) | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;TravelMaterials&gt;**](TravelMaterials.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | List of travel materials |  -  |
| **400** | Bad request |  -  |
| **403** | Forbidden |  -  |
| **404** | Not found |  -  |
| **429** | Too many requests to the API |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getTravelMaterialsById

> TravelMaterials getTravelMaterialsById(compId, jobId, userId, travelExpensesId, id)

Get travel materials by identifier

### Example

```ts
import {
  Configuration,
  TravelMaterialsApi,
} from 'api-client';
import type { GetTravelMaterialsByIdRequest } from 'api-client';

async function example() {
  console.log("🚀 Testing api-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new TravelMaterialsApi(config);

  const body = {
    // string
    compId: comp_btp001,
    // string
    jobId: job_001,
    // string
    userId: usr_123456,
    // string
    travelExpensesId: travel_001,
    // string
    id: tm_001,
  } satisfies GetTravelMaterialsByIdRequest;

  try {
    const data = await api.getTravelMaterialsById(body);
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
| **travelExpensesId** | `string` |  | [Defaults to `undefined`] |
| **id** | `string` |  | [Defaults to `undefined`] |

### Return type

[**TravelMaterials**](TravelMaterials.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The identified travel materials |  -  |
| **400** | Bad request |  -  |
| **403** | Forbidden |  -  |
| **404** | Not found |  -  |
| **429** | Too many requests to the API |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

