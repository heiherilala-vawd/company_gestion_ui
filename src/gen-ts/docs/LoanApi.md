# LoanApi

All URIs are relative to *https://api-dev.company.com*

| Method                                          | HTTP request                                                           | Description                              |
| ----------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------- |
| [**crupdateLoans**](LoanApi.md#crupdateloans)   | **PUT** /companies/{comp_id}/job/{job_id}/user/{user_id}/loans         | Create new loans or update existing ones |
| [**deleteLoanById**](LoanApi.md#deleteloanbyid) | **DELETE** /companies/{comp_id}/job/{job_id}/user/{user_id}/loans/{id} | Delete loan by identifier                |
| [**getLoanById**](LoanApi.md#getloanbyid)       | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/loans/{id}    | Get loan by identifier                   |
| [**getLoans**](LoanApi.md#getloans)             | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/loans         | Get all loans                            |

## crupdateLoans

> Array&lt;Loan&gt; crupdateLoans(compId, jobId, userId, crupdateLoan)

Create new loans or update existing ones

### Example

```ts
import {
  Configuration,
  LoanApi,
} from 'api-client';
import type { CrupdateLoansRequest } from 'api-client';

async function example() {
  console.log("🚀 Testing api-client SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new LoanApi(config);

  const body = {
    // string
    compId: comp_btp001,
    // string
    jobId: job_001,
    // string
    userId: usr_123456,
    // Array<CrupdateLoan>
    crupdateLoan: ...,
  } satisfies CrupdateLoansRequest;

  try {
    const data = await api.crupdateLoans(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name             | Type                  | Description | Notes                     |
| ---------------- | --------------------- | ----------- | ------------------------- |
| **compId**       | `string`              |             | [Defaults to `undefined`] |
| **jobId**        | `string`              |             | [Defaults to `undefined`] |
| **userId**       | `string`              |             | [Defaults to `undefined`] |
| **crupdateLoan** | `Array<CrupdateLoan>` |             |                           |

### Return type

[**Array&lt;Loan&gt;**](Loan.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **200**     | The created or updated loans | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## deleteLoanById

> deleteLoanById(compId, jobId, userId, id)

Delete loan by identifier

### Example

```ts
import { Configuration, LoanApi } from 'api-client'
import type { DeleteLoanByIdRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new LoanApi(config)

  const body = {
    // string
    compId: comp_btp001,
    // string
    jobId: job_001,
    // string
    userId: usr_123456,
    // string
    id: loan_001,
  } satisfies DeleteLoanByIdRequest

  try {
    const data = await api.deleteLoanById(body)
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
| **id**     | `string` |             | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **204**     | Loan deleted successfully    | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getLoanById

> Loan getLoanById(compId, jobId, userId, id)

Get loan by identifier

### Example

```ts
import { Configuration, LoanApi } from 'api-client'
import type { GetLoanByIdRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new LoanApi(config)

  const body = {
    // string
    compId: comp_btp001,
    // string
    jobId: job_001,
    // string
    userId: usr_123456,
    // string
    id: loan_001,
  } satisfies GetLoanByIdRequest

  try {
    const data = await api.getLoanById(body)
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
| **id**     | `string` |             | [Defaults to `undefined`] |

### Return type

[**Loan**](Loan.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **200**     | The identified loan          | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getLoans

> Array&lt;Loan&gt; getLoans(compId, jobId, userId, page, pageSize, description, amount, lender, status)

Get all loans

### Example

```ts
import { Configuration, LoanApi } from 'api-client'
import type { GetLoansRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new LoanApi(config)

  const body = {
    // string
    compId: comp_btp001,
    // string
    jobId: job_001,
    // string
    userId: usr_123456,
    // number (optional)
    page: 1,
    // number (optional)
    pageSize: 20,
    // string | Filter loans by description, case is ignored (optional)
    description: construction,
    // number (optional)
    amount: 5000000,
    // string | Filter loans by lender, case is ignored (optional)
    lender: BNI,
    // LoanStatus | Filter loans by status (optional)
    status: ACTIVE,
  } satisfies GetLoansRequest

  try {
    const data = await api.getLoans(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name            | Type         | Description                                  | Notes                                                                |
| --------------- | ------------ | -------------------------------------------- | -------------------------------------------------------------------- |
| **compId**      | `string`     |                                              | [Defaults to `undefined`]                                            |
| **jobId**       | `string`     |                                              | [Defaults to `undefined`]                                            |
| **userId**      | `string`     |                                              | [Defaults to `undefined`]                                            |
| **page**        | `number`     |                                              | [Optional] [Defaults to `undefined`]                                 |
| **pageSize**    | `number`     |                                              | [Optional] [Defaults to `undefined`]                                 |
| **description** | `string`     | Filter loans by description, case is ignored | [Optional] [Defaults to `undefined`]                                 |
| **amount**      | `number`     |                                              | [Optional] [Defaults to `undefined`]                                 |
| **lender**      | `string`     | Filter loans by lender, case is ignored      | [Optional] [Defaults to `undefined`]                                 |
| **status**      | `LoanStatus` | Filter loans by status                       | [Optional] [Defaults to `undefined`] [Enum: ACTIVE, PAID, DEFAULTED] |

### Return type

[**Array&lt;Loan&gt;**](Loan.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **200**     | List of loans                | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
