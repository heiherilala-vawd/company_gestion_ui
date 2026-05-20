# CompanyFixedCostApi

All URIs are relative to *https://api-dev.company.com*

| Method                                                                              | HTTP request                                     | Description                                    |
| ----------------------------------------------------------------------------------- | ------------------------------------------------ | ---------------------------------------------- |
| [**crupdateCompanyFixedCosts**](CompanyFixedCostApi.md#crupdatecompanyfixedcosts)   | **PUT** /companies/{comp_id}/fixed-costs         | Create new fixed costs or update existing ones |
| [**deleteCompanyFixedCostById**](CompanyFixedCostApi.md#deletecompanyfixedcostbyid) | **DELETE** /companies/{comp_id}/fixed-costs/{id} | Delete a fixed cost by identifier              |
| [**getCompanyFixedCostById**](CompanyFixedCostApi.md#getcompanyfixedcostbyid)       | **GET** /companies/{comp_id}/fixed-costs/{id}    | Get a fixed cost by identifier                 |
| [**getCompanyFixedCosts**](CompanyFixedCostApi.md#getcompanyfixedcosts)             | **GET** /companies/{comp_id}/fixed-costs         | Get all fixed costs for a company              |

## crupdateCompanyFixedCosts

> Array&lt;CompanyFixedCost&gt; crupdateCompanyFixedCosts(compId, crupdateCompanyFixedCost)

Create new fixed costs or update existing ones

### Example

```ts
import { Configuration, CompanyFixedCostApi } from 'api-client'
import type { CrupdateCompanyFixedCostsRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new CompanyFixedCostApi(config)

  const body = {
    // string
    compId: comp_btp001,
    // Array<CrupdateCompanyFixedCost>
    crupdateCompanyFixedCost: [
      {
        id: 'fixed_cost_001',
        name: 'Loyer bureau',
        amount: 2000.0,
        description: 'Loyer mensuel des locaux',
        company_id: 'comp_btp001',
        start_date: '2024-01-01',
        end_date: null,
        comment: 'Charge fixe mensuelle',
      },
      {
        name: 'Abonnement internet',
        amount: 150.0,
        description: 'Fibre optique',
        company_id: 'comp_btp001',
        start_date: '2024-06-01',
        end_date: null,
        comment: 'Nouvel abonnement',
      },
    ],
  } satisfies CrupdateCompanyFixedCostsRequest

  try {
    const data = await api.crupdateCompanyFixedCosts(body)
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
| **compId**                   | `string`                          |             | [Defaults to `undefined`] |
| **crupdateCompanyFixedCost** | `Array<CrupdateCompanyFixedCost>` |             |                           |

### Return type

[**Array&lt;CompanyFixedCost&gt;**](CompanyFixedCost.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                        | Response headers |
| ----------- | ---------------------------------- | ---------------- |
| **200**     | The created or updated fixed costs | -                |
| **400**     | Bad request                        | -                |
| **403**     | Forbidden                          | -                |
| **404**     | Not found                          | -                |
| **429**     | Too many requests to the API       | -                |
| **500**     | Internal server error              | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## deleteCompanyFixedCostById

> deleteCompanyFixedCostById(compId, id)

Delete a fixed cost by identifier

### Example

```ts
import { Configuration, CompanyFixedCostApi } from 'api-client'
import type { DeleteCompanyFixedCostByIdRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new CompanyFixedCostApi(config)

  const body = {
    // string
    compId: comp_btp001,
    // string
    id: fixed_cost_001,
  } satisfies DeleteCompanyFixedCostByIdRequest

  try {
    const data = await api.deleteCompanyFixedCostById(body)
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

| Status code | Description                             | Response headers |
| ----------- | --------------------------------------- | ---------------- |
| **204**     | Company fixed cost deleted successfully | -                |
| **400**     | Bad request                             | -                |
| **403**     | Forbidden                               | -                |
| **404**     | Not found                               | -                |
| **429**     | Too many requests to the API            | -                |
| **500**     | Internal server error                   | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getCompanyFixedCostById

> CompanyFixedCost getCompanyFixedCostById(compId, id)

Get a fixed cost by identifier

### Example

```ts
import { Configuration, CompanyFixedCostApi } from 'api-client'
import type { GetCompanyFixedCostByIdRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new CompanyFixedCostApi(config)

  const body = {
    // string
    compId: comp_btp001,
    // string
    id: fixed_cost_001,
  } satisfies GetCompanyFixedCostByIdRequest

  try {
    const data = await api.getCompanyFixedCostById(body)
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

[**CompanyFixedCost**](CompanyFixedCost.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **200**     | Company fixed cost found     | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getCompanyFixedCosts

> Array&lt;CompanyFixedCost&gt; getCompanyFixedCosts(compId)

Get all fixed costs for a company

### Example

```ts
import { Configuration, CompanyFixedCostApi } from 'api-client'
import type { GetCompanyFixedCostsRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new CompanyFixedCostApi(config)

  const body = {
    // string
    compId: comp_btp001,
  } satisfies GetCompanyFixedCostsRequest

  try {
    const data = await api.getCompanyFixedCosts(body)
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

### Return type

[**Array&lt;CompanyFixedCost&gt;**](CompanyFixedCost.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **200**     | List of company fixed costs  | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
