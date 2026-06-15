# OtherExpenseTypeApi

All URIs are relative to *https://api-dev.company.com*

| Method                                                                              | HTTP request                                                              | Description                                            |
| ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------ |
| [**crupdateOtherExpenseTypes**](OtherExpenseTypeApi.md#crupdateotherexpensetypes)   | **PUT** /users/{userId}/companies/{companyId}/other_expense_types         | Create new other expense types or update existing ones |
| [**deleteOtherExpenseTypeById**](OtherExpenseTypeApi.md#deleteotherexpensetypebyid) | **DELETE** /users/{userId}/companies/{companyId}/other_expense_types/{id} | Delete an other expense type by identifier             |
| [**getOtherExpenseTypeById**](OtherExpenseTypeApi.md#getotherexpensetypebyid)       | **GET** /users/{userId}/companies/{companyId}/other_expense_types/{id}    | Get an other expense type by identifier                |
| [**getOtherExpenseTypes**](OtherExpenseTypeApi.md#getotherexpensetypes)             | **GET** /users/{userId}/companies/{companyId}/other_expense_types         | Get all other expense types for a company              |

## crupdateOtherExpenseTypes

> Array&lt;OtherExpenseType&gt; crupdateOtherExpenseTypes(userId, companyId, crupdateOtherExpenseType)

Create new other expense types or update existing ones

### Example

```ts
import { Configuration, OtherExpenseTypeApi } from 'api-client'
import type { CrupdateOtherExpenseTypesRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new OtherExpenseTypeApi(config)

  const body = {
    // string
    userId: user_123456,
    // string
    companyId: comp_btp001,
    // Array<CrupdateOtherExpenseType>
    crupdateOtherExpenseType: [
      {
        id: 'other_exp_type_001',
        name: 'Logistique',
        description: 'Frais logistiques et transport',
        company_id: 'comp_btp001',
        comment: 'Type principal',
      },
      {
        name: 'Maintenance',
        description: 'Frais de maintenance et réparation',
        company_id: 'comp_btp001',
        comment: 'Nouveau type',
      },
    ],
  } satisfies CrupdateOtherExpenseTypesRequest

  try {
    const data = await api.crupdateOtherExpenseTypes(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name                         | Type                              | Description | Notes                     |
| ---------------------------- | --------------------------------- | ----------- | ------------------------- |
| **userId**                   | `string`                          |             | [Defaults to `undefined`] |
| **companyId**                | `string`                          |             | [Defaults to `undefined`] |
| **crupdateOtherExpenseType** | `Array<CrupdateOtherExpenseType>` |             |                           |

### Return type

[**Array&lt;OtherExpenseType&gt;**](OtherExpenseType.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                                | Response headers |
| ----------- | ------------------------------------------ | ---------------- |
| **200**     | The created or updated other expense types | -                |
| **400**     | Bad request                                | -                |
| **403**     | Forbidden                                  | -                |
| **404**     | Not found                                  | -                |
| **429**     | Too many requests to the API               | -                |
| **500**     | Internal server error                      | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## deleteOtherExpenseTypeById

> deleteOtherExpenseTypeById(userId, companyId, id)

Delete an other expense type by identifier

### Example

```ts
import { Configuration, OtherExpenseTypeApi } from 'api-client'
import type { DeleteOtherExpenseTypeByIdRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new OtherExpenseTypeApi(config)

  const body = {
    // string
    userId: user_123456,
    // string
    companyId: comp_btp001,
    // string
    id: other_exp_type_001,
  } satisfies DeleteOtherExpenseTypeByIdRequest

  try {
    const data = await api.deleteOtherExpenseTypeById(body)
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

| Status code | Description                      | Response headers |
| ----------- | -------------------------------- | ---------------- |
| **204**     | Income type deleted successfully | -                |
| **400**     | Bad request                      | -                |
| **403**     | Forbidden                        | -                |
| **404**     | Not found                        | -                |
| **429**     | Too many requests to the API     | -                |
| **500**     | Internal server error            | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getOtherExpenseTypeById

> OtherExpenseType getOtherExpenseTypeById(userId, companyId, id)

Get an other expense type by identifier

### Example

```ts
import { Configuration, OtherExpenseTypeApi } from 'api-client'
import type { GetOtherExpenseTypeByIdRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new OtherExpenseTypeApi(config)

  const body = {
    // string
    userId: user_123456,
    // string
    companyId: comp_btp001,
    // string
    id: other_exp_type_001,
  } satisfies GetOtherExpenseTypeByIdRequest

  try {
    const data = await api.getOtherExpenseTypeById(body)
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

[**OtherExpenseType**](OtherExpenseType.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **200**     | Other expense type found     | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getOtherExpenseTypes

> Array&lt;OtherExpenseType&gt; getOtherExpenseTypes(userId, companyId)

Get all other expense types for a company

### Example

```ts
import { Configuration, OtherExpenseTypeApi } from 'api-client'
import type { GetOtherExpenseTypesRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new OtherExpenseTypeApi(config)

  const body = {
    // string
    userId: user_123456,
    // string
    companyId: comp_btp001,
  } satisfies GetOtherExpenseTypesRequest

  try {
    const data = await api.getOtherExpenseTypes(body)
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

[**Array&lt;OtherExpenseType&gt;**](OtherExpenseType.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **200**     | List of other expense types  | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
