# SupplierApi

All URIs are relative to *https://api-dev.company.com*

| Method                                                      | HTTP request                                                    | Description                           |
| ----------------------------------------------------------- | --------------------------------------------------------------- | ------------------------------------- |
| [**crupdateSuppliers**](SupplierApi.md#crupdatesuppliers)   | **PUT** /users/{userId}/companies/{companyId}/suppliers         | Create or update suppliers (crupdate) |
| [**deleteSupplierById**](SupplierApi.md#deletesupplierbyid) | **DELETE** /users/{userId}/companies/{companyId}/suppliers/{id} | Delete a supplier                     |
| [**getSupplierById**](SupplierApi.md#getsupplierbyid)       | **GET** /users/{userId}/companies/{companyId}/suppliers/{id}    | Get supplier by ID                    |
| [**getSuppliers**](SupplierApi.md#getsuppliers)             | **GET** /users/{userId}/companies/{companyId}/suppliers         | Get all suppliers for a company       |

## crupdateSuppliers

> Array&lt;Supplier&gt; crupdateSuppliers(userId, companyId, crupdateSupplier)

Create or update suppliers (crupdate)

### Example

```ts
import {
  Configuration,
  SupplierApi,
} from 'api-client';
import type { CrupdateSuppliersRequest } from 'api-client';

async function example() {
  console.log("🚀 Testing api-client SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SupplierApi(config);

  const body = {
    // string
    userId: user_123456,
    // string
    companyId: comp_btp001,
    // Array<CrupdateSupplier>
    crupdateSupplier: ...,
  } satisfies CrupdateSuppliersRequest;

  try {
    const data = await api.crupdateSuppliers(body);
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
| **userId**           | `string`                  |             | [Defaults to `undefined`] |
| **companyId**        | `string`                  |             | [Defaults to `undefined`] |
| **crupdateSupplier** | `Array<CrupdateSupplier>` |             |                           |

### Return type

[**Array&lt;Supplier&gt;**](Supplier.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **200**     | Suppliers created/updated    | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## deleteSupplierById

> deleteSupplierById(userId, companyId, id)

Delete a supplier

### Example

```ts
import { Configuration, SupplierApi } from 'api-client'
import type { DeleteSupplierByIdRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new SupplierApi(config)

  const body = {
    // string
    userId: user_123456,
    // string
    companyId: comp_btp001,
    // string
    id: supplier_001,
  } satisfies DeleteSupplierByIdRequest

  try {
    const data = await api.deleteSupplierById(body)
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
| **userId**    | `string` |             | [Defaults to `undefined`] |
| **companyId** | `string` |             | [Defaults to `undefined`] |
| **id**        | `string` |             | [Defaults to `undefined`] |

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
| **204**     | Supplier deleted successfully | -                |
| **400**     | Bad request                   | -                |
| **403**     | Forbidden                     | -                |
| **404**     | Not found                     | -                |
| **429**     | Too many requests to the API  | -                |
| **500**     | Internal server error         | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getSupplierById

> Supplier getSupplierById(userId, companyId, id)

Get supplier by ID

### Example

```ts
import { Configuration, SupplierApi } from 'api-client'
import type { GetSupplierByIdRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new SupplierApi(config)

  const body = {
    // string
    userId: user_123456,
    // string
    companyId: comp_btp001,
    // string
    id: supplier_001,
  } satisfies GetSupplierByIdRequest

  try {
    const data = await api.getSupplierById(body)
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
| **userId**    | `string` |             | [Defaults to `undefined`] |
| **companyId** | `string` |             | [Defaults to `undefined`] |
| **id**        | `string` |             | [Defaults to `undefined`] |

### Return type

[**Supplier**](Supplier.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **200**     | Supplier found               | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getSuppliers

> Array&lt;Supplier&gt; getSuppliers(userId, companyId)

Get all suppliers for a company

### Example

```ts
import { Configuration, SupplierApi } from 'api-client'
import type { GetSuppliersRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new SupplierApi(config)

  const body = {
    // string
    userId: user_123456,
    // string
    companyId: comp_btp001,
  } satisfies GetSuppliersRequest

  try {
    const data = await api.getSuppliers(body)
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
| **userId**    | `string` |             | [Defaults to `undefined`] |
| **companyId** | `string` |             | [Defaults to `undefined`] |

### Return type

[**Array&lt;Supplier&gt;**](Supplier.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **200**     | List of suppliers            | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
