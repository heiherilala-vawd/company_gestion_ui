# TravelExpenseApi

All URIs are relative to *https://api-dev.company.com*

| Method                                                                     | HTTP request                                                                                            | Description                                        |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| [**crupdateTravelExpenses**](TravelExpenseApi.md#crupdatetravelexpenses)   | **PUT** /companies/{comp_id}/job/{job_id}/user/{user_id}/expenses/{expenses_id}/travel_expenses         | Create new travel expenses or update existing ones |
| [**deleteTravelExpenseById**](TravelExpenseApi.md#deletetravelexpensebyid) | **DELETE** /companies/{comp_id}/job/{job_id}/user/{user_id}/expenses/{expenses_id}/travel_expenses/{id} | Delete travel expense by identifier                |
| [**getTravelExpenseById**](TravelExpenseApi.md#gettravelexpensebyid)       | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/expenses/{expenses_id}/travel_expenses/{id}    | Get travel expense by identifier                   |
| [**getTravelExpenses**](TravelExpenseApi.md#gettravelexpenses)             | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/expenses/{expenses_id}/travel_expenses         | Get all travel expenses                            |

## crupdateTravelExpenses

> Array&lt;TravelExpense&gt; crupdateTravelExpenses(compId, jobId, userId, expensesId, crupdateTravelExpense)

Create new travel expenses or update existing ones

### Example

```ts
import {
  Configuration,
  TravelExpenseApi,
} from 'api-client';
import type { CrupdateTravelExpensesRequest } from 'api-client';

async function example() {
  console.log("🚀 Testing api-client SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new TravelExpenseApi(config);

  const body = {
    // string
    compId: compId_example,
    // string
    jobId: jobId_example,
    // string
    userId: userId_example,
    // string
    expensesId: expensesId_example,
    // Array<CrupdateTravelExpense>
    crupdateTravelExpense: ...,
  } satisfies CrupdateTravelExpensesRequest;

  try {
    const data = await api.crupdateTravelExpenses(body);
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
| **expensesId**            | `string`                       |             | [Defaults to `undefined`] |
| **crupdateTravelExpense** | `Array<CrupdateTravelExpense>` |             |                           |

### Return type

[**Array&lt;TravelExpense&gt;**](TravelExpense.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                            | Response headers |
| ----------- | -------------------------------------- | ---------------- |
| **200**     | The created or updated travel expenses | -                |
| **400**     | Bad request                            | -                |
| **403**     | Forbidden                              | -                |
| **404**     | Not found                              | -                |
| **429**     | Too many requests to the API           | -                |
| **500**     | Internal server error                  | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## deleteTravelExpenseById

> deleteTravelExpenseById(compId, jobId, userId, expensesId, id)

Delete travel expense by identifier

### Example

```ts
import { Configuration, TravelExpenseApi } from 'api-client'
import type { DeleteTravelExpenseByIdRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new TravelExpenseApi(config)

  const body = {
    // string
    compId: compId_example,
    // string
    jobId: jobId_example,
    // string
    userId: userId_example,
    // string
    expensesId: expensesId_example,
    // string
    id: id_example,
  } satisfies DeleteTravelExpenseByIdRequest

  try {
    const data = await api.deleteTravelExpenseById(body)
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

| Status code | Description                         | Response headers |
| ----------- | ----------------------------------- | ---------------- |
| **204**     | Travel expense deleted successfully | -                |
| **400**     | Bad request                         | -                |
| **403**     | Forbidden                           | -                |
| **404**     | Not found                           | -                |
| **429**     | Too many requests to the API        | -                |
| **500**     | Internal server error               | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getTravelExpenseById

> TravelExpense getTravelExpenseById(compId, jobId, userId, expensesId, id)

Get travel expense by identifier

### Example

```ts
import { Configuration, TravelExpenseApi } from 'api-client'
import type { GetTravelExpenseByIdRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new TravelExpenseApi(config)

  const body = {
    // string
    compId: compId_example,
    // string
    jobId: jobId_example,
    // string
    userId: userId_example,
    // string
    expensesId: expensesId_example,
    // string
    id: id_example,
  } satisfies GetTravelExpenseByIdRequest

  try {
    const data = await api.getTravelExpenseById(body)
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

[**TravelExpense**](TravelExpense.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                   | Response headers |
| ----------- | ----------------------------- | ---------------- |
| **200**     | The identified travel expense | -                |
| **400**     | Bad request                   | -                |
| **403**     | Forbidden                     | -                |
| **404**     | Not found                     | -                |
| **429**     | Too many requests to the API  | -                |
| **500**     | Internal server error         | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getTravelExpenses

> Array&lt;TravelExpense&gt; getTravelExpenses(compId, jobId, userId, expensesId, page, pageSize, expenseId, departureLocation, arrivalLocation)

Get all travel expenses

### Example

```ts
import { Configuration, TravelExpenseApi } from 'api-client'
import type { GetTravelExpensesRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new TravelExpenseApi(config)

  const body = {
    // string
    compId: compId_example,
    // string
    jobId: jobId_example,
    // string
    userId: userId_example,
    // string
    expensesId: expensesId_example,
    // number (optional)
    page: 56,
    // number (optional)
    pageSize: 56,
    // string (optional)
    expenseId: expenseId_example,
    // string | Filter travel expenses by departure location, case is ignored (optional)
    departureLocation: departureLocation_example,
    // string | Filter travel expenses by arrival location, case is ignored (optional)
    arrivalLocation: arrivalLocation_example,
  } satisfies GetTravelExpensesRequest

  try {
    const data = await api.getTravelExpenses(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name                  | Type     | Description                                                   | Notes                                |
| --------------------- | -------- | ------------------------------------------------------------- | ------------------------------------ |
| **compId**            | `string` |                                                               | [Defaults to `undefined`]            |
| **jobId**             | `string` |                                                               | [Defaults to `undefined`]            |
| **userId**            | `string` |                                                               | [Defaults to `undefined`]            |
| **expensesId**        | `string` |                                                               | [Defaults to `undefined`]            |
| **page**              | `number` |                                                               | [Optional] [Defaults to `undefined`] |
| **pageSize**          | `number` |                                                               | [Optional] [Defaults to `undefined`] |
| **expenseId**         | `string` |                                                               | [Optional] [Defaults to `undefined`] |
| **departureLocation** | `string` | Filter travel expenses by departure location, case is ignored | [Optional] [Defaults to `undefined`] |
| **arrivalLocation**   | `string` | Filter travel expenses by arrival location, case is ignored   | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;TravelExpense&gt;**](TravelExpense.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **200**     | List of travel expenses      | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
