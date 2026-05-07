# HistoryApi

All URIs are relative to *https://api-dev.company.com*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getHistories**](HistoryApi.md#gethistories) | **GET** /histories | Get modification history with filters |



## getHistories

> Array&lt;History&gt; getHistories(page, pageSize, userId, entityType, entityId, dateFrom, dateTo)

Get modification history with filters

Retrieve the history of modifications with optional filters for user, entity type, entity id, and date range.

### Example

```ts
import {
  Configuration,
  HistoryApi,
} from 'api-client';
import type { GetHistoriesRequest } from 'api-client';

async function example() {
  console.log("🚀 Testing api-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new HistoryApi(config);

  const body = {
    // number (optional)
    page: 1,
    // number (optional)
    pageSize: 20,
    // string | Filter by user who made the modification (optional)
    userId: usr_123456,
    // EntityType | Filter by entity type (optional)
    entityType: JOB,
    // string | Filter by entity identifier (optional)
    entityId: job_001,
    // Date | Filter modifications from this date (inclusive) (optional)
    dateFrom: 2024-02-01T00:00:00Z,
    // Date | Filter modifications until this date (inclusive) (optional)
    dateTo: 2024-02-29T23:59:59Z,
  } satisfies GetHistoriesRequest;

  try {
    const data = await api.getHistories(body);
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
| **userId** | `string` | Filter by user who made the modification | [Optional] [Defaults to `undefined`] |
| **entityType** | `EntityType` | Filter by entity type | [Optional] [Defaults to `undefined`] [Enum: USER, COMPANY, JOB, WAREHOUSE, EQUIPMENT, MATERIAL, INCOMEMONEY, INCOMETYPE, EXPENSEMONEY, EMPLOYEE_PAYMENT, TRAVEL_EXPENSE, TRAVELPEOPLE, TRAVELMATERIALS, TRAVELEQUIPMENT, PURCHASE, BANK_FEE, OTHER_EXPENSE] |
| **entityId** | `string` | Filter by entity identifier | [Optional] [Defaults to `undefined`] |
| **dateFrom** | `Date` | Filter modifications from this date (inclusive) | [Optional] [Defaults to `undefined`] |
| **dateTo** | `Date` | Filter modifications until this date (inclusive) | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;History&gt;**](History.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | List of history entries |  -  |
| **400** | Bad request |  -  |
| **403** | Forbidden |  -  |
| **404** | Not found |  -  |
| **429** | Too many requests to the API |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

