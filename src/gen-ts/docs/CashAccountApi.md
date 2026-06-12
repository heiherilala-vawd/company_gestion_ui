# CashAccountApi

All URIs are relative to *https://api-dev.company.com*

| Method                                                               | HTTP request                                       | Description                                      |
| -------------------------------------------------------------------- | -------------------------------------------------- | ------------------------------------------------ |
| [**crupdateCashAccounts**](CashAccountApi.md#crupdatecashaccounts)   | **PUT** /companies/{comp_id}/cash_accounts         | Create new cash accounts or update existing ones |
| [**deleteCashAccountById**](CashAccountApi.md#deletecashaccountbyid) | **DELETE** /companies/{comp_id}/cash_accounts/{id} | Delete a cash account by identifier              |
| [**getCashAccountById**](CashAccountApi.md#getcashaccountbyid)       | **GET** /companies/{comp_id}/cash_accounts/{id}    | Get a cash account by identifier                 |
| [**getCashAccounts**](CashAccountApi.md#getcashaccounts)             | **GET** /companies/{comp_id}/cash_accounts         | Get all cash accounts                            |

## crupdateCashAccounts

> Array&lt;CashAccount&gt; crupdateCashAccounts(compId, crupdateCashAccount)

Create new cash accounts or update existing ones

### Example

```ts
import {
  Configuration,
  CashAccountApi,
} from 'api-client';
import type { CrupdateCashAccountsRequest } from 'api-client';

async function example() {
  console.log("🚀 Testing api-client SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new CashAccountApi(config);

  const body = {
    // string
    compId: comp_btp001,
    // Array<CrupdateCashAccount>
    crupdateCashAccount: ...,
  } satisfies CrupdateCashAccountsRequest;

  try {
    const data = await api.crupdateCashAccounts(body);
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
| **crupdateCashAccount** | `Array<CrupdateCashAccount>` |             |                           |

### Return type

[**Array&lt;CashAccount&gt;**](CashAccount.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                          | Response headers |
| ----------- | ------------------------------------ | ---------------- |
| **200**     | The created or updated cash accounts | -                |
| **400**     | Bad request                          | -                |
| **403**     | Forbidden                            | -                |
| **404**     | Not found                            | -                |
| **429**     | Too many requests to the API         | -                |
| **500**     | Internal server error                | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## deleteCashAccountById

> deleteCashAccountById(compId, id)

Delete a cash account by identifier

### Example

```ts
import { Configuration, CashAccountApi } from 'api-client'
import type { DeleteCashAccountByIdRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new CashAccountApi(config)

  const body = {
    // string
    compId: comp_btp001,
    // string
    id: ca_001,
  } satisfies DeleteCashAccountByIdRequest

  try {
    const data = await api.deleteCashAccountById(body)
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
| **204**     | Cash account deleted         | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getCashAccountById

> CashAccount getCashAccountById(compId, id)

Get a cash account by identifier

### Example

```ts
import { Configuration, CashAccountApi } from 'api-client'
import type { GetCashAccountByIdRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new CashAccountApi(config)

  const body = {
    // string
    compId: comp_btp001,
    // string
    id: ca_001,
  } satisfies GetCashAccountByIdRequest

  try {
    const data = await api.getCashAccountById(body)
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
| **id**     | `string` |             | [Defaults to `undefined`] |

### Return type

[**CashAccount**](CashAccount.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **200**     | The cash account             | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getCashAccounts

> Array&lt;CashAccount&gt; getCashAccounts(compId, page, pageSize)

Get all cash accounts

### Example

```ts
import { Configuration, CashAccountApi } from 'api-client'
import type { GetCashAccountsRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new CashAccountApi(config)

  const body = {
    // string
    compId: comp_btp001,
    // number (optional)
    page: 1,
    // number (optional)
    pageSize: 20,
  } satisfies GetCashAccountsRequest

  try {
    const data = await api.getCashAccounts(body)
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
| **page**     | `number` |             | [Optional] [Defaults to `undefined`] |
| **pageSize** | `number` |             | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;CashAccount&gt;**](CashAccount.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **200**     | List of cash accounts        | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
