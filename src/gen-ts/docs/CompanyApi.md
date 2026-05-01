# CompanyApi

All URIs are relative to *https://api-dev.company.com*

| Method                                                   | HTTP request               | Description                                       |
| -------------------------------------------------------- | -------------------------- | ------------------------------------------------- |
| [**crupdateCompanies**](CompanyApi.md#crupdatecompanies) | **PUT** /companies         | Create new companies or update existing companies |
| [**deleteCompanyById**](CompanyApi.md#deletecompanybyid) | **DELETE** /companies/{id} | Delete a company by identifier                    |
| [**getCompanies**](CompanyApi.md#getcompanies)           | **GET** /companies         | Get all companies                                 |
| [**getCompanyById**](CompanyApi.md#getcompanybyid)       | **GET** /companies/{id}    | Get company by identifier                         |

## crupdateCompanies

> Array&lt;Company&gt; crupdateCompanies(crupdateCompany)

Create new companies or update existing companies

### Example

```ts
import {
  Configuration,
  CompanyApi,
} from 'api-client';
import type { CrupdateCompaniesRequest } from 'api-client';

async function example() {
  console.log("🚀 Testing api-client SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new CompanyApi(config);

  const body = {
    // Array<CrupdateCompany>
    crupdateCompany: ...,
  } satisfies CrupdateCompaniesRequest;

  try {
    const data = await api.crupdateCompanies(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name                | Type                     | Description | Notes |
| ------------------- | ------------------------ | ----------- | ----- |
| **crupdateCompany** | `Array<CrupdateCompany>` |             |       |

### Return type

[**Array&lt;Company&gt;**](Company.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                      | Response headers |
| ----------- | -------------------------------- | ---------------- |
| **200**     | The created or updated companies | -                |
| **400**     | Bad request                      | -                |
| **403**     | Forbidden                        | -                |
| **404**     | Not found                        | -                |
| **429**     | Too many requests to the API     | -                |
| **500**     | Internal server error            | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## deleteCompanyById

> deleteCompanyById(id)

Delete a company by identifier

### Example

```ts
import { Configuration, CompanyApi } from 'api-client'
import type { DeleteCompanyByIdRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new CompanyApi(config)

  const body = {
    // string
    id: id_example,
  } satisfies DeleteCompanyByIdRequest

  try {
    const data = await api.deleteCompanyById(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name   | Type     | Description | Notes                     |
| ------ | -------- | ----------- | ------------------------- |
| **id** | `string` |             | [Defaults to `undefined`] |

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
| **204**     | Company deleted successfully | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getCompanies

> Array&lt;Company&gt; getCompanies(page, pageSize, name, rib, description, companyType)

Get all companies

### Example

```ts
import {
  Configuration,
  CompanyApi,
} from 'api-client';
import type { GetCompaniesRequest } from 'api-client';

async function example() {
  console.log("🚀 Testing api-client SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new CompanyApi(config);

  const body = {
    // number (optional)
    page: 56,
    // number (optional)
    pageSize: 56,
    // string | Filter companies by name, case is ignored (optional)
    name: name_example,
    // string | Filter companies by RIB, case is ignored (optional)
    rib: rib_example,
    // string | Filter companies by description, case is ignored (optional)
    description: description_example,
    // CompanyType | Filter by company type (optional)
    companyType: ...,
  } satisfies GetCompaniesRequest;

  try {
    const data = await api.getCompanies(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name            | Type          | Description                                      | Notes                                                   |
| --------------- | ------------- | ------------------------------------------------ | ------------------------------------------------------- |
| **page**        | `number`      |                                                  | [Optional] [Defaults to `undefined`]                    |
| **pageSize**    | `number`      |                                                  | [Optional] [Defaults to `undefined`]                    |
| **name**        | `string`      | Filter companies by name, case is ignored        | [Optional] [Defaults to `undefined`]                    |
| **rib**         | `string`      | Filter companies by RIB, case is ignored         | [Optional] [Defaults to `undefined`]                    |
| **description** | `string`      | Filter companies by description, case is ignored | [Optional] [Defaults to `undefined`]                    |
| **companyType** | `CompanyType` | Filter by company type                           | [Optional] [Defaults to `undefined`] [Enum: BTP, HOTEL] |

### Return type

[**Array&lt;Company&gt;**](Company.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **200**     | List of companies            | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getCompanyById

> Company getCompanyById(id)

Get company by identifier

### Example

```ts
import { Configuration, CompanyApi } from 'api-client'
import type { GetCompanyByIdRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new CompanyApi(config)

  const body = {
    // string
    id: id_example,
  } satisfies GetCompanyByIdRequest

  try {
    const data = await api.getCompanyById(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name   | Type     | Description | Notes                     |
| ------ | -------- | ----------- | ------------------------- |
| **id** | `string` |             | [Defaults to `undefined`] |

### Return type

[**Company**](Company.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **200**     | The identified company       | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
