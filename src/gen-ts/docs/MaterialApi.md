# MaterialApi

All URIs are relative to *https://api-dev.company.com*

| Method                                                      | HTTP request               | Description                                       |
| ----------------------------------------------------------- | -------------------------- | ------------------------------------------------- |
| [**crupdateMaterials**](MaterialApi.md#crupdatematerials)   | **PUT** /materials         | Create new materials or update existing materials |
| [**deleteMaterialById**](MaterialApi.md#deletematerialbyid) | **DELETE** /materials/{id} | Delete material by identifier                     |
| [**getMaterialById**](MaterialApi.md#getmaterialbyid)       | **GET** /materials/{id}    | Get material by identifier                        |
| [**getMaterials**](MaterialApi.md#getmaterials)             | **GET** /materials         | Get all materials                                 |

## crupdateMaterials

> Array&lt;Material&gt; crupdateMaterials(crupdateMaterial)

Create new materials or update existing materials

### Example

```ts
import { Configuration, MaterialApi } from 'api-client'
import type { CrupdateMaterialsRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new MaterialApi(config)

  const body = {
    // Array<CrupdateMaterial>
    crupdateMaterial: [
      {
        id: 'mat_001',
        name: 'Ciment Portland',
        description: 'Ciment Portland pour béton haute résistance',
        unit: 'SAC',
        comment: 'Nouvelle référence - résistance accrue',
      },
      {
        name: 'Acier à béton HA12',
        description: "Barres d'acier haute adhérence diamètre 12mm",
        unit: 'BAR',
        comment: 'Longueur 6m - NF A35-016',
      },
    ],
  } satisfies CrupdateMaterialsRequest

  try {
    const data = await api.crupdateMaterials(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name                 | Type                      | Description | Notes |
| -------------------- | ------------------------- | ----------- | ----- |
| **crupdateMaterial** | `Array<CrupdateMaterial>` |             |       |

### Return type

[**Array&lt;Material&gt;**](Material.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                      | Response headers |
| ----------- | -------------------------------- | ---------------- |
| **200**     | The created or updated materials | -                |
| **400**     | Bad request                      | -                |
| **403**     | Forbidden                        | -                |
| **404**     | Not found                        | -                |
| **429**     | Too many requests to the API     | -                |
| **500**     | Internal server error            | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## deleteMaterialById

> deleteMaterialById(id)

Delete material by identifier

### Example

```ts
import { Configuration, MaterialApi } from 'api-client'
import type { DeleteMaterialByIdRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new MaterialApi(config)

  const body = {
    // string
    id: mat_001,
  } satisfies DeleteMaterialByIdRequest

  try {
    const data = await api.deleteMaterialById(body)
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

| Status code | Description                   | Response headers |
| ----------- | ----------------------------- | ---------------- |
| **204**     | Material deleted successfully | -                |
| **400**     | Bad request                   | -                |
| **403**     | Forbidden                     | -                |
| **404**     | Not found                     | -                |
| **429**     | Too many requests to the API  | -                |
| **500**     | Internal server error         | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getMaterialById

> Material getMaterialById(id)

Get material by identifier

### Example

```ts
import { Configuration, MaterialApi } from 'api-client'
import type { GetMaterialByIdRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new MaterialApi(config)

  const body = {
    // string
    id: mat_001,
  } satisfies GetMaterialByIdRequest

  try {
    const data = await api.getMaterialById(body)
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

[**Material**](Material.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **200**     | The identified material      | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getMaterials

> Array&lt;Material&gt; getMaterials(page, pageSize, name, description, unit)

Get all materials

### Example

```ts
import { Configuration, MaterialApi } from 'api-client'
import type { GetMaterialsRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new MaterialApi(config)

  const body = {
    // number (optional)
    page: 1,
    // number (optional)
    pageSize: 20,
    // string | Filter materials by name, case is ignored (optional)
    name: Ciment,
    // string | Filter materials by description, case is ignored (optional)
    description: béton,
    // MaterialUnit (optional)
    unit: SAC,
  } satisfies GetMaterialsRequest

  try {
    const data = await api.getMaterials(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name            | Type           | Description                                      | Notes                                                                                                  |
| --------------- | -------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| **page**        | `number`       |                                                  | [Optional] [Defaults to `undefined`]                                                                   |
| **pageSize**    | `number`       |                                                  | [Optional] [Defaults to `undefined`]                                                                   |
| **name**        | `string`       | Filter materials by name, case is ignored        | [Optional] [Defaults to `undefined`]                                                                   |
| **description** | `string`       | Filter materials by description, case is ignored | [Optional] [Defaults to `undefined`]                                                                   |
| **unit**        | `MaterialUnit` |                                                  | [Optional] [Defaults to `undefined`] [Enum: SAC, L, KG, M2, M3, KIT, POT, PNL, FEU, BAR, T, M, FFT, U] |

### Return type

[**Array&lt;Material&gt;**](Material.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **200**     | List of materials            | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
