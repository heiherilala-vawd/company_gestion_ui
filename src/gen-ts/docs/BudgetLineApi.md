# BudgetLineApi

All URIs are relative to *https://api-dev.company.com*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**crupdateBudgetLines**](BudgetLineApi.md#crupdatebudgetlines) | **PUT** /users/{userId}/companies/{companyId}/budget_lines | Create new budget lines or update existing ones |
| [**deleteBudgetLineById**](BudgetLineApi.md#deletebudgetlinebyid) | **DELETE** /users/{userId}/companies/{companyId}/budget_lines/{id} | Delete a budget line by identifier |
| [**getBudgetLineById**](BudgetLineApi.md#getbudgetlinebyid) | **GET** /users/{userId}/companies/{companyId}/budget_lines/{id} | Get a budget line by identifier |
| [**getBudgetLines**](BudgetLineApi.md#getbudgetlines) | **GET** /users/{userId}/companies/{companyId}/budget_lines | Get all budget lines |



## crupdateBudgetLines

> Array&lt;BudgetLine&gt; crupdateBudgetLines(userId, companyId, crupdateBudgetLine)

Create new budget lines or update existing ones

### Example

```ts
import {
  Configuration,
  BudgetLineApi,
} from 'api-client';
import type { CrupdateBudgetLinesRequest } from 'api-client';

async function example() {
  console.log("🚀 Testing api-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new BudgetLineApi(config);

  const body = {
    // string
    userId: user_123456,
    // string
    companyId: comp_btp001,
    // Array<CrupdateBudgetLine>
    crupdateBudgetLine: ...,
  } satisfies CrupdateBudgetLinesRequest;

  try {
    const data = await api.crupdateBudgetLines(body);
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
| **crupdateBudgetLine** | `Array<CrupdateBudgetLine>` |  | |

### Return type

[**Array&lt;BudgetLine&gt;**](BudgetLine.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The created or updated budget lines |  -  |
| **400** | Bad request |  -  |
| **403** | Forbidden |  -  |
| **404** | Not found |  -  |
| **429** | Too many requests to the API |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteBudgetLineById

> deleteBudgetLineById(userId, companyId, id)

Delete a budget line by identifier

### Example

```ts
import {
  Configuration,
  BudgetLineApi,
} from 'api-client';
import type { DeleteBudgetLineByIdRequest } from 'api-client';

async function example() {
  console.log("🚀 Testing api-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new BudgetLineApi(config);

  const body = {
    // string
    userId: user_123456,
    // string
    companyId: comp_btp001,
    // string
    id: bl_001,
  } satisfies DeleteBudgetLineByIdRequest;

  try {
    const data = await api.deleteBudgetLineById(body);
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
| **204** | Budget line deleted |  -  |
| **400** | Bad request |  -  |
| **403** | Forbidden |  -  |
| **404** | Not found |  -  |
| **429** | Too many requests to the API |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getBudgetLineById

> BudgetLine getBudgetLineById(userId, companyId, id)

Get a budget line by identifier

### Example

```ts
import {
  Configuration,
  BudgetLineApi,
} from 'api-client';
import type { GetBudgetLineByIdRequest } from 'api-client';

async function example() {
  console.log("🚀 Testing api-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new BudgetLineApi(config);

  const body = {
    // string
    userId: user_123456,
    // string
    companyId: comp_btp001,
    // string
    id: bl_001,
  } satisfies GetBudgetLineByIdRequest;

  try {
    const data = await api.getBudgetLineById(body);
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

[**BudgetLine**](BudgetLine.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The budget line |  -  |
| **400** | Bad request |  -  |
| **403** | Forbidden |  -  |
| **404** | Not found |  -  |
| **429** | Too many requests to the API |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getBudgetLines

> PaginatedResponse getBudgetLines(userId, companyId, page, pageSize)

Get all budget lines

### Example

```ts
import {
  Configuration,
  BudgetLineApi,
} from 'api-client';
import type { GetBudgetLinesRequest } from 'api-client';

async function example() {
  console.log("🚀 Testing api-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new BudgetLineApi(config);

  const body = {
    // string
    userId: user_123456,
    // string
    companyId: comp_btp001,
    // number (optional)
    page: 1,
    // number (optional)
    pageSize: 20,
  } satisfies GetBudgetLinesRequest;

  try {
    const data = await api.getBudgetLines(body);
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
| **200** | List of budget lines |  -  |
| **400** | Bad request |  -  |
| **403** | Forbidden |  -  |
| **404** | Not found |  -  |
| **429** | Too many requests to the API |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

