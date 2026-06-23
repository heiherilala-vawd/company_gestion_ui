# EquipmentIncidentApi

All URIs are relative to *https://api-dev.company.com*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**crupdateEquipmentIncidents**](EquipmentIncidentApi.md#crupdateequipmentincidents) | **PUT** /users/{userId}/companies/{companyId}/equipment_incidents | Create new equipment incident or update existing equipment incident |
| [**deleteEquipmentIncidentById**](EquipmentIncidentApi.md#deleteequipmentincidentbyid) | **DELETE** /users/{userId}/companies/{companyId}/equipment_incidents/{id} | Delete equipment incident by identifier (Admin only) |
| [**getEquipmentIncidentById**](EquipmentIncidentApi.md#getequipmentincidentbyid) | **GET** /users/{userId}/companies/{companyId}/equipment_incidents/{id} | Get equipment incident by identifier |
| [**getEquipmentIncidents**](EquipmentIncidentApi.md#getequipmentincidents) | **GET** /users/{userId}/companies/{companyId}/equipment_incidents | Get all equipment incidents |



## crupdateEquipmentIncidents

> Array&lt;EquipmentIncident&gt; crupdateEquipmentIncidents(userId, companyId, crupdateEquipmentIncident)

Create new equipment incident or update existing equipment incident

### Example

```ts
import {
  Configuration,
  EquipmentIncidentApi,
} from 'api-client';
import type { CrupdateEquipmentIncidentsRequest } from 'api-client';

async function example() {
  console.log("🚀 Testing api-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new EquipmentIncidentApi(config);

  const body = {
    // string
    userId: user_123456,
    // string
    companyId: comp_btp001,
    // Array<CrupdateEquipmentIncident>
    crupdateEquipmentIncident: ...,
  } satisfies CrupdateEquipmentIncidentsRequest;

  try {
    const data = await api.crupdateEquipmentIncidents(body);
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
| **userId** | `string` |  | [Defaults to `undefined`] |
| **companyId** | `string` |  | [Defaults to `undefined`] |
| **crupdateEquipmentIncident** | `Array<CrupdateEquipmentIncident>` |  | |

### Return type

[**Array&lt;EquipmentIncident&gt;**](EquipmentIncident.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The created or updated equipment incidents |  -  |
| **400** | Bad request |  -  |
| **403** | Forbidden |  -  |
| **404** | Not found |  -  |
| **429** | Too many requests to the API |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteEquipmentIncidentById

> deleteEquipmentIncidentById(userId, companyId, id)

Delete equipment incident by identifier (Admin only)

### Example

```ts
import {
  Configuration,
  EquipmentIncidentApi,
} from 'api-client';
import type { DeleteEquipmentIncidentByIdRequest } from 'api-client';

async function example() {
  console.log("🚀 Testing api-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new EquipmentIncidentApi(config);

  const body = {
    // string
    userId: user_123456,
    // string
    companyId: comp_btp001,
    // string
    id: inc_001,
  } satisfies DeleteEquipmentIncidentByIdRequest;

  try {
    const data = await api.deleteEquipmentIncidentById(body);
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
| **userId** | `string` |  | [Defaults to `undefined`] |
| **companyId** | `string` |  | [Defaults to `undefined`] |
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
| **204** | Equipment incident deleted successfully |  -  |
| **400** | Bad request |  -  |
| **403** | Forbidden |  -  |
| **404** | Not found |  -  |
| **429** | Too many requests to the API |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getEquipmentIncidentById

> EquipmentIncident getEquipmentIncidentById(userId, companyId, id)

Get equipment incident by identifier

### Example

```ts
import {
  Configuration,
  EquipmentIncidentApi,
} from 'api-client';
import type { GetEquipmentIncidentByIdRequest } from 'api-client';

async function example() {
  console.log("🚀 Testing api-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new EquipmentIncidentApi(config);

  const body = {
    // string
    userId: user_123456,
    // string
    companyId: comp_btp001,
    // string
    id: inc_001,
  } satisfies GetEquipmentIncidentByIdRequest;

  try {
    const data = await api.getEquipmentIncidentById(body);
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
| **userId** | `string` |  | [Defaults to `undefined`] |
| **companyId** | `string` |  | [Defaults to `undefined`] |
| **id** | `string` |  | [Defaults to `undefined`] |

### Return type

[**EquipmentIncident**](EquipmentIncident.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The identified equipment incident |  -  |
| **400** | Bad request |  -  |
| **403** | Forbidden |  -  |
| **404** | Not found |  -  |
| **429** | Too many requests to the API |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getEquipmentIncidents

> PaginatedResponse getEquipmentIncidents(userId, companyId, page, pageSize, equipmentId, incidentType, userId2, travelId)

Get all equipment incidents

### Example

```ts
import {
  Configuration,
  EquipmentIncidentApi,
} from 'api-client';
import type { GetEquipmentIncidentsRequest } from 'api-client';

async function example() {
  console.log("🚀 Testing api-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new EquipmentIncidentApi(config);

  const body = {
    // string
    userId: user_123456,
    // string
    companyId: comp_btp001,
    // number (optional)
    page: 1,
    // number (optional)
    pageSize: 20,
    // string (optional)
    equipmentId: eq_001,
    // IncidentType (optional)
    incidentType: ...,
    // string (optional)
    userId2: user_123456,
    // string (optional)
    travelId: travel_eq_010,
  } satisfies GetEquipmentIncidentsRequest;

  try {
    const data = await api.getEquipmentIncidents(body);
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
| **userId** | `string` |  | [Defaults to `undefined`] |
| **companyId** | `string` |  | [Defaults to `undefined`] |
| **page** | `number` |  | [Optional] [Defaults to `undefined`] |
| **pageSize** | `number` |  | [Optional] [Defaults to `undefined`] |
| **equipmentId** | `string` |  | [Optional] [Defaults to `undefined`] |
| **incidentType** | `IncidentType` |  | [Optional] [Defaults to `undefined`] [Enum: DAMAGED, LOST] |
| **userId2** | `string` |  | [Optional] [Defaults to `undefined`] |
| **travelId** | `string` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**PaginatedResponse**](PaginatedResponse.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | List of equipment incidents |  -  |
| **400** | Bad request |  -  |
| **403** | Forbidden |  -  |
| **404** | Not found |  -  |
| **429** | Too many requests to the API |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

