# OtherExpenseApi

All URIs are relative to *https://api-dev.company.com*

| Method                                                                  | HTTP request                                                                                           | Description                                       |
| ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------- |
| [**crupdateOtherExpenses**](OtherExpenseApi.md#crupdateotherexpenses)   | **PUT** /companies/{comp_id}/job/{job_id}/user/{user_id}/expenses/{expenses_id}/other_expenses         | Create new other expenses or update existing ones |
| [**deleteOtherExpenseById**](OtherExpenseApi.md#deleteotherexpensebyid) | **DELETE** /companies/{comp_id}/job/{job_id}/user/{user_id}/expenses/{expenses_id}/other_expenses/{id} | Delete other expense by identifier                |
| [**getOtherExpenseById**](OtherExpenseApi.md#getotherexpensebyid)       | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/expenses/{expenses_id}/other_expenses/{id}    | Get other expense by identifier                   |
| [**getOtherExpenses**](OtherExpenseApi.md#getotherexpenses)             | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/expenses/{expenses_id}/other_expenses         | Get all other expenses                            |

## crupdateOtherExpenses

> Array&lt;OtherExpense&gt; crupdateOtherExpenses(compId, jobId, userId, expensesId, crupdateOtherExpense)

Create new other expenses or update existing ones

### Example

```ts
import { Configuration, OtherExpenseApi } from 'api-client'
import type { CrupdateOtherExpensesRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new OtherExpenseApi(config)

  const body = {
    // string
    compId: comp_btp001,
    // string
    jobId: job_001,
    // string
    userId: usr_123456,
    // string
    expensesId: exp_002,
    // Array<CrupdateOtherExpense>
    crupdateOtherExpense: [
      { id: 'other_001', expense_id: 'exp_002', description: 'Frais de carburant et entretien' },
    ],
  } satisfies CrupdateOtherExpensesRequest

  try {
    const data = await api.crupdateOtherExpenses(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name                     | Type                          | Description | Notes                     |
| ------------------------ | ----------------------------- | ----------- | ------------------------- |
| **compId**               | `string`                      |             | [Defaults to `undefined`] |
| **jobId**                | `string`                      |             | [Defaults to `undefined`] |
| **userId**               | `string`                      |             | [Defaults to `undefined`] |
| **expensesId**           | `string`                      |             | [Defaults to `undefined`] |
| **crupdateOtherExpense** | `Array<CrupdateOtherExpense>` |             |                           |

### Return type

[**Array&lt;OtherExpense&gt;**](OtherExpense.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                           | Response headers |
| ----------- | ------------------------------------- | ---------------- |
| **200**     | The created or updated other expenses | -                |
| **400**     | Bad request                           | -                |
| **403**     | Forbidden                             | -                |
| **404**     | Not found                             | -                |
| **429**     | Too many requests to the API          | -                |
| **500**     | Internal server error                 | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## deleteOtherExpenseById

> deleteOtherExpenseById(compId, jobId, userId, expensesId, id)

Delete other expense by identifier

### Example

```ts
import { Configuration, OtherExpenseApi } from 'api-client'
import type { DeleteOtherExpenseByIdRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new OtherExpenseApi(config)

  const body = {
    // string
    compId: comp_btp001,
    // string
    jobId: job_001,
    // string
    userId: usr_123456,
    // string
    expensesId: exp_002,
    // string
    id: other_001,
  } satisfies DeleteOtherExpenseByIdRequest

  try {
    const data = await api.deleteOtherExpenseById(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name           | Type     | Description | Notes                     |
| -------------- | -------- | ----------- | ------------------------- |
| **compId**     | `string` |             | [Defaults to `undefined`] |
| **jobId**      | `string` |             | [Defaults to `undefined`] |
| **userId**     | `string` |             | [Defaults to `undefined`] |
| **expensesId** | `string` |             | [Defaults to `undefined`] |
| **id**         | `string` |             | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                        | Response headers |
| ----------- | ---------------------------------- | ---------------- |
| **204**     | Other expense deleted successfully | -                |
| **400**     | Bad request                        | -                |
| **403**     | Forbidden                          | -                |
| **404**     | Not found                          | -                |
| **429**     | Too many requests to the API       | -                |
| **500**     | Internal server error              | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getOtherExpenseById

> OtherExpense getOtherExpenseById(compId, jobId, userId, expensesId, id)

Get other expense by identifier

### Example

```ts
import { Configuration, OtherExpenseApi } from 'api-client'
import type { GetOtherExpenseByIdRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new OtherExpenseApi(config)

  const body = {
    // string
    compId: comp_btp001,
    // string
    jobId: job_001,
    // string
    userId: usr_123456,
    // string
    expensesId: exp_002,
    // string
    id: other_001,
  } satisfies GetOtherExpenseByIdRequest

  try {
    const data = await api.getOtherExpenseById(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name           | Type     | Description | Notes                     |
| -------------- | -------- | ----------- | ------------------------- |
| **compId**     | `string` |             | [Defaults to `undefined`] |
| **jobId**      | `string` |             | [Defaults to `undefined`] |
| **userId**     | `string` |             | [Defaults to `undefined`] |
| **expensesId** | `string` |             | [Defaults to `undefined`] |
| **id**         | `string` |             | [Defaults to `undefined`] |

### Return type

[**OtherExpense**](OtherExpense.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **200**     | The identified other expense | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getOtherExpenses

> Array&lt;OtherExpense&gt; getOtherExpenses(compId, jobId, userId, expensesId, page, pageSize, expenseId, description)

Get all other expenses

### Example

```ts
import { Configuration, OtherExpenseApi } from 'api-client'
import type { GetOtherExpensesRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new OtherExpenseApi(config)

  const body = {
    // string
    compId: comp_btp001,
    // string
    jobId: job_001,
    // string
    userId: usr_123456,
    // string
    expensesId: exp_002,
    // number (optional)
    page: 1,
    // number (optional)
    pageSize: 20,
    // string (optional)
    expenseId: exp_002,
    // string | Filter other expenses by description, case is ignored (optional)
    description: carburant,
  } satisfies GetOtherExpensesRequest

  try {
    const data = await api.getOtherExpenses(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name            | Type     | Description                                           | Notes                                |
| --------------- | -------- | ----------------------------------------------------- | ------------------------------------ |
| **compId**      | `string` |                                                       | [Defaults to `undefined`]            |
| **jobId**       | `string` |                                                       | [Defaults to `undefined`]            |
| **userId**      | `string` |                                                       | [Defaults to `undefined`]            |
| **expensesId**  | `string` |                                                       | [Defaults to `undefined`]            |
| **page**        | `number` |                                                       | [Optional] [Defaults to `undefined`] |
| **pageSize**    | `number` |                                                       | [Optional] [Defaults to `undefined`] |
| **expenseId**   | `string` |                                                       | [Optional] [Defaults to `undefined`] |
| **description** | `string` | Filter other expenses by description, case is ignored | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;OtherExpense&gt;**](OtherExpense.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **200**     | List of other expenses       | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
