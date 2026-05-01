# BankFeeApi

All URIs are relative to *https://api-dev.company.com*

| Method                                                   | HTTP request                                                                                      | Description                                  |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| [**crupdateBankFees**](BankFeeApi.md#crupdatebankfees)   | **PUT** /companies/{comp_id}/job/{job_id}/user/{user_id}/expenses/{expenses_id}/bank_fees         | Create new bank fees or update existing ones |
| [**deleteBankFeeById**](BankFeeApi.md#deletebankfeebyid) | **DELETE** /companies/{comp_id}/job/{job_id}/user/{user_id}/expenses/{expenses_id}/bank_fees/{id} | Delete bank fee by identifier                |
| [**getBankFeeById**](BankFeeApi.md#getbankfeebyid)       | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/expenses/{expenses_id}/bank_fees/{id}    | Get bank fee by identifier                   |
| [**getBankFees**](BankFeeApi.md#getbankfees)             | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/expenses/{expenses_id}/bank_fees         | Get all bank fees                            |

## crupdateBankFees

> Array&lt;BankFee&gt; crupdateBankFees(compId, jobId, userId, expensesId, crupdateBankFee)

Create new bank fees or update existing ones

### Example

```ts
import {
  Configuration,
  BankFeeApi,
} from 'api-client';
import type { CrupdateBankFeesRequest } from 'api-client';

async function example() {
  console.log("🚀 Testing api-client SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new BankFeeApi(config);

  const body = {
    // string
    compId: compId_example,
    // string
    jobId: jobId_example,
    // string
    userId: userId_example,
    // string
    expensesId: expensesId_example,
    // Array<CrupdateBankFee>
    crupdateBankFee: ...,
  } satisfies CrupdateBankFeesRequest;

  try {
    const data = await api.crupdateBankFees(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name                | Type                     | Description | Notes                     |
| ------------------- | ------------------------ | ----------- | ------------------------- |
| **compId**          | `string`                 |             | [Defaults to `undefined`] |
| **jobId**           | `string`                 |             | [Defaults to `undefined`] |
| **userId**          | `string`                 |             | [Defaults to `undefined`] |
| **expensesId**      | `string`                 |             | [Defaults to `undefined`] |
| **crupdateBankFee** | `Array<CrupdateBankFee>` |             |                           |

### Return type

[**Array&lt;BankFee&gt;**](BankFee.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                      | Response headers |
| ----------- | -------------------------------- | ---------------- |
| **200**     | The created or updated bank fees | -                |
| **400**     | Bad request                      | -                |
| **403**     | Forbidden                        | -                |
| **404**     | Not found                        | -                |
| **429**     | Too many requests to the API     | -                |
| **500**     | Internal server error            | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## deleteBankFeeById

> deleteBankFeeById(compId, jobId, userId, expensesId, id)

Delete bank fee by identifier

### Example

```ts
import { Configuration, BankFeeApi } from 'api-client'
import type { DeleteBankFeeByIdRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new BankFeeApi(config)

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
  } satisfies DeleteBankFeeByIdRequest

  try {
    const data = await api.deleteBankFeeById(body)
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

| Status code | Description                   | Response headers |
| ----------- | ----------------------------- | ---------------- |
| **204**     | Bank fee deleted successfully | -                |
| **400**     | Bad request                   | -                |
| **403**     | Forbidden                     | -                |
| **404**     | Not found                     | -                |
| **429**     | Too many requests to the API  | -                |
| **500**     | Internal server error         | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getBankFeeById

> BankFee getBankFeeById(compId, jobId, userId, expensesId, id)

Get bank fee by identifier

### Example

```ts
import { Configuration, BankFeeApi } from 'api-client'
import type { GetBankFeeByIdRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new BankFeeApi(config)

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
  } satisfies GetBankFeeByIdRequest

  try {
    const data = await api.getBankFeeById(body)
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

[**BankFee**](BankFee.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **200**     | The identified bank fee      | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getBankFees

> Array&lt;BankFee&gt; getBankFees(compId, jobId, userId, expensesId, page, pageSize, expenseId, bankName, description)

Get all bank fees

### Example

```ts
import { Configuration, BankFeeApi } from 'api-client'
import type { GetBankFeesRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new BankFeeApi(config)

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
    // string | Filter bank fees by bank name, case is ignored (optional)
    bankName: bankName_example,
    // string | Filter bank fees by description, case is ignored (optional)
    description: description_example,
  } satisfies GetBankFeesRequest

  try {
    const data = await api.getBankFees(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name            | Type     | Description                                      | Notes                                |
| --------------- | -------- | ------------------------------------------------ | ------------------------------------ |
| **compId**      | `string` |                                                  | [Defaults to `undefined`]            |
| **jobId**       | `string` |                                                  | [Defaults to `undefined`]            |
| **userId**      | `string` |                                                  | [Defaults to `undefined`]            |
| **expensesId**  | `string` |                                                  | [Defaults to `undefined`]            |
| **page**        | `number` |                                                  | [Optional] [Defaults to `undefined`] |
| **pageSize**    | `number` |                                                  | [Optional] [Defaults to `undefined`] |
| **expenseId**   | `string` |                                                  | [Optional] [Defaults to `undefined`] |
| **bankName**    | `string` | Filter bank fees by bank name, case is ignored   | [Optional] [Defaults to `undefined`] |
| **description** | `string` | Filter bank fees by description, case is ignored | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;BankFee&gt;**](BankFee.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **200**     | List of bank fees            | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
