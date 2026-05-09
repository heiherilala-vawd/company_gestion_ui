# IncomeReceiptApi

All URIs are relative to *https://api-dev.company.com*

| Method                                                                     | HTTP request                                                                                  | Description                                        |
| -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| [**crupdateIncomeReceipts**](IncomeReceiptApi.md#crupdateincomereceipts)   | **PUT** /companies/{comp_id}/job/{job_id}/user/{user_id}/incomes/{income_id}/receipts         | Create new income receipts or update existing ones |
| [**deleteIncomeReceiptById**](IncomeReceiptApi.md#deleteincomereceiptbyid) | **DELETE** /companies/{comp_id}/job/{job_id}/user/{user_id}/incomes/{income_id}/receipts/{id} | Delete income receipt by identifier                |
| [**getIncomeReceiptById**](IncomeReceiptApi.md#getincomereceiptbyid)       | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/incomes/{income_id}/receipts/{id}    | Get income receipt by identifier                   |
| [**getIncomeReceipts**](IncomeReceiptApi.md#getincomereceipts)             | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/incomes/{income_id}/receipts         | Get all receipts for an income                     |

## crupdateIncomeReceipts

> Array&lt;IncomeReceipt&gt; crupdateIncomeReceipts(compId, jobId, userId, incomeId, crupdateIncomeReceipt)

Create new income receipts or update existing ones

### Example

```ts
import {
  Configuration,
  IncomeReceiptApi,
} from 'api-client';
import type { CrupdateIncomeReceiptsRequest } from 'api-client';

async function example() {
  console.log("🚀 Testing api-client SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new IncomeReceiptApi(config);

  const body = {
    // string
    compId: comp_btp001,
    // string
    jobId: job_001,
    // string
    userId: usr_123456,
    // string
    incomeId: inc_001,
    // Array<CrupdateIncomeReceipt>
    crupdateIncomeReceipt: ...,
  } satisfies CrupdateIncomeReceiptsRequest;

  try {
    const data = await api.crupdateIncomeReceipts(body);
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
| **incomeId**              | `string`                       |             | [Defaults to `undefined`] |
| **crupdateIncomeReceipt** | `Array<CrupdateIncomeReceipt>` |             |                           |

### Return type

[**Array&lt;IncomeReceipt&gt;**](IncomeReceipt.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                            | Response headers |
| ----------- | -------------------------------------- | ---------------- |
| **200**     | The created or updated income receipts | -                |
| **400**     | Bad request                            | -                |
| **403**     | Forbidden                              | -                |
| **404**     | Not found                              | -                |
| **429**     | Too many requests to the API           | -                |
| **500**     | Internal server error                  | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## deleteIncomeReceiptById

> deleteIncomeReceiptById(compId, jobId, userId, incomeId, id)

Delete income receipt by identifier

### Example

```ts
import { Configuration, IncomeReceiptApi } from 'api-client'
import type { DeleteIncomeReceiptByIdRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new IncomeReceiptApi(config)

  const body = {
    // string
    compId: comp_btp001,
    // string
    jobId: job_001,
    // string
    userId: usr_123456,
    // string
    incomeId: inc_001,
    // string
    id: receipt_001,
  } satisfies DeleteIncomeReceiptByIdRequest

  try {
    const data = await api.deleteIncomeReceiptById(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name         | Type     | Description | Notes                     |
| ------------ | -------- | ----------- | ------------------------- |
| **compId**   | `string` |             | [Defaults to `undefined`] |
| **jobId**    | `string` |             | [Defaults to `undefined`] |
| **userId**   | `string` |             | [Defaults to `undefined`] |
| **incomeId** | `string` |             | [Defaults to `undefined`] |
| **id**       | `string` |             | [Defaults to `undefined`] |

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
| **204**     | Income receipt deleted successfully | -                |
| **400**     | Bad request                         | -                |
| **403**     | Forbidden                           | -                |
| **404**     | Not found                           | -                |
| **429**     | Too many requests to the API        | -                |
| **500**     | Internal server error               | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getIncomeReceiptById

> IncomeReceipt getIncomeReceiptById(compId, jobId, userId, incomeId, id)

Get income receipt by identifier

### Example

```ts
import { Configuration, IncomeReceiptApi } from 'api-client'
import type { GetIncomeReceiptByIdRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new IncomeReceiptApi(config)

  const body = {
    // string
    compId: comp_btp001,
    // string
    jobId: job_001,
    // string
    userId: usr_123456,
    // string
    incomeId: inc_001,
    // string
    id: receipt_001,
  } satisfies GetIncomeReceiptByIdRequest

  try {
    const data = await api.getIncomeReceiptById(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name         | Type     | Description | Notes                     |
| ------------ | -------- | ----------- | ------------------------- |
| **compId**   | `string` |             | [Defaults to `undefined`] |
| **jobId**    | `string` |             | [Defaults to `undefined`] |
| **userId**   | `string` |             | [Defaults to `undefined`] |
| **incomeId** | `string` |             | [Defaults to `undefined`] |
| **id**       | `string` |             | [Defaults to `undefined`] |

### Return type

[**IncomeReceipt**](IncomeReceipt.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                   | Response headers |
| ----------- | ----------------------------- | ---------------- |
| **200**     | The identified income receipt | -                |
| **400**     | Bad request                   | -                |
| **403**     | Forbidden                     | -                |
| **404**     | Not found                     | -                |
| **429**     | Too many requests to the API  | -                |
| **500**     | Internal server error         | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getIncomeReceipts

> Array&lt;IncomeReceipt&gt; getIncomeReceipts(compId, jobId, userId, incomeId, page, pageSize)

Get all receipts for an income

### Example

```ts
import { Configuration, IncomeReceiptApi } from 'api-client'
import type { GetIncomeReceiptsRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new IncomeReceiptApi(config)

  const body = {
    // string
    compId: comp_btp001,
    // string
    jobId: job_001,
    // string
    userId: usr_123456,
    // string
    incomeId: inc_001,
    // number (optional)
    page: 1,
    // number (optional)
    pageSize: 20,
  } satisfies GetIncomeReceiptsRequest

  try {
    const data = await api.getIncomeReceipts(body)
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
| **incomeId** | `string` |             | [Defaults to `undefined`]            |
| **page**     | `number` |             | [Optional] [Defaults to `undefined`] |
| **pageSize** | `number` |             | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;IncomeReceipt&gt;**](IncomeReceipt.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **200**     | List of income receipts      | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
