# TravelPeopleApi

All URIs are relative to *https://api-dev.company.com*

| Method                                                                  | HTTP request                                                                                                                               | Description                                      |
| ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------ |
| [**crupdateTravelPeople**](TravelPeopleApi.md#crupdatetravelpeople)     | **PUT** /companies/{comp_id}/job/{job_id}/user/{user_id}/expenses/{expenses_id}/travel_expenses/{travel_expenses_id}/travel_people         | Create new travel people or update existing ones |
| [**deleteTravelPeopleById**](TravelPeopleApi.md#deletetravelpeoplebyid) | **DELETE** /companies/{comp_id}/job/{job_id}/user/{user_id}/expenses/{expenses_id}/travel_expenses/{travel_expenses_id}/travel_people/{id} | Delete travel people by identifier               |
| [**getTravelPeople**](TravelPeopleApi.md#gettravelpeople)               | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/expenses/{expenses_id}/travel_expenses/{travel_expenses_id}/travel_people         | Get all travel people                            |
| [**getTravelPeopleById**](TravelPeopleApi.md#gettravelpeoplebyid)       | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/expenses/{expenses_id}/travel_expenses/{travel_expenses_id}/travel_people/{id}    | Get travel people by identifier                  |

## crupdateTravelPeople

> Array&lt;TravelPeople&gt; crupdateTravelPeople(compId, jobId, userId, expensesId, travelExpensesId, crupdateTravelPeople)

Create new travel people or update existing ones

### Example

```ts
import {
  Configuration,
  TravelPeopleApi,
} from 'api-client';
import type { CrupdateTravelPeopleRequest } from 'api-client';

async function example() {
  console.log("🚀 Testing api-client SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new TravelPeopleApi(config);

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
    travelExpensesId: travelExpensesId_example,
    // Array<CrupdateTravelPeople>
    crupdateTravelPeople: ...,
  } satisfies CrupdateTravelPeopleRequest;

  try {
    const data = await api.crupdateTravelPeople(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name                     | Type                          | Description | Notes                     |
| ------------------------ | ----------------------------- | ----------- | ------------------------- |
| **compId**               | `string`                      |             | [Defaults to `undefined`] |
| **jobId**                | `string`                      |             | [Defaults to `undefined`] |
| **userId**               | `string`                      |             | [Defaults to `undefined`] |
| **expensesId**           | `string`                      |             | [Defaults to `undefined`] |
| **travelExpensesId**     | `string`                      |             | [Defaults to `undefined`] |
| **crupdateTravelPeople** | `Array<CrupdateTravelPeople>` |             |                           |

### Return type

[**Array&lt;TravelPeople&gt;**](TravelPeople.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                          | Response headers |
| ----------- | ------------------------------------ | ---------------- |
| **200**     | The created or updated travel people | -                |
| **400**     | Bad request                          | -                |
| **403**     | Forbidden                            | -                |
| **404**     | Not found                            | -                |
| **429**     | Too many requests to the API         | -                |
| **500**     | Internal server error                | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## deleteTravelPeopleById

> deleteTravelPeopleById(compId, jobId, userId, expensesId, travelExpensesId, id)

Delete travel people by identifier

### Example

```ts
import { Configuration, TravelPeopleApi } from 'api-client'
import type { DeleteTravelPeopleByIdRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new TravelPeopleApi(config)

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
    travelExpensesId: travelExpensesId_example,
    // string
    id: id_example,
  } satisfies DeleteTravelPeopleByIdRequest

  try {
    const data = await api.deleteTravelPeopleById(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name                 | Type     | Description | Notes                     |
| -------------------- | -------- | ----------- | ------------------------- |
| **compId**           | `string` |             | [Defaults to `undefined`] |
| **jobId**            | `string` |             | [Defaults to `undefined`] |
| **userId**           | `string` |             | [Defaults to `undefined`] |
| **expensesId**       | `string` |             | [Defaults to `undefined`] |
| **travelExpensesId** | `string` |             | [Defaults to `undefined`] |
| **id**               | `string` |             | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                        | Response headers |
| ----------- | ---------------------------------- | ---------------- |
| **204**     | Travel people deleted successfully | -                |
| **400**     | Bad request                        | -                |
| **403**     | Forbidden                          | -                |
| **404**     | Not found                          | -                |
| **429**     | Too many requests to the API       | -                |
| **500**     | Internal server error              | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getTravelPeople

> Array&lt;TravelPeople&gt; getTravelPeople(compId, jobId, userId, expensesId, travelExpensesId, page, pageSize, travelId, userId2)

Get all travel people

### Example

```ts
import { Configuration, TravelPeopleApi } from 'api-client'
import type { GetTravelPeopleRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new TravelPeopleApi(config)

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
    travelExpensesId: travelExpensesId_example,
    // number (optional)
    page: 56,
    // number (optional)
    pageSize: 56,
    // string (optional)
    travelId: travelId_example,
    // string | Filter travel people by user id (optional)
    userId2: userId_example,
  } satisfies GetTravelPeopleRequest

  try {
    const data = await api.getTravelPeople(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name                 | Type     | Description                     | Notes                                |
| -------------------- | -------- | ------------------------------- | ------------------------------------ |
| **compId**           | `string` |                                 | [Defaults to `undefined`]            |
| **jobId**            | `string` |                                 | [Defaults to `undefined`]            |
| **userId**           | `string` |                                 | [Defaults to `undefined`]            |
| **expensesId**       | `string` |                                 | [Defaults to `undefined`]            |
| **travelExpensesId** | `string` |                                 | [Defaults to `undefined`]            |
| **page**             | `number` |                                 | [Optional] [Defaults to `undefined`] |
| **pageSize**         | `number` |                                 | [Optional] [Defaults to `undefined`] |
| **travelId**         | `string` |                                 | [Optional] [Defaults to `undefined`] |
| **userId2**          | `string` | Filter travel people by user id | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;TravelPeople&gt;**](TravelPeople.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **200**     | List of travel people        | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getTravelPeopleById

> TravelPeople getTravelPeopleById(compId, jobId, userId, expensesId, travelExpensesId, id)

Get travel people by identifier

### Example

```ts
import { Configuration, TravelPeopleApi } from 'api-client'
import type { GetTravelPeopleByIdRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new TravelPeopleApi(config)

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
    travelExpensesId: travelExpensesId_example,
    // string
    id: id_example,
  } satisfies GetTravelPeopleByIdRequest

  try {
    const data = await api.getTravelPeopleById(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name                 | Type     | Description | Notes                     |
| -------------------- | -------- | ----------- | ------------------------- |
| **compId**           | `string` |             | [Defaults to `undefined`] |
| **jobId**            | `string` |             | [Defaults to `undefined`] |
| **userId**           | `string` |             | [Defaults to `undefined`] |
| **expensesId**       | `string` |             | [Defaults to `undefined`] |
| **travelExpensesId** | `string` |             | [Defaults to `undefined`] |
| **id**               | `string` |             | [Defaults to `undefined`] |

### Return type

[**TravelPeople**](TravelPeople.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **200**     | The identified travel people | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
