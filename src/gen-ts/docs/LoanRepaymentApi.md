# LoanRepaymentApi

All URIs are relative to *https://api-dev.company.com*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**crupdateLoanRepayments**](LoanRepaymentApi.md#crupdateloanrepayments) | **PUT** /users/{userId}/companies/{companyId}/jobs/{jobId}/loan_repayments | Create new loan repayments or update existing ones |
| [**deleteLoanRepaymentById**](LoanRepaymentApi.md#deleteloanrepaymentbyid) | **DELETE** /users/{userId}/companies/{companyId}/jobs/{jobId}/loan_repayments/{id} | Delete loan repayment by identifier |
| [**getLoanRepaymentById**](LoanRepaymentApi.md#getloanrepaymentbyid) | **GET** /users/{userId}/companies/{companyId}/jobs/{jobId}/loan_repayments/{id} | Get loan repayment by identifier |
| [**getLoanRepayments**](LoanRepaymentApi.md#getloanrepayments) | **GET** /users/{userId}/companies/{companyId}/jobs/{jobId}/loan_repayments | Get all loan repayments |



## crupdateLoanRepayments

> Array&lt;LoanRepayment&gt; crupdateLoanRepayments(userId, companyId, jobId, crupdateLoanRepayment, loanId)

Create new loan repayments or update existing ones

### Example

```ts
import {
  Configuration,
  LoanRepaymentApi,
} from 'api-client';
import type { CrupdateLoanRepaymentsRequest } from 'api-client';

async function example() {
  console.log("🚀 Testing api-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new LoanRepaymentApi(config);

  const body = {
    // string
    userId: user_123456,
    // string
    companyId: comp_btp001,
    // string
    jobId: job_001,
    // Array<CrupdateLoanRepayment>
    crupdateLoanRepayment: ...,
    // string (optional)
    loanId: loan_001,
  } satisfies CrupdateLoanRepaymentsRequest;

  try {
    const data = await api.crupdateLoanRepayments(body);
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
| **crupdateLoanRepayment** | `Array<CrupdateLoanRepayment>` |  | |
| **loanId** | `string` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;LoanRepayment&gt;**](LoanRepayment.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The created or updated loan repayments |  -  |
| **400** | Bad request |  -  |
| **403** | Forbidden |  -  |
| **404** | Not found |  -  |
| **429** | Too many requests to the API |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteLoanRepaymentById

> deleteLoanRepaymentById(userId, companyId, jobId, id, loanId)

Delete loan repayment by identifier

### Example

```ts
import {
  Configuration,
  LoanRepaymentApi,
} from 'api-client';
import type { DeleteLoanRepaymentByIdRequest } from 'api-client';

async function example() {
  console.log("🚀 Testing api-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new LoanRepaymentApi(config);

  const body = {
    // string
    userId: user_123456,
    // string
    companyId: comp_btp001,
    // string
    jobId: job_001,
    // string
    id: repayment_001,
    // string (optional)
    loanId: loan_001,
  } satisfies DeleteLoanRepaymentByIdRequest;

  try {
    const data = await api.deleteLoanRepaymentById(body);
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
| **loanId** | `string` |  | [Optional] [Defaults to `undefined`] |

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
| **204** | Loan repayment deleted successfully |  -  |
| **400** | Bad request |  -  |
| **403** | Forbidden |  -  |
| **404** | Not found |  -  |
| **429** | Too many requests to the API |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getLoanRepaymentById

> LoanRepayment getLoanRepaymentById(userId, companyId, jobId, id, loanId)

Get loan repayment by identifier

### Example

```ts
import {
  Configuration,
  LoanRepaymentApi,
} from 'api-client';
import type { GetLoanRepaymentByIdRequest } from 'api-client';

async function example() {
  console.log("🚀 Testing api-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new LoanRepaymentApi(config);

  const body = {
    // string
    userId: user_123456,
    // string
    companyId: comp_btp001,
    // string
    jobId: job_001,
    // string
    id: repayment_001,
    // string (optional)
    loanId: loan_001,
  } satisfies GetLoanRepaymentByIdRequest;

  try {
    const data = await api.getLoanRepaymentById(body);
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
| **loanId** | `string` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**LoanRepayment**](LoanRepayment.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The identified loan repayment |  -  |
| **400** | Bad request |  -  |
| **403** | Forbidden |  -  |
| **404** | Not found |  -  |
| **429** | Too many requests to the API |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getLoanRepayments

> Array&lt;LoanRepayment&gt; getLoanRepayments(userId, companyId, jobId, loanId, page, pageSize)

Get all loan repayments

### Example

```ts
import {
  Configuration,
  LoanRepaymentApi,
} from 'api-client';
import type { GetLoanRepaymentsRequest } from 'api-client';

async function example() {
  console.log("🚀 Testing api-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new LoanRepaymentApi(config);

  const body = {
    // string
    userId: user_123456,
    // string
    companyId: comp_btp001,
    // string
    jobId: job_001,
    // string (optional)
    loanId: loan_001,
    // number (optional)
    page: 1,
    // number (optional)
    pageSize: 20,
  } satisfies GetLoanRepaymentsRequest;

  try {
    const data = await api.getLoanRepayments(body);
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
| **loanId** | `string` |  | [Optional] [Defaults to `undefined`] |
| **page** | `number` |  | [Optional] [Defaults to `undefined`] |
| **pageSize** | `number` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;LoanRepayment&gt;**](LoanRepayment.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | List of loan repayments |  -  |
| **400** | Bad request |  -  |
| **403** | Forbidden |  -  |
| **404** | Not found |  -  |
| **429** | Too many requests to the API |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

