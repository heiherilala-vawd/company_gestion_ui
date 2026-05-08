# TravelPeopleApi

All URIs are relative to *https://api-dev.company.com*

| Method                                                                  | HTTP request                                                                                                        | Description                                      |
| ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| [**crupdateTravelPeople**](TravelPeopleApi.md#crupdatetravelpeople)     | **PUT** /companies/{comp_id}/job/{job_id}/user/{user_id}/travel_expenses/{travel_expenses_id}/travel_people         | Create new travel people or update existing ones |
| [**deleteTravelPeopleById**](TravelPeopleApi.md#deletetravelpeoplebyid) | **DELETE** /companies/{comp_id}/job/{job_id}/user/{user_id}/travel_expenses/{travel_expenses_id}/travel_people/{id} | Delete travel people by identifier               |
| [**getTravelPeople**](TravelPeopleApi.md#gettravelpeople)               | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/travel_expenses/{travel_expenses_id}/travel_people         | Get all travel people                            |
| [**getTravelPeopleById**](TravelPeopleApi.md#gettravelpeoplebyid)       | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/travel_expenses/{travel_expenses_id}/travel_people/{id}    | Get travel people by identifier                  |

## crupdateTravelPeople

> Array&lt;TravelPeople&gt; crupdateTravelPeople(compId, jobId, userId, travelExpensesId, crupdateTravelPeople)

Create new travel people or update existing ones

### Example

```ts
import { Configuration, TravelPeopleApi } from 'api-client'
import type { CrupdateTravelPeopleRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new TravelPeopleApi(config)

  const body = {
    // string
    compId: comp_btp001,
    // string
    jobId: job_001,
    // string
    userId: usr_123456,
    // string
    travelExpensesId: travel_001,
    // Array<CrupdateTravelPeople>
    crupdateTravelPeople: [
      {
        id: 'tp_001',
        travel_id: 'travel_001',
        user_id: 'usr_123458',
        comment: 'Chauffeur principal',
      },
      { travel_id: 'travel_001', user_id: 'usr_123459', comment: 'Assistant' },
    ],
  } satisfies CrupdateTravelPeopleRequest

  try {
    const data = await api.crupdateTravelPeople(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name                     | Type                          | Description | Notes                     |
| ------------------------ | ----------------------------- | ----------- | ------------------------- |
| **compId**               | `string`                      |             | [Defaults to `undefined`] |
| **jobId**                | `string`                      |             | [Defaults to `undefined`] |
| **userId**               | `string`                      |             | [Defaults to `undefined`] |
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

> deleteTravelPeopleById(compId, jobId, userId, travelExpensesId, id)

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
    compId: comp_btp001,
    // string
    jobId: job_001,
    // string
    userId: usr_123456,
    // string
    travelExpensesId: travel_001,
    // string
    id: tp_001,
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

> Array&lt;TravelPeople&gt; getTravelPeople(compId, jobId, userId, travelExpensesId, page, pageSize, travelId, userId2, arrivalLocation, arrivalDateMin, arrivalDateMax, notArrived)

Get all travel people

### Example

```ts
import {
  Configuration,
  TravelPeopleApi,
} from 'api-client';
import type { GetTravelPeopleRequest } from 'api-client';

async function example() {
  console.log("🚀 Testing api-client SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new TravelPeopleApi(config);

  const body = {
    // string
    compId: comp_btp001,
    // string
    jobId: job_001,
    // string
    userId: usr_123456,
    // string
    travelExpensesId: travel_001,
    // number (optional)
    page: 1,
    // number (optional)
    pageSize: 20,
    // string (optional)
    travelId: travel_001,
    // string | Filter travel people by user id (optional)
    userId2: usr_123458,
    // string | Filter travel people by arrival warehouse id (optional)
    arrivalLocation: wh_001,
    // Date | Filter travel people by minimum arrival date (optional)
    arrivalDateMin: 2024-02-20T00:00:00Z,
    // Date | Filter travel people by maximum arrival date (optional)
    arrivalDateMax: 2024-02-20T23:59:59Z,
    // boolean | Filter travel people that have not arrived yet (no arrival date or location) (optional)
    notArrived: true,
  } satisfies GetTravelPeopleRequest;

  try {
    const data = await api.getTravelPeople(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name                 | Type      | Description                                                                  | Notes                                |
| -------------------- | --------- | ---------------------------------------------------------------------------- | ------------------------------------ |
| **compId**           | `string`  |                                                                              | [Defaults to `undefined`]            |
| **jobId**            | `string`  |                                                                              | [Defaults to `undefined`]            |
| **userId**           | `string`  |                                                                              | [Defaults to `undefined`]            |
| **travelExpensesId** | `string`  |                                                                              | [Defaults to `undefined`]            |
| **page**             | `number`  |                                                                              | [Optional] [Defaults to `undefined`] |
| **pageSize**         | `number`  |                                                                              | [Optional] [Defaults to `undefined`] |
| **travelId**         | `string`  |                                                                              | [Optional] [Defaults to `undefined`] |
| **userId2**          | `string`  | Filter travel people by user id                                              | [Optional] [Defaults to `undefined`] |
| **arrivalLocation**  | `string`  | Filter travel people by arrival warehouse id                                 | [Optional] [Defaults to `undefined`] |
| **arrivalDateMin**   | `Date`    | Filter travel people by minimum arrival date                                 | [Optional] [Defaults to `undefined`] |
| **arrivalDateMax**   | `Date`    | Filter travel people by maximum arrival date                                 | [Optional] [Defaults to `undefined`] |
| **notArrived**       | `boolean` | Filter travel people that have not arrived yet (no arrival date or location) | [Optional] [Defaults to `undefined`] |

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

> TravelPeople getTravelPeopleById(compId, jobId, userId, travelExpensesId, id)

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
    compId: comp_btp001,
    // string
    jobId: job_001,
    // string
    userId: usr_123456,
    // string
    travelExpensesId: travel_001,
    // string
    id: tp_001,
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
