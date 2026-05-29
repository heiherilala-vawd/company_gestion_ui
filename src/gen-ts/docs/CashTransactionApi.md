# CashTransactionApi

All URIs are relative to *https://api-dev.company.com*

| Method                                                                           | HTTP request                                                                 | Description                                          |
| -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------- |
| [**crupdateCashTransactions**](CashTransactionApi.md#crupdatecashtransactions)   | **PUT** /companies/{comp_id}/cash_accounts/{account_id}/transactions         | Create new cash transactions or update existing ones |
| [**deleteCashTransactionById**](CashTransactionApi.md#deletecashtransactionbyid) | **DELETE** /companies/{comp_id}/cash_accounts/{account_id}/transactions/{id} | Delete a cash transaction by identifier              |
| [**getCashTransactionById**](CashTransactionApi.md#getcashtransactionbyid)       | **GET** /companies/{comp_id}/cash_accounts/{account_id}/transactions/{id}    | Get a cash transaction by identifier                 |
| [**getCashTransactions**](CashTransactionApi.md#getcashtransactions)             | **GET** /companies/{comp_id}/cash_accounts/{account_id}/transactions         | Get all cash transactions for an account             |

## crupdateCashTransactions

> Array&lt;CashTransaction&gt; crupdateCashTransactions(compId, accountId, crupdateCashTransaction)

Create new cash transactions or update existing ones

### Example

```ts
import {
  Configuration,
  CashTransactionApi,
} from 'api-client';
import type { CrupdateCashTransactionsRequest } from 'api-client';

async function example() {
  console.log("🚀 Testing api-client SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new CashTransactionApi(config);

  const body = {
    // string
    compId: comp_btp001,
    // string
    accountId: ca_001,
    // Array<CrupdateCashTransaction>
    crupdateCashTransaction: ...,
  } satisfies CrupdateCashTransactionsRequest;

  try {
    const data = await api.crupdateCashTransactions(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name                        | Type                             | Description | Notes                     |
| --------------------------- | -------------------------------- | ----------- | ------------------------- |
| **compId**                  | `string`                         |             | [Defaults to `undefined`] |
| **accountId**               | `string`                         |             | [Defaults to `undefined`] |
| **crupdateCashTransaction** | `Array<CrupdateCashTransaction>` |             |                           |

### Return type

[**Array&lt;CashTransaction&gt;**](CashTransaction.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                              | Response headers |
| ----------- | ---------------------------------------- | ---------------- |
| **200**     | The created or updated cash transactions | -                |
| **400**     | Bad request                              | -                |
| **403**     | Forbidden                                | -                |
| **404**     | Not found                                | -                |
| **429**     | Too many requests to the API             | -                |
| **500**     | Internal server error                    | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## deleteCashTransactionById

> deleteCashTransactionById(compId, accountId, id)

Delete a cash transaction by identifier

### Example

```ts
import { Configuration, CashTransactionApi } from 'api-client'
import type { DeleteCashTransactionByIdRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new CashTransactionApi(config)

  const body = {
    // string
    compId: comp_btp001,
    // string
    accountId: ca_001,
    // string
    id: ct_001,
  } satisfies DeleteCashTransactionByIdRequest

  try {
    const data = await api.deleteCashTransactionById(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name          | Type     | Description | Notes                     |
| ------------- | -------- | ----------- | ------------------------- |
| **compId**    | `string` |             | [Defaults to `undefined`] |
| **accountId** | `string` |             | [Defaults to `undefined`] |
| **id**        | `string` |             | [Defaults to `undefined`] |

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
| **204**     | Cash transaction deleted     | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getCashTransactionById

> CashTransaction getCashTransactionById(compId, accountId, id)

Get a cash transaction by identifier

### Example

```ts
import { Configuration, CashTransactionApi } from 'api-client'
import type { GetCashTransactionByIdRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new CashTransactionApi(config)

  const body = {
    // string
    compId: comp_btp001,
    // string
    accountId: ca_001,
    // string
    id: ct_001,
  } satisfies GetCashTransactionByIdRequest

  try {
    const data = await api.getCashTransactionById(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name          | Type     | Description | Notes                     |
| ------------- | -------- | ----------- | ------------------------- |
| **compId**    | `string` |             | [Defaults to `undefined`] |
| **accountId** | `string` |             | [Defaults to `undefined`] |
| **id**        | `string` |             | [Defaults to `undefined`] |

### Return type

[**CashTransaction**](CashTransaction.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **200**     | The cash transaction         | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getCashTransactions

> Array&lt;CashTransaction&gt; getCashTransactions(compId, accountId, page, pageSize)

Get all cash transactions for an account

### Example

```ts
import { Configuration, CashTransactionApi } from 'api-client'
import type { GetCashTransactionsRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new CashTransactionApi(config)

  const body = {
    // string
    compId: comp_btp001,
    // string
    accountId: ca_001,
    // number (optional)
    page: 1,
    // number (optional)
    pageSize: 20,
  } satisfies GetCashTransactionsRequest

  try {
    const data = await api.getCashTransactions(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name          | Type     | Description | Notes                                |
| ------------- | -------- | ----------- | ------------------------------------ |
| **compId**    | `string` |             | [Defaults to `undefined`]            |
| **accountId** | `string` |             | [Defaults to `undefined`]            |
| **page**      | `number` |             | [Optional] [Defaults to `undefined`] |
| **pageSize**  | `number` |             | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;CashTransaction&gt;**](CashTransaction.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **200**     | List of cash transactions    | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
