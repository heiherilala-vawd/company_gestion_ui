# ExpenseApi

All URIs are relative to *https://api-dev.company.com*

| Method                                                   | HTTP request                                                              | Description                                 |
| -------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------- |
| [**crupdateExpenses**](ExpenseApi.md#crupdateexpenses)   | **PUT** /companies/{comp_id}/job/{job_id}/user/{user_id}/expenses         | Create new expenses or update existing ones |
| [**deleteExpenseById**](ExpenseApi.md#deleteexpensebyid) | **DELETE** /companies/{comp_id}/job/{job_id}/user/{user_id}/expenses/{id} | Delete expense by identifier                |
| [**getExpenseById**](ExpenseApi.md#getexpensebyid)       | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/expenses/{id}    | Get expense by identifier                   |
| [**getExpenses**](ExpenseApi.md#getexpenses)             | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/expenses         | Get all expenses                            |

## crupdateExpenses

> Array&lt;ExpenseMoney&gt; crupdateExpenses(compId, jobId, userId, crupdateExpenseMoney)

Create new expenses or update existing ones

### Example

```ts
import {
  Configuration,
  ExpenseApi,
} from 'api-client';
import type { CrupdateExpensesRequest } from 'api-client';

async function example() {
  console.log("🚀 Testing api-client SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ExpenseApi(config);

  const body = {
    // string
    compId: compId_example,
    // string
    jobId: jobId_example,
    // string
    userId: userId_example,
    // Array<CrupdateExpenseMoney>
    crupdateExpenseMoney: ...,
  } satisfies CrupdateExpensesRequest;

  try {
    const data = await api.crupdateExpenses(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name                     | Type                          | Description | Notes                     |
| ------------------------ | ----------------------------- | ----------- | ------------------------- |
| **compId**               | `string`                      |             | [Defaults to `undefined`] |
| **jobId**                | `string`                      |             | [Defaults to `undefined`] |
| **userId**               | `string`                      |             | [Defaults to `undefined`] |
| **crupdateExpenseMoney** | `Array<CrupdateExpenseMoney>` |             |                           |

### Return type

[**Array&lt;ExpenseMoney&gt;**](ExpenseMoney.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                     | Response headers |
| ----------- | ------------------------------- | ---------------- |
| **200**     | The created or updated expenses | -                |
| **400**     | Bad request                     | -                |
| **403**     | Forbidden                       | -                |
| **404**     | Not found                       | -                |
| **429**     | Too many requests to the API    | -                |
| **500**     | Internal server error           | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## deleteExpenseById

> deleteExpenseById(compId, jobId, userId, id)

Delete expense by identifier

### Example

```ts
import { Configuration, ExpenseApi } from 'api-client'
import type { DeleteExpenseByIdRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new ExpenseApi(config)

  const body = {
    // string
    compId: compId_example,
    // string
    jobId: jobId_example,
    // string
    userId: userId_example,
    // string
    id: id_example,
  } satisfies DeleteExpenseByIdRequest

  try {
    const data = await api.deleteExpenseById(body)
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
| **204**     | Expense deleted successfully | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getExpenseById

> ExpenseMoney getExpenseById(compId, jobId, userId, id)

Get expense by identifier

### Example

```ts
import { Configuration, ExpenseApi } from 'api-client'
import type { GetExpenseByIdRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new ExpenseApi(config)

  const body = {
    // string
    compId: compId_example,
    // string
    jobId: jobId_example,
    // string
    userId: userId_example,
    // string
    id: id_example,
  } satisfies GetExpenseByIdRequest

  try {
    const data = await api.getExpenseById(body)
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

[**ExpenseMoney**](ExpenseMoney.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **200**     | The identified expense       | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getExpenses

> Array&lt;ExpenseMoney&gt; getExpenses(compId, jobId, userId, page, pageSize, description, amount)

Get all expenses

### Example

```ts
import { Configuration, ExpenseApi } from 'api-client'
import type { GetExpensesRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new ExpenseApi(config)

  const body = {
    // string
    compId: compId_example,
    // string
    jobId: jobId_example,
    // string
    userId: userId_example,
    // number (optional)
    page: 56,
    // number (optional)
    pageSize: 56,
    // string | Filter expenses by description, case is ignored (optional)
    description: description_example,
    // number (optional)
    amount: 56,
  } satisfies GetExpensesRequest

  try {
    const data = await api.getExpenses(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name            | Type     | Description                                     | Notes                                |
| --------------- | -------- | ----------------------------------------------- | ------------------------------------ |
| **compId**      | `string` |                                                 | [Defaults to `undefined`]            |
| **jobId**       | `string` |                                                 | [Defaults to `undefined`]            |
| **userId**      | `string` |                                                 | [Defaults to `undefined`]            |
| **page**        | `number` |                                                 | [Optional] [Defaults to `undefined`] |
| **pageSize**    | `number` |                                                 | [Optional] [Defaults to `undefined`] |
| **description** | `string` | Filter expenses by description, case is ignored | [Optional] [Defaults to `undefined`] |
| **amount**      | `number` |                                                 | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;ExpenseMoney&gt;**](ExpenseMoney.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **200**     | List of expenses             | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
