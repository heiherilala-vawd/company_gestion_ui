# IncomeApi

All URIs are relative to *https://api-dev.company.com*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**crupdateIncomes**](IncomeApi.md#crupdateincomes) | **PUT** /users/{userId}/companies/{companyId}/jobs/{jobId}/incomes | Create new incomes or update existing ones |
| [**deleteIncomeById**](IncomeApi.md#deleteincomebyid) | **DELETE** /users/{userId}/companies/{companyId}/jobs/{jobId}/incomes/{id} | Delete income by identifier |
| [**getIncomeById**](IncomeApi.md#getincomebyid) | **GET** /users/{userId}/companies/{companyId}/jobs/{jobId}/incomes/{id} | Get income by identifier |
| [**getIncomes**](IncomeApi.md#getincomes) | **GET** /users/{userId}/companies/{companyId}/jobs/{jobId}/incomes | Get all incomes |
| [**getIncomesExcel**](IncomeApi.md#getincomesexcel) | **GET** /users/{userId}/companies/{companyId}/jobs/{jobId}/incomes/excel | Export incomes to Excel |



## crupdateIncomes

> Array&lt;IncomeMoney&gt; crupdateIncomes(userId, companyId, jobId, crupdateIncomeMoney)

Create new incomes or update existing ones

### Example

```ts
import {
  Configuration,
  IncomeApi,
} from 'api-client';
import type { CrupdateIncomesRequest } from 'api-client';

async function example() {
  console.log("🚀 Testing api-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new IncomeApi(config);

  const body = {
    // string
    userId: user_123456,
    // string
    companyId: comp_btp001,
    // string
    jobId: job_001,
    // Array<CrupdateIncomeMoney>
    crupdateIncomeMoney: [{"id":"inc_001","amount":55000,"source_organization":"Client Principal","invoice_reference":"FACT-2024-001","billing_start_date":"2024-01-15","income_type_id":"income_type_001","description":"Premier acompte pour le chantier (révisé)","job_id":"job_001","comment":"Acompte révisé à 33%"},{"amount":40000,"source_organization":"Subvention","invoice_reference":"SUB-2024-01","billing_start_date":"2024-02-20","income_type_id":"income_type_002","description":"Aide à la construction","job_id":"job_001","comment":"Subvention région"}],
  } satisfies CrupdateIncomesRequest;

  try {
    const data = await api.crupdateIncomes(body);
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
| **jobId** | `string` |  | [Defaults to `undefined`] |
| **crupdateIncomeMoney** | `Array<CrupdateIncomeMoney>` |  | |

### Return type

[**Array&lt;IncomeMoney&gt;**](IncomeMoney.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The created or updated incomes |  -  |
| **400** | Bad request |  -  |
| **403** | Forbidden |  -  |
| **404** | Not found |  -  |
| **429** | Too many requests to the API |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteIncomeById

> deleteIncomeById(userId, companyId, jobId, id)

Delete income by identifier

### Example

```ts
import {
  Configuration,
  IncomeApi,
} from 'api-client';
import type { DeleteIncomeByIdRequest } from 'api-client';

async function example() {
  console.log("🚀 Testing api-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new IncomeApi(config);

  const body = {
    // string
    userId: user_123456,
    // string
    companyId: comp_btp001,
    // string
    jobId: job_001,
    // string
    id: inc_001,
  } satisfies DeleteIncomeByIdRequest;

  try {
    const data = await api.deleteIncomeById(body);
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
| **jobId** | `string` |  | [Defaults to `undefined`] |
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
| **204** | Income deleted successfully |  -  |
| **400** | Bad request |  -  |
| **403** | Forbidden |  -  |
| **404** | Not found |  -  |
| **429** | Too many requests to the API |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getIncomeById

> IncomeMoney getIncomeById(userId, companyId, jobId, id)

Get income by identifier

### Example

```ts
import {
  Configuration,
  IncomeApi,
} from 'api-client';
import type { GetIncomeByIdRequest } from 'api-client';

async function example() {
  console.log("🚀 Testing api-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new IncomeApi(config);

  const body = {
    // string
    userId: user_123456,
    // string
    companyId: comp_btp001,
    // string
    jobId: job_001,
    // string
    id: inc_001,
  } satisfies GetIncomeByIdRequest;

  try {
    const data = await api.getIncomeById(body);
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
| **jobId** | `string` |  | [Defaults to `undefined`] |
| **id** | `string` |  | [Defaults to `undefined`] |

### Return type

[**IncomeMoney**](IncomeMoney.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The identified income |  -  |
| **400** | Bad request |  -  |
| **403** | Forbidden |  -  |
| **404** | Not found |  -  |
| **429** | Too many requests to the API |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getIncomes

> PaginatedResponse getIncomes(userId, companyId, jobId, page, pageSize, organizationId, invoiceReference, description, amount, incomeTypeId, moneyReceived)

Get all incomes

### Example

```ts
import {
  Configuration,
  IncomeApi,
} from 'api-client';
import type { GetIncomesRequest } from 'api-client';

async function example() {
  console.log("🚀 Testing api-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new IncomeApi(config);

  const body = {
    // string
    userId: user_123456,
    // string
    companyId: comp_btp001,
    // string
    jobId: job_001,
    // number (optional)
    page: 1,
    // number (optional)
    pageSize: 20,
    // string | Filter incomes by organization ID (optional)
    organizationId: org_001,
    // string | Filter incomes by invoice reference, case is ignored (optional)
    invoiceReference: FACT-2024,
    // string | Filter incomes by description, case is ignored (optional)
    description: acompte,
    // number (optional)
    amount: 50000,
    // string | Filter incomes by income type (optional)
    incomeTypeId: income_type_001,
    // boolean | Filter incomes by money received status (amount minus sum of receipts <= 0) (optional)
    moneyReceived: true,
  } satisfies GetIncomesRequest;

  try {
    const data = await api.getIncomes(body);
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
| **jobId** | `string` |  | [Defaults to `undefined`] |
| **page** | `number` |  | [Optional] [Defaults to `undefined`] |
| **pageSize** | `number` |  | [Optional] [Defaults to `undefined`] |
| **organizationId** | `string` | Filter incomes by organization ID | [Optional] [Defaults to `undefined`] |
| **invoiceReference** | `string` | Filter incomes by invoice reference, case is ignored | [Optional] [Defaults to `undefined`] |
| **description** | `string` | Filter incomes by description, case is ignored | [Optional] [Defaults to `undefined`] |
| **amount** | `number` |  | [Optional] [Defaults to `undefined`] |
| **incomeTypeId** | `string` | Filter incomes by income type | [Optional] [Defaults to `undefined`] |
| **moneyReceived** | `boolean` | Filter incomes by money received status (amount minus sum of receipts &lt;&#x3D; 0) | [Optional] [Defaults to `undefined`] |

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
| **200** | List of incomes |  -  |
| **400** | Bad request |  -  |
| **403** | Forbidden |  -  |
| **404** | Not found |  -  |
| **429** | Too many requests to the API |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getIncomesExcel

> Blob getIncomesExcel(userId, companyId, jobId)

Export incomes to Excel

### Example

```ts
import {
  Configuration,
  IncomeApi,
} from 'api-client';
import type { GetIncomesExcelRequest } from 'api-client';

async function example() {
  console.log("🚀 Testing api-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new IncomeApi(config);

  const body = {
    // string
    userId: user_123456,
    // string
    companyId: comp_btp001,
    // string
    jobId: job_001,
  } satisfies GetIncomesExcelRequest;

  try {
    const data = await api.getIncomesExcel(body);
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
| **jobId** | `string` |  | [Defaults to `undefined`] |

### Return type

**Blob**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`, `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Excel file with incomes data |  -  |
| **400** | Bad request |  -  |
| **403** | Forbidden |  -  |
| **404** | Not found |  -  |
| **429** | Too many requests to the API |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

