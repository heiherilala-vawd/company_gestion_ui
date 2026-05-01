# IncomeApi

All URIs are relative to *https://api-dev.company.com*

| Method                                                | HTTP request                                                             | Description                                |
| ----------------------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------ |
| [**crupdateIncomes**](IncomeApi.md#crupdateincomes)   | **PUT** /companies/{comp_id}/job/{job_id}/user/{user_id}/incomes         | Create new incomes or update existing ones |
| [**deleteIncomeById**](IncomeApi.md#deleteincomebyid) | **DELETE** /companies/{comp_id}/job/{job_id}/user/{user_id}/incomes/{id} | Delete income by identifier                |
| [**getIncomeById**](IncomeApi.md#getincomebyid)       | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/incomes/{id}    | Get income by identifier                   |
| [**getIncomes**](IncomeApi.md#getincomes)             | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/incomes         | Get all incomes                            |

## crupdateIncomes

> Array&lt;IncomeMoney&gt; crupdateIncomes(compId, jobId, userId, crupdateIncomeMoney)

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
    compId: compId_example,
    // string
    jobId: jobId_example,
    // string
    userId: userId_example,
    // Array<CrupdateIncomeMoney>
    crupdateIncomeMoney: ...,
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

| Name                    | Type                         | Description | Notes                     |
| ----------------------- | ---------------------------- | ----------- | ------------------------- |
| **compId**              | `string`                     |             | [Defaults to `undefined`] |
| **jobId**               | `string`                     |             | [Defaults to `undefined`] |
| **userId**              | `string`                     |             | [Defaults to `undefined`] |
| **crupdateIncomeMoney** | `Array<CrupdateIncomeMoney>` |             |                           |

### Return type

[**Array&lt;IncomeMoney&gt;**](IncomeMoney.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                    | Response headers |
| ----------- | ------------------------------ | ---------------- |
| **200**     | The created or updated incomes | -                |
| **400**     | Bad request                    | -                |
| **403**     | Forbidden                      | -                |
| **404**     | Not found                      | -                |
| **429**     | Too many requests to the API   | -                |
| **500**     | Internal server error          | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## deleteIncomeById

> deleteIncomeById(compId, jobId, userId, id)

Delete income by identifier

### Example

```ts
import { Configuration, IncomeApi } from 'api-client'
import type { DeleteIncomeByIdRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new IncomeApi(config)

  const body = {
    // string
    compId: compId_example,
    // string
    jobId: jobId_example,
    // string
    userId: userId_example,
    // string
    id: id_example,
  } satisfies DeleteIncomeByIdRequest

  try {
    const data = await api.deleteIncomeById(body)
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
| **204**     | Income deleted successfully  | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getIncomeById

> IncomeMoney getIncomeById(compId, jobId, userId, id)

Get income by identifier

### Example

```ts
import { Configuration, IncomeApi } from 'api-client'
import type { GetIncomeByIdRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new IncomeApi(config)

  const body = {
    // string
    compId: compId_example,
    // string
    jobId: jobId_example,
    // string
    userId: userId_example,
    // string
    id: id_example,
  } satisfies GetIncomeByIdRequest

  try {
    const data = await api.getIncomeById(body)
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

[**IncomeMoney**](IncomeMoney.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **200**     | The identified income        | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getIncomes

> Array&lt;IncomeMoney&gt; getIncomes(compId, jobId, userId, page, pageSize, sourceOrganization, invoiceReference, description, amount)

Get all incomes

### Example

```ts
import { Configuration, IncomeApi } from 'api-client'
import type { GetIncomesRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new IncomeApi(config)

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
    // string | Filter incomes by source organization, case is ignored (optional)
    sourceOrganization: sourceOrganization_example,
    // string | Filter incomes by invoice reference, case is ignored (optional)
    invoiceReference: invoiceReference_example,
    // string | Filter incomes by description, case is ignored (optional)
    description: description_example,
    // number (optional)
    amount: 56,
  } satisfies GetIncomesRequest

  try {
    const data = await api.getIncomes(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name                   | Type     | Description                                            | Notes                                |
| ---------------------- | -------- | ------------------------------------------------------ | ------------------------------------ |
| **compId**             | `string` |                                                        | [Defaults to `undefined`]            |
| **jobId**              | `string` |                                                        | [Defaults to `undefined`]            |
| **userId**             | `string` |                                                        | [Defaults to `undefined`]            |
| **page**               | `number` |                                                        | [Optional] [Defaults to `undefined`] |
| **pageSize**           | `number` |                                                        | [Optional] [Defaults to `undefined`] |
| **sourceOrganization** | `string` | Filter incomes by source organization, case is ignored | [Optional] [Defaults to `undefined`] |
| **invoiceReference**   | `string` | Filter incomes by invoice reference, case is ignored   | [Optional] [Defaults to `undefined`] |
| **description**        | `string` | Filter incomes by description, case is ignored         | [Optional] [Defaults to `undefined`] |
| **amount**             | `number` |                                                        | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;IncomeMoney&gt;**](IncomeMoney.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **200**     | List of incomes              | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
