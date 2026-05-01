# TravelEquipmentApi

All URIs are relative to *https://api-dev.company.com*

| Method                                                                           | HTTP request                                                                                                                                  | Description                                         |
| -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| [**crupdateTravelEquipment**](TravelEquipmentApi.md#crupdatetravelequipment)     | **PUT** /companies/{comp_id}/job/{job_id}/user/{user_id}/expenses/{expenses_id}/travel_expenses/{travel_expenses_id}/travel_equipment         | Create new travel equipment or update existing ones |
| [**deleteTravelEquipmentById**](TravelEquipmentApi.md#deletetravelequipmentbyid) | **DELETE** /companies/{comp_id}/job/{job_id}/user/{user_id}/expenses/{expenses_id}/travel_expenses/{travel_expenses_id}/travel_equipment/{id} | Delete travel equipment by identifier               |
| [**getTravelEquipment**](TravelEquipmentApi.md#gettravelequipment)               | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/expenses/{expenses_id}/travel_expenses/{travel_expenses_id}/travel_equipment         | Get all travel equipment                            |
| [**getTravelEquipmentById**](TravelEquipmentApi.md#gettravelequipmentbyid)       | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/expenses/{expenses_id}/travel_expenses/{travel_expenses_id}/travel_equipment/{id}    | Get travel equipment by identifier                  |

## crupdateTravelEquipment

> Array&lt;TravelEquipment&gt; crupdateTravelEquipment(compId, jobId, userId, expensesId, travelExpensesId, crupdateTravelEquipment)

Create new travel equipment or update existing ones

### Example

```ts
import {
  Configuration,
  TravelEquipmentApi,
} from 'api-client';
import type { CrupdateTravelEquipmentRequest } from 'api-client';

async function example() {
  console.log("🚀 Testing api-client SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new TravelEquipmentApi(config);

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
    // Array<CrupdateTravelEquipment>
    crupdateTravelEquipment: ...,
  } satisfies CrupdateTravelEquipmentRequest;

  try {
    const data = await api.crupdateTravelEquipment(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name                        | Type                             | Description | Notes                     |
| --------------------------- | -------------------------------- | ----------- | ------------------------- |
| **compId**                  | `string`                         |             | [Defaults to `undefined`] |
| **jobId**                   | `string`                         |             | [Defaults to `undefined`] |
| **userId**                  | `string`                         |             | [Defaults to `undefined`] |
| **expensesId**              | `string`                         |             | [Defaults to `undefined`] |
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

> deleteTravelEquipmentById(compId, jobId, userId, expensesId, travelExpensesId, id)

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

> Array&lt;TravelEquipment&gt; getTravelEquipment(compId, jobId, userId, expensesId, travelExpensesId, page, pageSize, travelId, equipmentId, quantity, status)

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
    // string (optional)
    equipmentId: equipmentId_example,
    // number (optional)
    quantity: 56,
    // TransportStatus (optional)
    status: ...,
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

| Name                 | Type              | Description | Notes                                                                   |
| -------------------- | ----------------- | ----------- | ----------------------------------------------------------------------- |
| **compId**           | `string`          |             | [Defaults to `undefined`]                                               |
| **jobId**            | `string`          |             | [Defaults to `undefined`]                                               |
| **userId**           | `string`          |             | [Defaults to `undefined`]                                               |
| **expensesId**       | `string`          |             | [Defaults to `undefined`]                                               |
| **travelExpensesId** | `string`          |             | [Defaults to `undefined`]                                               |
| **page**             | `number`          |             | [Optional] [Defaults to `undefined`]                                    |
| **pageSize**         | `number`          |             | [Optional] [Defaults to `undefined`]                                    |
| **travelId**         | `string`          |             | [Optional] [Defaults to `undefined`]                                    |
| **equipmentId**      | `string`          |             | [Optional] [Defaults to `undefined`]                                    |
| **quantity**         | `number`          |             | [Optional] [Defaults to `undefined`]                                    |
| **status**           | `TransportStatus` |             | [Optional] [Defaults to `undefined`] [Enum: IN_PROGRESS, LOST, ARRIVED] |

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

> TravelEquipment getTravelEquipmentById(compId, jobId, userId, expensesId, travelExpensesId, id)

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
| **expensesId**       | `string` |             | [Defaults to `undefined`] |
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
