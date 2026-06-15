# EquipmentUsageApi

All URIs are relative to *https://api-dev.company.com*

| Method                                                                        | HTTP request                                                               | Description                                                |
| ----------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ---------------------------------------------------------- |
| [**crupdateEquipmentUsages**](EquipmentUsageApi.md#crupdateequipmentusages)   | **PUT** /users/{userId}/companies/{companyId}/equipment_usages             | Create new equipment usage records or update existing ones |
| [**deleteEquipmentUsageById**](EquipmentUsageApi.md#deleteequipmentusagebyid) | **DELETE** /users/{userId}/companies/{companyId}/equipment_usages/{id}     | Delete an equipment usage record by identifier             |
| [**getEquipmentUsageById**](EquipmentUsageApi.md#getequipmentusagebyid)       | **GET** /users/{userId}/companies/{companyId}/equipment_usages/{id}        | Get an equipment usage record by identifier                |
| [**getEquipmentUsages**](EquipmentUsageApi.md#getequipmentusages)             | **GET** /users/{userId}/companies/{companyId}/equipment_usages             | Get all equipment usage records                            |
| [**returnEquipment**](EquipmentUsageApi.md#returnequipment)                   | **PUT** /users/{userId}/companies/{companyId}/equipment_usages/{id}/return | Return equipment from usage                                |

## crupdateEquipmentUsages

> Array&lt;EquipmentUsage&gt; crupdateEquipmentUsages(userId, companyId, crupdateEquipmentUsage)

Create new equipment usage records or update existing ones

### Example

```ts
import {
  Configuration,
  EquipmentUsageApi,
} from 'api-client';
import type { CrupdateEquipmentUsagesRequest } from 'api-client';

async function example() {
  console.log("🚀 Testing api-client SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new EquipmentUsageApi(config);

  const body = {
    // string
    userId: user_123456,
    // string
    companyId: comp_btp001,
    // Array<CrupdateEquipmentUsage>
    crupdateEquipmentUsage: ...,
  } satisfies CrupdateEquipmentUsagesRequest;

  try {
    const data = await api.crupdateEquipmentUsages(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name                       | Type                            | Description | Notes                     |
| -------------------------- | ------------------------------- | ----------- | ------------------------- |
| **userId**                 | `string`                        |             | [Defaults to `undefined`] |
| **companyId**              | `string`                        |             | [Defaults to `undefined`] |
| **crupdateEquipmentUsage** | `Array<CrupdateEquipmentUsage>` |             |                           |

### Return type

[**Array&lt;EquipmentUsage&gt;**](EquipmentUsage.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                                    | Response headers |
| ----------- | ---------------------------------------------- | ---------------- |
| **200**     | The created or updated equipment usage records | -                |
| **400**     | Bad request                                    | -                |
| **403**     | Forbidden                                      | -                |
| **404**     | Not found                                      | -                |
| **429**     | Too many requests to the API                   | -                |
| **500**     | Internal server error                          | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## deleteEquipmentUsageById

> deleteEquipmentUsageById(userId, companyId, id)

Delete an equipment usage record by identifier

### Example

```ts
import { Configuration, EquipmentUsageApi } from 'api-client'
import type { DeleteEquipmentUsageByIdRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new EquipmentUsageApi(config)

  const body = {
    // string
    userId: user_123456,
    // string
    companyId: comp_btp001,
    // string
    id: eu_001,
  } satisfies DeleteEquipmentUsageByIdRequest

  try {
    const data = await api.deleteEquipmentUsageById(body)
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

| Status code | Description                    | Response headers |
| ----------- | ------------------------------ | ---------------- |
| **204**     | Equipment usage record deleted | -                |
| **400**     | Bad request                    | -                |
| **403**     | Forbidden                      | -                |
| **404**     | Not found                      | -                |
| **429**     | Too many requests to the API   | -                |
| **500**     | Internal server error          | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getEquipmentUsageById

> EquipmentUsage getEquipmentUsageById(userId, companyId, id)

Get an equipment usage record by identifier

### Example

```ts
import { Configuration, EquipmentUsageApi } from 'api-client'
import type { GetEquipmentUsageByIdRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new EquipmentUsageApi(config)

  const body = {
    // string
    userId: user_123456,
    // string
    companyId: comp_btp001,
    // string
    id: eu_001,
  } satisfies GetEquipmentUsageByIdRequest

  try {
    const data = await api.getEquipmentUsageById(body)
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

[**EquipmentUsage**](EquipmentUsage.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **200**     | The equipment usage record   | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getEquipmentUsages

> Array&lt;EquipmentUsage&gt; getEquipmentUsages(userId, companyId, page, pageSize, jobId)

Get all equipment usage records

### Example

```ts
import { Configuration, EquipmentUsageApi } from 'api-client'
import type { GetEquipmentUsagesRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new EquipmentUsageApi(config)

  const body = {
    // string
    userId: user_123456,
    // string
    companyId: comp_btp001,
    // number (optional)
    page: 1,
    // number (optional)
    pageSize: 20,
    // string (optional)
    jobId: job_001,
  } satisfies GetEquipmentUsagesRequest

  try {
    const data = await api.getEquipmentUsages(body)
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
| **userId**    | `string` |             | [Defaults to `undefined`]            |
| **companyId** | `string` |             | [Defaults to `undefined`]            |
| **page**      | `number` |             | [Optional] [Defaults to `undefined`] |
| **pageSize**  | `number` |             | [Optional] [Defaults to `undefined`] |
| **jobId**     | `string` |             | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;EquipmentUsage&gt;**](EquipmentUsage.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                     | Response headers |
| ----------- | ------------------------------- | ---------------- |
| **200**     | List of equipment usage records | -                |
| **400**     | Bad request                     | -                |
| **403**     | Forbidden                       | -                |
| **404**     | Not found                       | -                |
| **429**     | Too many requests to the API    | -                |
| **500**     | Internal server error           | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## returnEquipment

> EquipmentUsage returnEquipment(userId, companyId, id, status)

Return equipment from usage

### Example

```ts
import {
  Configuration,
  EquipmentUsageApi,
} from 'api-client';
import type { ReturnEquipmentRequest } from 'api-client';

async function example() {
  console.log("🚀 Testing api-client SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new EquipmentUsageApi(config);

  const body = {
    // string
    userId: user_123456,
    // string
    companyId: comp_btp001,
    // string
    id: eu_001,
    // UsageStatus
    status: ...,
  } satisfies ReturnEquipmentRequest;

  try {
    const data = await api.returnEquipment(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name          | Type          | Description | Notes                                                            |
| ------------- | ------------- | ----------- | ---------------------------------------------------------------- |
| **userId**    | `string`      |             | [Defaults to `undefined`]                                        |
| **companyId** | `string`      |             | [Defaults to `undefined`]                                        |
| **id**        | `string`      |             | [Defaults to `undefined`]                                        |
| **status**    | `UsageStatus` |             | [Defaults to `undefined`] [Enum: IN_USE, BROKEN, RETURNED, LOST] |

### Return type

[**EquipmentUsage**](EquipmentUsage.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                     | Response headers |
| ----------- | ------------------------------- | ---------------- |
| **200**     | Equipment returned successfully | -                |
| **400**     | Bad request                     | -                |
| **403**     | Forbidden                       | -                |
| **404**     | Not found                       | -                |
| **429**     | Too many requests to the API    | -                |
| **500**     | Internal server error           | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
