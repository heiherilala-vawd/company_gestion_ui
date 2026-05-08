# TravelEquipmentApi

All URIs are relative to *https://api-dev.company.com*

| Method                                                                           | HTTP request                                                                                                           | Description                                         |
| -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| [**crupdateTravelEquipment**](TravelEquipmentApi.md#crupdatetravelequipment)     | **PUT** /companies/{comp_id}/job/{job_id}/user/{user_id}/travel_expenses/{travel_expenses_id}/travel_equipment         | Create new travel equipment or update existing ones |
| [**deleteTravelEquipmentById**](TravelEquipmentApi.md#deletetravelequipmentbyid) | **DELETE** /companies/{comp_id}/job/{job_id}/user/{user_id}/travel_expenses/{travel_expenses_id}/travel_equipment/{id} | Delete travel equipment by identifier               |
| [**getTravelEquipment**](TravelEquipmentApi.md#gettravelequipment)               | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/travel_expenses/{travel_expenses_id}/travel_equipment         | Get all travel equipment                            |
| [**getTravelEquipmentById**](TravelEquipmentApi.md#gettravelequipmentbyid)       | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/travel_expenses/{travel_expenses_id}/travel_equipment/{id}    | Get travel equipment by identifier                  |

## crupdateTravelEquipment

> Array&lt;TravelEquipment&gt; crupdateTravelEquipment(compId, jobId, userId, travelExpensesId, crupdateTravelEquipment)

Create new travel equipment or update existing ones

### Example

```ts
import { Configuration, TravelEquipmentApi } from 'api-client'
import type { CrupdateTravelEquipmentRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new TravelEquipmentApi(config)

  const body = {
    // string
    compId: comp_btp001,
    // string
    jobId: job_001,
    // string
    userId: usr_123456,
    // string
    travelExpensesId: travel_001,
    // Array<CrupdateTravelEquipment>
    crupdateTravelEquipment: [
      {
        id: 'te_001',
        travel_id: 'travel_001',
        equipment: 'eq_001',
        quantity: 1,
        status: 'ARRIVED',
        comment: 'Pelleteuse réceptionnée en bon état',
      },
    ],
  } satisfies CrupdateTravelEquipmentRequest

  try {
    const data = await api.crupdateTravelEquipment(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name                        | Type                             | Description | Notes                     |
| --------------------------- | -------------------------------- | ----------- | ------------------------- |
| **compId**                  | `string`                         |             | [Defaults to `undefined`] |
| **jobId**                   | `string`                         |             | [Defaults to `undefined`] |
| **userId**                  | `string`                         |             | [Defaults to `undefined`] |
| **travelExpensesId**        | `string`                         |             | [Defaults to `undefined`] |
| **crupdateTravelEquipment** | `Array<CrupdateTravelEquipment>` |             |                           |

### Return type

[**Array&lt;TravelEquipment&gt;**](TravelEquipment.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                             | Response headers |
| ----------- | --------------------------------------- | ---------------- |
| **200**     | The created or updated travel equipment | -                |
| **400**     | Bad request                             | -                |
| **403**     | Forbidden                               | -                |
| **404**     | Not found                               | -                |
| **429**     | Too many requests to the API            | -                |
| **500**     | Internal server error                   | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## deleteTravelEquipmentById

> deleteTravelEquipmentById(compId, jobId, userId, travelExpensesId, id)

Delete travel equipment by identifier

### Example

```ts
import { Configuration, TravelEquipmentApi } from 'api-client'
import type { DeleteTravelEquipmentByIdRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new TravelEquipmentApi(config)

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
    id: te_001,
  } satisfies DeleteTravelEquipmentByIdRequest

  try {
    const data = await api.deleteTravelEquipmentById(body)
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

| Status code | Description                           | Response headers |
| ----------- | ------------------------------------- | ---------------- |
| **204**     | Travel equipment deleted successfully | -                |
| **400**     | Bad request                           | -                |
| **403**     | Forbidden                             | -                |
| **404**     | Not found                             | -                |
| **429**     | Too many requests to the API          | -                |
| **500**     | Internal server error                 | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getTravelEquipment

> Array&lt;TravelEquipment&gt; getTravelEquipment(compId, jobId, userId, travelExpensesId, page, pageSize, travelId, equipmentId, quantity, status, arrivalLocation, arrivalDateMin, arrivalDateMax, notArrived)

Get all travel equipment

### Example

```ts
import {
  Configuration,
  TravelEquipmentApi,
} from 'api-client';
import type { GetTravelEquipmentRequest } from 'api-client';

async function example() {
  console.log("🚀 Testing api-client SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new TravelEquipmentApi(config);

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
    // string (optional)
    equipmentId: eq_001,
    // number (optional)
    quantity: 1,
    // TransportStatus (optional)
    status: ARRIVED,
    // string | Filter travel equipment by arrival warehouse id (optional)
    arrivalLocation: wh_001,
    // Date | Filter travel equipment by minimum arrival date (optional)
    arrivalDateMin: 2024-02-20T00:00:00Z,
    // Date | Filter travel equipment by maximum arrival date (optional)
    arrivalDateMax: 2024-02-20T23:59:59Z,
    // boolean | Filter travel equipment that have not arrived yet (no arrival date or location) (optional)
    notArrived: true,
  } satisfies GetTravelEquipmentRequest;

  try {
    const data = await api.getTravelEquipment(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name                 | Type              | Description                                                                     | Notes                                                                   |
| -------------------- | ----------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| **compId**           | `string`          |                                                                                 | [Defaults to `undefined`]                                               |
| **jobId**            | `string`          |                                                                                 | [Defaults to `undefined`]                                               |
| **userId**           | `string`          |                                                                                 | [Defaults to `undefined`]                                               |
| **travelExpensesId** | `string`          |                                                                                 | [Defaults to `undefined`]                                               |
| **page**             | `number`          |                                                                                 | [Optional] [Defaults to `undefined`]                                    |
| **pageSize**         | `number`          |                                                                                 | [Optional] [Defaults to `undefined`]                                    |
| **travelId**         | `string`          |                                                                                 | [Optional] [Defaults to `undefined`]                                    |
| **equipmentId**      | `string`          |                                                                                 | [Optional] [Defaults to `undefined`]                                    |
| **quantity**         | `number`          |                                                                                 | [Optional] [Defaults to `undefined`]                                    |
| **status**           | `TransportStatus` |                                                                                 | [Optional] [Defaults to `undefined`] [Enum: IN_PROGRESS, LOST, ARRIVED] |
| **arrivalLocation**  | `string`          | Filter travel equipment by arrival warehouse id                                 | [Optional] [Defaults to `undefined`]                                    |
| **arrivalDateMin**   | `Date`            | Filter travel equipment by minimum arrival date                                 | [Optional] [Defaults to `undefined`]                                    |
| **arrivalDateMax**   | `Date`            | Filter travel equipment by maximum arrival date                                 | [Optional] [Defaults to `undefined`]                                    |
| **notArrived**       | `boolean`         | Filter travel equipment that have not arrived yet (no arrival date or location) | [Optional] [Defaults to `undefined`]                                    |

### Return type

[**Array&lt;TravelEquipment&gt;**](TravelEquipment.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **200**     | List of travel equipment     | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getTravelEquipmentById

> TravelEquipment getTravelEquipmentById(compId, jobId, userId, travelExpensesId, id)

Get travel equipment by identifier

### Example

```ts
import { Configuration, TravelEquipmentApi } from 'api-client'
import type { GetTravelEquipmentByIdRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new TravelEquipmentApi(config)

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
    id: te_001,
  } satisfies GetTravelEquipmentByIdRequest

  try {
    const data = await api.getTravelEquipmentById(body)
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

[**TravelEquipment**](TravelEquipment.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                     | Response headers |
| ----------- | ------------------------------- | ---------------- |
| **200**     | The identified travel equipment | -                |
| **400**     | Bad request                     | -                |
| **403**     | Forbidden                       | -                |
| **404**     | Not found                       | -                |
| **429**     | Too many requests to the API    | -                |
| **500**     | Internal server error           | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
