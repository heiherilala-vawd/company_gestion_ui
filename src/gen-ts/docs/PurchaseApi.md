# PurchaseApi

All URIs are relative to *https://api-dev.company.com*

| Method                                                      | HTTP request                                                                                      | Description                                  |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| [**crupdatePurchases**](PurchaseApi.md#crupdatepurchases)   | **PUT** /companies/{comp_id}/job/{job_id}/user/{user_id}/expenses/{expenses_id}/purchases         | Create new purchases or update existing ones |
| [**deletePurchaseById**](PurchaseApi.md#deletepurchasebyid) | **DELETE** /companies/{comp_id}/job/{job_id}/user/{user_id}/expenses/{expenses_id}/purchases/{id} | Delete purchase by identifier                |
| [**getPurchaseById**](PurchaseApi.md#getpurchasebyid)       | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/expenses/{expenses_id}/purchases/{id}    | Get purchase by identifier                   |
| [**getPurchases**](PurchaseApi.md#getpurchases)             | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/expenses/{expenses_id}/purchases         | Get all purchases                            |

## crupdatePurchases

> Array&lt;Purchase&gt; crupdatePurchases(compId, jobId, userId, expensesId, crupdatePurchase)

Create new purchases or update existing ones

### Example

```ts
import {
  Configuration,
  PurchaseApi,
} from 'api-client';
import type { CrupdatePurchasesRequest } from 'api-client';

async function example() {
  console.log("🚀 Testing api-client SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new PurchaseApi(config);

  const body = {
    // string
    compId: compId_example,
    // string
    jobId: jobId_example,
    // string
    userId: userId_example,
    // string
    expensesId: expensesId_example,
    // Array<CrupdatePurchase>
    crupdatePurchase: ...,
  } satisfies CrupdatePurchasesRequest;

  try {
    const data = await api.crupdatePurchases(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name                 | Type                      | Description | Notes                     |
| -------------------- | ------------------------- | ----------- | ------------------------- |
| **compId**           | `string`                  |             | [Defaults to `undefined`] |
| **jobId**            | `string`                  |             | [Defaults to `undefined`] |
| **userId**           | `string`                  |             | [Defaults to `undefined`] |
| **expensesId**       | `string`                  |             | [Defaults to `undefined`] |
| **crupdatePurchase** | `Array<CrupdatePurchase>` |             |                           |

### Return type

[**Array&lt;Purchase&gt;**](Purchase.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                      | Response headers |
| ----------- | -------------------------------- | ---------------- |
| **200**     | The created or updated purchases | -                |
| **400**     | Bad request                      | -                |
| **403**     | Forbidden                        | -                |
| **404**     | Not found                        | -                |
| **429**     | Too many requests to the API     | -                |
| **500**     | Internal server error            | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## deletePurchaseById

> deletePurchaseById(compId, jobId, userId, expensesId, id)

Delete purchase by identifier

### Example

```ts
import { Configuration, PurchaseApi } from 'api-client'
import type { DeletePurchaseByIdRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new PurchaseApi(config)

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
  } satisfies DeletePurchaseByIdRequest

  try {
    const data = await api.deletePurchaseById(body)
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
| **204**     | Purchase deleted successfully | -                |
| **400**     | Bad request                   | -                |
| **403**     | Forbidden                     | -                |
| **404**     | Not found                     | -                |
| **429**     | Too many requests to the API  | -                |
| **500**     | Internal server error         | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getPurchaseById

> Purchase getPurchaseById(compId, jobId, userId, expensesId, id)

Get purchase by identifier

### Example

```ts
import { Configuration, PurchaseApi } from 'api-client'
import type { GetPurchaseByIdRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new PurchaseApi(config)

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
  } satisfies GetPurchaseByIdRequest

  try {
    const data = await api.getPurchaseById(body)
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

[**Purchase**](Purchase.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **200**     | The identified purchase      | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getPurchases

> Array&lt;Purchase&gt; getPurchases(compId, jobId, userId, expensesId, page, pageSize, expenseId, supplier, isEquipment)

Get all purchases

### Example

```ts
import { Configuration, PurchaseApi } from 'api-client'
import type { GetPurchasesRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new PurchaseApi(config)

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
    // string | Filter purchases by supplier, case is ignored (optional)
    supplier: supplier_example,
    // boolean (optional)
    isEquipment: true,
  } satisfies GetPurchasesRequest

  try {
    const data = await api.getPurchases(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name            | Type      | Description                                   | Notes                                |
| --------------- | --------- | --------------------------------------------- | ------------------------------------ |
| **compId**      | `string`  |                                               | [Defaults to `undefined`]            |
| **jobId**       | `string`  |                                               | [Defaults to `undefined`]            |
| **userId**      | `string`  |                                               | [Defaults to `undefined`]            |
| **expensesId**  | `string`  |                                               | [Defaults to `undefined`]            |
| **page**        | `number`  |                                               | [Optional] [Defaults to `undefined`] |
| **pageSize**    | `number`  |                                               | [Optional] [Defaults to `undefined`] |
| **expenseId**   | `string`  |                                               | [Optional] [Defaults to `undefined`] |
| **supplier**    | `string`  | Filter purchases by supplier, case is ignored | [Optional] [Defaults to `undefined`] |
| **isEquipment** | `boolean` |                                               | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;Purchase&gt;**](Purchase.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **200**     | List of purchases            | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
