# LoanRepaymentApi

All URIs are relative to *https://api-dev.company.com*

| Method                                                                     | HTTP request                                                                                | Description                                        |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| [**crupdateLoanRepayments**](LoanRepaymentApi.md#crupdateloanrepayments)   | **PUT** /companies/{comp_id}/job/{job_id}/user/{user_id}/loans/{loan_id}/repayments         | Create new loan repayments or update existing ones |
| [**deleteLoanRepaymentById**](LoanRepaymentApi.md#deleteloanrepaymentbyid) | **DELETE** /companies/{comp_id}/job/{job_id}/user/{user_id}/loans/{loan_id}/repayments/{id} | Delete loan repayment by identifier                |
| [**getLoanRepaymentById**](LoanRepaymentApi.md#getloanrepaymentbyid)       | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/loans/{loan_id}/repayments/{id}    | Get loan repayment by identifier                   |
| [**getLoanRepayments**](LoanRepaymentApi.md#getloanrepayments)             | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/loans/{loan_id}/repayments         | Get all repayments for a loan                      |

## crupdateLoanRepayments

> Array&lt;LoanRepayment&gt; crupdateLoanRepayments(compId, jobId, userId, loanId, crupdateLoanRepayment)

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
    compId: comp_btp001,
    // string
    jobId: job_001,
    // string
    userId: usr_123456,
    // string
    loanId: loan_001,
    // Array<CrupdateLoanRepayment>
    crupdateLoanRepayment: ...,
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

| Name                      | Type                           | Description | Notes                     |
| ------------------------- | ------------------------------ | ----------- | ------------------------- |
| **compId**                | `string`                       |             | [Defaults to `undefined`] |
| **jobId**                 | `string`                       |             | [Defaults to `undefined`] |
| **userId**                | `string`                       |             | [Defaults to `undefined`] |
| **loanId**                | `string`                       |             | [Defaults to `undefined`] |
| **crupdateLoanRepayment** | `Array<CrupdateLoanRepayment>` |             |                           |

### Return type

[**Array&lt;LoanRepayment&gt;**](LoanRepayment.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                            | Response headers |
| ----------- | -------------------------------------- | ---------------- |
| **200**     | The created or updated loan repayments | -                |
| **400**     | Bad request                            | -                |
| **403**     | Forbidden                              | -                |
| **404**     | Not found                              | -                |
| **429**     | Too many requests to the API           | -                |
| **500**     | Internal server error                  | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## deleteLoanRepaymentById

> deleteLoanRepaymentById(compId, jobId, userId, loanId, id)

Delete loan repayment by identifier

### Example

```ts
import { Configuration, LoanRepaymentApi } from 'api-client'
import type { DeleteLoanRepaymentByIdRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new LoanRepaymentApi(config)

  const body = {
    // string
    compId: comp_btp001,
    // string
    jobId: job_001,
    // string
    userId: usr_123456,
    // string
    loanId: loan_001,
    // string
    id: repayment_001,
  } satisfies DeleteLoanRepaymentByIdRequest

  try {
    const data = await api.deleteLoanRepaymentById(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name       | Type     | Description | Notes                     |
| ---------- | -------- | ----------- | ------------------------- |
| **compId** | `string` |             | [Defaults to `undefined`] |
| **jobId**  | `string` |             | [Defaults to `undefined`] |
| **userId** | `string` |             | [Defaults to `undefined`] |
| **loanId** | `string` |             | [Defaults to `undefined`] |
| **id**     | `string` |             | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                         | Response headers |
| ----------- | ----------------------------------- | ---------------- |
| **204**     | Loan repayment deleted successfully | -                |
| **400**     | Bad request                         | -                |
| **403**     | Forbidden                           | -                |
| **404**     | Not found                           | -                |
| **429**     | Too many requests to the API        | -                |
| **500**     | Internal server error               | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getLoanRepaymentById

> LoanRepayment getLoanRepaymentById(compId, jobId, userId, loanId, id)

Get loan repayment by identifier

### Example

```ts
import { Configuration, LoanRepaymentApi } from 'api-client'
import type { GetLoanRepaymentByIdRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new LoanRepaymentApi(config)

  const body = {
    // string
    compId: comp_btp001,
    // string
    jobId: job_001,
    // string
    userId: usr_123456,
    // string
    loanId: loan_001,
    // string
    id: repayment_001,
  } satisfies GetLoanRepaymentByIdRequest

  try {
    const data = await api.getLoanRepaymentById(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name       | Type     | Description | Notes                     |
| ---------- | -------- | ----------- | ------------------------- |
| **compId** | `string` |             | [Defaults to `undefined`] |
| **jobId**  | `string` |             | [Defaults to `undefined`] |
| **userId** | `string` |             | [Defaults to `undefined`] |
| **loanId** | `string` |             | [Defaults to `undefined`] |
| **id**     | `string` |             | [Defaults to `undefined`] |

### Return type

[**LoanRepayment**](LoanRepayment.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                   | Response headers |
| ----------- | ----------------------------- | ---------------- |
| **200**     | The identified loan repayment | -                |
| **400**     | Bad request                   | -                |
| **403**     | Forbidden                     | -                |
| **404**     | Not found                     | -                |
| **429**     | Too many requests to the API  | -                |
| **500**     | Internal server error         | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getLoanRepayments

> Array&lt;LoanRepayment&gt; getLoanRepayments(compId, jobId, userId, loanId, page, pageSize)

Get all repayments for a loan

### Example

```ts
import { Configuration, LoanRepaymentApi } from 'api-client'
import type { GetLoanRepaymentsRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new LoanRepaymentApi(config)

  const body = {
    // string
    compId: comp_btp001,
    // string
    jobId: job_001,
    // string
    userId: usr_123456,
    // string
    loanId: loan_001,
    // number (optional)
    page: 1,
    // number (optional)
    pageSize: 20,
  } satisfies GetLoanRepaymentsRequest

  try {
    const data = await api.getLoanRepayments(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name         | Type     | Description | Notes                                |
| ------------ | -------- | ----------- | ------------------------------------ |
| **compId**   | `string` |             | [Defaults to `undefined`]            |
| **jobId**    | `string` |             | [Defaults to `undefined`]            |
| **userId**   | `string` |             | [Defaults to `undefined`]            |
| **loanId**   | `string` |             | [Defaults to `undefined`]            |
| **page**     | `number` |             | [Optional] [Defaults to `undefined`] |
| **pageSize** | `number` |             | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;LoanRepayment&gt;**](LoanRepayment.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **200**     | List of loan repayments      | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
