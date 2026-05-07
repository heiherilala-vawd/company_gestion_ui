# IncomeTypeApi

All URIs are relative to *https://api-dev.company.com*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**crupdateIncomeTypes**](IncomeTypeApi.md#crupdateincometypes) | **PUT** /companies/{comp_id}/income_types | Create new income types or update existing ones |
| [**deleteIncomeTypeById**](IncomeTypeApi.md#deleteincometypebyid) | **DELETE** /companies/{comp_id}/income_types/{id} | Delete an income type by identifier |
| [**getIncomeTypes**](IncomeTypeApi.md#getincometypes) | **GET** /companies/{comp_id}/income_types | Get all income types for a company |



## crupdateIncomeTypes

> Array&lt;IncomeType&gt; crupdateIncomeTypes(compId, crupdateIncomeType)

Create new income types or update existing ones

### Example

```ts
import {
  Configuration,
  IncomeTypeApi,
} from 'api-client';
import type { CrupdateIncomeTypesRequest } from 'api-client';

async function example() {
  console.log("🚀 Testing api-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new IncomeTypeApi(config);

  const body = {
    // string
    compId: comp_btp001,
    // Array<CrupdateIncomeType>
    crupdateIncomeType: [{"id":"income_type_001","name":"Facturation client","description":"Revenus issus de la facturation client","company_id":"comp_btp001","comment":"Type principal"},{"name":"Don","description":"Dons et apports exceptionnels","company_id":"comp_btp001","comment":"Nouveau type"}],
  } satisfies CrupdateIncomeTypesRequest;

  try {
    const data = await api.crupdateIncomeTypes(body);
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
| **crupdateIncomeType** | `Array<CrupdateIncomeType>` |  | |

### Return type

[**Array&lt;IncomeType&gt;**](IncomeType.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The created or updated income types |  -  |
| **400** | Bad request |  -  |
| **403** | Forbidden |  -  |
| **404** | Not found |  -  |
| **429** | Too many requests to the API |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteIncomeTypeById

> deleteIncomeTypeById(compId, id)

Delete an income type by identifier

### Example

```ts
import {
  Configuration,
  IncomeTypeApi,
} from 'api-client';
import type { DeleteIncomeTypeByIdRequest } from 'api-client';

async function example() {
  console.log("🚀 Testing api-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new IncomeTypeApi(config);

  const body = {
    // string
    compId: comp_btp001,
    // string
    id: income_type_001,
  } satisfies DeleteIncomeTypeByIdRequest;

  try {
    const data = await api.deleteIncomeTypeById(body);
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
| **204** | Income type deleted successfully |  -  |
| **400** | Bad request |  -  |
| **403** | Forbidden |  -  |
| **404** | Not found |  -  |
| **429** | Too many requests to the API |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getIncomeTypes

> Array&lt;IncomeType&gt; getIncomeTypes(compId)

Get all income types for a company

### Example

```ts
import {
  Configuration,
  IncomeTypeApi,
} from 'api-client';
import type { GetIncomeTypesRequest } from 'api-client';

async function example() {
  console.log("🚀 Testing api-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new IncomeTypeApi(config);

  const body = {
    // string
    compId: comp_btp001,
  } satisfies GetIncomeTypesRequest;

  try {
    const data = await api.getIncomeTypes(body);
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

### Return type

[**Array&lt;IncomeType&gt;**](IncomeType.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | List of income types |  -  |
| **400** | Bad request |  -  |
| **403** | Forbidden |  -  |
| **404** | Not found |  -  |
| **429** | Too many requests to the API |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

