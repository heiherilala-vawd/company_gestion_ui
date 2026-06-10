# CompanyApi

All URIs are relative to *https://api-dev.company.com*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**crupdateCompanies**](CompanyApi.md#crupdatecompanies) | **PUT** /companies | Create new companies or update existing companies |
| [**deleteCompanyById**](CompanyApi.md#deletecompanybyid) | **DELETE** /companies/{id} | Delete a company by identifier |
| [**getCompanies**](CompanyApi.md#getcompanies) | **GET** /companies | Get all companies |
| [**getCompanyById**](CompanyApi.md#getcompanybyid) | **GET** /companies/{id} | Get company by identifier |



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
    crupdateCompany: [{"id":"comp_btp001","name":"BTP Construction Martin","rib":"FR76 1234 5678 9012 3456 7890 123","description":"Entreprise de construction spécialisée dans les bâtiments industriels","company_type":"BTP","comment":"Mise à jour des coordonnées bancaires"},{"name":"Hôtel du Lac","rib":"FR76 1111 2222 3333 4444 5555 666","description":"Hôtel 4 étoiles au bord du lac d'Annecy","company_type":"HOTEL","comment":"Nouvel hôtel partenaire"}],
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


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **crupdateCompany** | `Array<CrupdateCompany>` |  | |

### Return type

[**Array&lt;Company&gt;**](Company.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The created or updated companies |  -  |
| **400** | Bad request |  -  |
| **403** | Forbidden |  -  |
| **404** | Not found |  -  |
| **429** | Too many requests to the API |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteCompanyById

> deleteCompanyById(id)

Delete a company by identifier

### Example

```ts
import {
  Configuration,
  CompanyApi,
} from 'api-client';
import type { DeleteCompanyByIdRequest } from 'api-client';

async function example() {
  console.log("🚀 Testing api-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new CompanyApi(config);

  const body = {
    // string
    id: comp_btp001,
  } satisfies DeleteCompanyByIdRequest;

  try {
    const data = await api.deleteCompanyById(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `string` |  | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **204** | Company deleted successfully |  -  |
| **400** | Bad request |  -  |
| **403** | Forbidden |  -  |
| **404** | Not found |  -  |
| **429** | Too many requests to the API |  -  |
| **500** | Internal server error |  -  |

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
    page: 1,
    // number (optional)
    pageSize: 20,
    // string | Filter companies by name, case is ignored (optional)
    name: BTP Construction,
    // string | Filter companies by RIB, case is ignored (optional)
    rib: FR76 1234,
    // string | Filter companies by description, case is ignored (optional)
    description: construction,
    // CompanyType | Filter by company type (optional)
    companyType: BTP,
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


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **page** | `number` |  | [Optional] [Defaults to `undefined`] |
| **pageSize** | `number` |  | [Optional] [Defaults to `undefined`] |
| **name** | `string` | Filter companies by name, case is ignored | [Optional] [Defaults to `undefined`] |
| **rib** | `string` | Filter companies by RIB, case is ignored | [Optional] [Defaults to `undefined`] |
| **description** | `string` | Filter companies by description, case is ignored | [Optional] [Defaults to `undefined`] |
| **companyType** | `CompanyType` | Filter by company type | [Optional] [Defaults to `undefined`] [Enum: BTP, HOTEL] |

### Return type

[**Array&lt;Company&gt;**](Company.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | List of companies |  -  |
| **400** | Bad request |  -  |
| **403** | Forbidden |  -  |
| **404** | Not found |  -  |
| **429** | Too many requests to the API |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getCompanyById

> Company getCompanyById(id)

Get company by identifier

### Example

```ts
import {
  Configuration,
  CompanyApi,
} from 'api-client';
import type { GetCompanyByIdRequest } from 'api-client';

async function example() {
  console.log("🚀 Testing api-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new CompanyApi(config);

  const body = {
    // string
    id: comp_btp001,
  } satisfies GetCompanyByIdRequest;

  try {
    const data = await api.getCompanyById(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `string` |  | [Defaults to `undefined`] |

### Return type

[**Company**](Company.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The identified company |  -  |
| **400** | Bad request |  -  |
| **403** | Forbidden |  -  |
| **404** | Not found |  -  |
| **429** | Too many requests to the API |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

