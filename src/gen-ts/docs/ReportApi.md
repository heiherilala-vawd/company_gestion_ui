# ReportApi

All URIs are relative to *https://api-dev.company.com*

| Method                                                                            | HTTP request                                                      | Description                           |
| --------------------------------------------------------------------------------- | ----------------------------------------------------------------- | ------------------------------------- |
| [**companiesCompIdYearlyReportGet**](ReportApi.md#companiescompidyearlyreportget) | **GET** /companies/{comp_id}/yearly_report                        | Get yearly report with job financials |
| [**getBudgetTimeSeries**](ReportApi.md#getbudgettimeseries)                       | **GET** /companies/{comp_id}/dashboard/monetary/budget            | Get budget time series                |
| [**getCashFlowTimeSeries**](ReportApi.md#getcashflowtimeseries)                   | **GET** /companies/{comp_id}/dashboard/monetary/cashflow          | Get cash flow time series             |
| [**getEquipmentDashboard**](ReportApi.md#getequipmentdashboard)                   | **GET** /companies/{comp_id}/dashboard/equipment                  | Get equipment dashboard               |
| [**getEquipmentDashboardBreakdown**](ReportApi.md#getequipmentdashboardbreakdown) | **GET** /companies/{comp_id}/dashboard/equipment/breakdown        | Get equipment dashboard breakdown     |
| [**getEquipmentDashboardSummary**](ReportApi.md#getequipmentdashboardsummary)     | **GET** /companies/{comp_id}/dashboard/equipment/summary          | Get equipment dashboard summary       |
| [**getExpenseBreakdownTimeSeries**](ReportApi.md#getexpensebreakdowntimeseries)   | **GET** /companies/{comp_id}/dashboard/monetary/expense_breakdown | Get expense breakdown time series     |
| [**getExpensesTimeSeries**](ReportApi.md#getexpensestimeseries)                   | **GET** /companies/{comp_id}/dashboard/monetary/expenses          | Get expenses time series              |
| [**getHrDashboard**](ReportApi.md#gethrdashboard)                                 | **GET** /companies/{comp_id}/dashboard/hr                         | Get HR dashboard                      |
| [**getHrDashboardBreakdown**](ReportApi.md#gethrdashboardbreakdown)               | **GET** /companies/{comp_id}/dashboard/hr/breakdown               | Get HR dashboard breakdown            |
| [**getHrDashboardSummary**](ReportApi.md#gethrdashboardsummary)                   | **GET** /companies/{comp_id}/dashboard/hr/summary                 | Get HR dashboard summary              |
| [**getMaterialDashboard**](ReportApi.md#getmaterialdashboard)                     | **GET** /companies/{comp_id}/dashboard/materials                  | Get material dashboard                |
| [**getMaterialDashboardBreakdown**](ReportApi.md#getmaterialdashboardbreakdown)   | **GET** /companies/{comp_id}/dashboard/materials/breakdown        | Get material dashboard breakdown      |
| [**getMaterialDashboardSummary**](ReportApi.md#getmaterialdashboardsummary)       | **GET** /companies/{comp_id}/dashboard/materials/summary          | Get material dashboard summary        |
| [**getMonetaryDashboard**](ReportApi.md#getmonetarydashboard)                     | **GET** /companies/{comp_id}/dashboard/monetary                   | Get monetary dashboard                |
| [**getMonetaryDashboardBreakdown**](ReportApi.md#getmonetarydashboardbreakdown)   | **GET** /companies/{comp_id}/dashboard/monetary/breakdown         | Get monetary dashboard breakdown      |
| [**getMonetaryDashboardSummary**](ReportApi.md#getmonetarydashboardsummary)       | **GET** /companies/{comp_id}/dashboard/monetary/summary           | Get monetary dashboard summary        |
| [**getProfitTimeSeries**](ReportApi.md#getprofittimeseries)                       | **GET** /companies/{comp_id}/dashboard/monetary/profit            | Get profit time series                |
| [**getReceivablesTimeSeries**](ReportApi.md#getreceivablestimeseries)             | **GET** /companies/{comp_id}/dashboard/monetary/receivables       | Get receivables time series           |
| [**getRevenueTimeSeries**](ReportApi.md#getrevenuetimeseries)                     | **GET** /companies/{comp_id}/dashboard/monetary/revenue           | Get revenue time series               |

## companiesCompIdYearlyReportGet

> YearlyReport companiesCompIdYearlyReportGet(compId, year, page, pageSize)

Get yearly report with job financials

Returns all jobs for the specified year with their income/expense details, including ongoing (IN_PROGRESS) jobs

### Example

```ts
import { Configuration, ReportApi } from 'api-client'
import type { CompaniesCompIdYearlyReportGetRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new ReportApi(config)

  const body = {
    // string
    compId: comp_btp001,
    // number
    year: 2024,
    // number (optional)
    page: 1,
    // number (optional)
    pageSize: 20,
  } satisfies CompaniesCompIdYearlyReportGetRequest

  try {
    const data = await api.companiesCompIdYearlyReportGet(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name         | Type     | Description | Notes                                |
| ------------ | -------- | ----------- | ------------------------------------ |
| **compId**   | `string` |             | [Defaults to `undefined`]            |
| **year**     | `number` |             | [Defaults to `undefined`]            |
| **page**     | `number` |             | [Optional] [Defaults to `undefined`] |
| **pageSize** | `number` |             | [Optional] [Defaults to `undefined`] |

### Return type

[**YearlyReport**](YearlyReport.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **200**     | Yearly report                | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getBudgetTimeSeries

> TimeSeriesResponse getBudgetTimeSeries(compId, dateFrom, dateTo, granularity)

Get budget time series

### Example

```ts
import { Configuration, ReportApi } from 'api-client'
import type { GetBudgetTimeSeriesRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new ReportApi(config)

  const body = {
    // string
    compId: compId_example,
    // Date (optional)
    dateFrom: 2013 - 10 - 20,
    // Date (optional)
    dateTo: 2013 - 10 - 20,
    // string (optional)
    granularity: granularity_example,
  } satisfies GetBudgetTimeSeriesRequest

  try {
    const data = await api.getBudgetTimeSeries(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name            | Type     | Description | Notes                                      |
| --------------- | -------- | ----------- | ------------------------------------------ |
| **compId**      | `string` |             | [Defaults to `undefined`]                  |
| **dateFrom**    | `Date`   |             | [Optional] [Defaults to `undefined`]       |
| **dateTo**      | `Date`   |             | [Optional] [Defaults to `undefined`]       |
| **granularity** | `string` |             | [Optional] [Defaults to `&#39;month&#39;`] |

### Return type

[**TimeSeriesResponse**](TimeSeriesResponse.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description        | Response headers |
| ----------- | ------------------ | ---------------- |
| **200**     | Budget time series | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getCashFlowTimeSeries

> TimeSeriesResponse getCashFlowTimeSeries(compId, dateFrom, dateTo, granularity)

Get cash flow time series

### Example

```ts
import { Configuration, ReportApi } from 'api-client'
import type { GetCashFlowTimeSeriesRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new ReportApi(config)

  const body = {
    // string
    compId: compId_example,
    // Date (optional)
    dateFrom: 2013 - 10 - 20,
    // Date (optional)
    dateTo: 2013 - 10 - 20,
    // string (optional)
    granularity: granularity_example,
  } satisfies GetCashFlowTimeSeriesRequest

  try {
    const data = await api.getCashFlowTimeSeries(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name            | Type     | Description | Notes                                      |
| --------------- | -------- | ----------- | ------------------------------------------ |
| **compId**      | `string` |             | [Defaults to `undefined`]                  |
| **dateFrom**    | `Date`   |             | [Optional] [Defaults to `undefined`]       |
| **dateTo**      | `Date`   |             | [Optional] [Defaults to `undefined`]       |
| **granularity** | `string` |             | [Optional] [Defaults to `&#39;month&#39;`] |

### Return type

[**TimeSeriesResponse**](TimeSeriesResponse.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description           | Response headers |
| ----------- | --------------------- | ---------------- |
| **200**     | Cash flow time series | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getEquipmentDashboard

> EquipmentDashboardResponse getEquipmentDashboard(compId, jobId, dateFrom, dateTo)

Get equipment dashboard

### Example

```ts
import { Configuration, ReportApi } from 'api-client'
import type { GetEquipmentDashboardRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new ReportApi(config)

  const body = {
    // string
    compId: compId_example,
    // string (optional)
    jobId: jobId_example,
    // Date (optional)
    dateFrom: 2013 - 10 - 20,
    // Date (optional)
    dateTo: 2013 - 10 - 20,
  } satisfies GetEquipmentDashboardRequest

  try {
    const data = await api.getEquipmentDashboard(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name         | Type     | Description | Notes                                |
| ------------ | -------- | ----------- | ------------------------------------ |
| **compId**   | `string` |             | [Defaults to `undefined`]            |
| **jobId**    | `string` |             | [Optional] [Defaults to `undefined`] |
| **dateFrom** | `Date`   |             | [Optional] [Defaults to `undefined`] |
| **dateTo**   | `Date`   |             | [Optional] [Defaults to `undefined`] |

### Return type

[**EquipmentDashboardResponse**](EquipmentDashboardResponse.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description              | Response headers |
| ----------- | ------------------------ | ---------------- |
| **200**     | Equipment dashboard data | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getEquipmentDashboardBreakdown

> EquipmentBreakdownResponse getEquipmentDashboardBreakdown(compId, jobId, dateFrom, dateTo)

Get equipment dashboard breakdown

### Example

```ts
import { Configuration, ReportApi } from 'api-client'
import type { GetEquipmentDashboardBreakdownRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new ReportApi(config)

  const body = {
    // string
    compId: compId_example,
    // string (optional)
    jobId: jobId_example,
    // Date (optional)
    dateFrom: 2013 - 10 - 20,
    // Date (optional)
    dateTo: 2013 - 10 - 20,
  } satisfies GetEquipmentDashboardBreakdownRequest

  try {
    const data = await api.getEquipmentDashboardBreakdown(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name         | Type     | Description | Notes                                |
| ------------ | -------- | ----------- | ------------------------------------ |
| **compId**   | `string` |             | [Defaults to `undefined`]            |
| **jobId**    | `string` |             | [Optional] [Defaults to `undefined`] |
| **dateFrom** | `Date`   |             | [Optional] [Defaults to `undefined`] |
| **dateTo**   | `Date`   |             | [Optional] [Defaults to `undefined`] |

### Return type

[**EquipmentBreakdownResponse**](EquipmentBreakdownResponse.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                   | Response headers |
| ----------- | ----------------------------- | ---------------- |
| **200**     | Equipment dashboard breakdown | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getEquipmentDashboardSummary

> EquipmentSummaryResponse getEquipmentDashboardSummary(compId, jobId, dateFrom, dateTo)

Get equipment dashboard summary

### Example

```ts
import { Configuration, ReportApi } from 'api-client'
import type { GetEquipmentDashboardSummaryRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new ReportApi(config)

  const body = {
    // string
    compId: compId_example,
    // string (optional)
    jobId: jobId_example,
    // Date (optional)
    dateFrom: 2013 - 10 - 20,
    // Date (optional)
    dateTo: 2013 - 10 - 20,
  } satisfies GetEquipmentDashboardSummaryRequest

  try {
    const data = await api.getEquipmentDashboardSummary(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name         | Type     | Description | Notes                                |
| ------------ | -------- | ----------- | ------------------------------------ |
| **compId**   | `string` |             | [Defaults to `undefined`]            |
| **jobId**    | `string` |             | [Optional] [Defaults to `undefined`] |
| **dateFrom** | `Date`   |             | [Optional] [Defaults to `undefined`] |
| **dateTo**   | `Date`   |             | [Optional] [Defaults to `undefined`] |

### Return type

[**EquipmentSummaryResponse**](EquipmentSummaryResponse.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                 | Response headers |
| ----------- | --------------------------- | ---------------- |
| **200**     | Equipment dashboard summary | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getExpenseBreakdownTimeSeries

> TimeSeriesResponse getExpenseBreakdownTimeSeries(compId, jobId, dateFrom, dateTo, granularity)

Get expense breakdown time series

### Example

```ts
import { Configuration, ReportApi } from 'api-client'
import type { GetExpenseBreakdownTimeSeriesRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new ReportApi(config)

  const body = {
    // string
    compId: compId_example,
    // string (optional)
    jobId: jobId_example,
    // Date (optional)
    dateFrom: 2013 - 10 - 20,
    // Date (optional)
    dateTo: 2013 - 10 - 20,
    // string (optional)
    granularity: granularity_example,
  } satisfies GetExpenseBreakdownTimeSeriesRequest

  try {
    const data = await api.getExpenseBreakdownTimeSeries(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name            | Type     | Description | Notes                                      |
| --------------- | -------- | ----------- | ------------------------------------------ |
| **compId**      | `string` |             | [Defaults to `undefined`]                  |
| **jobId**       | `string` |             | [Optional] [Defaults to `undefined`]       |
| **dateFrom**    | `Date`   |             | [Optional] [Defaults to `undefined`]       |
| **dateTo**      | `Date`   |             | [Optional] [Defaults to `undefined`]       |
| **granularity** | `string` |             | [Optional] [Defaults to `&#39;month&#39;`] |

### Return type

[**TimeSeriesResponse**](TimeSeriesResponse.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                   | Response headers |
| ----------- | ----------------------------- | ---------------- |
| **200**     | Expense breakdown time series | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getExpensesTimeSeries

> TimeSeriesResponse getExpensesTimeSeries(compId, jobId, dateFrom, dateTo, granularity)

Get expenses time series

### Example

```ts
import { Configuration, ReportApi } from 'api-client'
import type { GetExpensesTimeSeriesRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new ReportApi(config)

  const body = {
    // string
    compId: compId_example,
    // string (optional)
    jobId: jobId_example,
    // Date (optional)
    dateFrom: 2013 - 10 - 20,
    // Date (optional)
    dateTo: 2013 - 10 - 20,
    // string (optional)
    granularity: granularity_example,
  } satisfies GetExpensesTimeSeriesRequest

  try {
    const data = await api.getExpensesTimeSeries(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name            | Type     | Description | Notes                                      |
| --------------- | -------- | ----------- | ------------------------------------------ |
| **compId**      | `string` |             | [Defaults to `undefined`]                  |
| **jobId**       | `string` |             | [Optional] [Defaults to `undefined`]       |
| **dateFrom**    | `Date`   |             | [Optional] [Defaults to `undefined`]       |
| **dateTo**      | `Date`   |             | [Optional] [Defaults to `undefined`]       |
| **granularity** | `string` |             | [Optional] [Defaults to `&#39;month&#39;`] |

### Return type

[**TimeSeriesResponse**](TimeSeriesResponse.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description          | Response headers |
| ----------- | -------------------- | ---------------- |
| **200**     | Expenses time series | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getHrDashboard

> HrDashboardResponse getHrDashboard(compId, jobId, dateFrom, dateTo)

Get HR dashboard

### Example

```ts
import { Configuration, ReportApi } from 'api-client'
import type { GetHrDashboardRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new ReportApi(config)

  const body = {
    // string
    compId: compId_example,
    // string (optional)
    jobId: jobId_example,
    // Date (optional)
    dateFrom: 2013 - 10 - 20,
    // Date (optional)
    dateTo: 2013 - 10 - 20,
  } satisfies GetHrDashboardRequest

  try {
    const data = await api.getHrDashboard(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name         | Type     | Description | Notes                                |
| ------------ | -------- | ----------- | ------------------------------------ |
| **compId**   | `string` |             | [Defaults to `undefined`]            |
| **jobId**    | `string` |             | [Optional] [Defaults to `undefined`] |
| **dateFrom** | `Date`   |             | [Optional] [Defaults to `undefined`] |
| **dateTo**   | `Date`   |             | [Optional] [Defaults to `undefined`] |

### Return type

[**HrDashboardResponse**](HrDashboardResponse.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description       | Response headers |
| ----------- | ----------------- | ---------------- |
| **200**     | HR dashboard data | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getHrDashboardBreakdown

> HrBreakdownResponse getHrDashboardBreakdown(compId, jobId, dateFrom, dateTo)

Get HR dashboard breakdown

### Example

```ts
import { Configuration, ReportApi } from 'api-client'
import type { GetHrDashboardBreakdownRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new ReportApi(config)

  const body = {
    // string
    compId: compId_example,
    // string (optional)
    jobId: jobId_example,
    // Date (optional)
    dateFrom: 2013 - 10 - 20,
    // Date (optional)
    dateTo: 2013 - 10 - 20,
  } satisfies GetHrDashboardBreakdownRequest

  try {
    const data = await api.getHrDashboardBreakdown(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name         | Type     | Description | Notes                                |
| ------------ | -------- | ----------- | ------------------------------------ |
| **compId**   | `string` |             | [Defaults to `undefined`]            |
| **jobId**    | `string` |             | [Optional] [Defaults to `undefined`] |
| **dateFrom** | `Date`   |             | [Optional] [Defaults to `undefined`] |
| **dateTo**   | `Date`   |             | [Optional] [Defaults to `undefined`] |

### Return type

[**HrBreakdownResponse**](HrBreakdownResponse.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description            | Response headers |
| ----------- | ---------------------- | ---------------- |
| **200**     | HR dashboard breakdown | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getHrDashboardSummary

> HrSummaryResponse getHrDashboardSummary(compId, jobId, dateFrom, dateTo)

Get HR dashboard summary

### Example

```ts
import { Configuration, ReportApi } from 'api-client'
import type { GetHrDashboardSummaryRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new ReportApi(config)

  const body = {
    // string
    compId: compId_example,
    // string (optional)
    jobId: jobId_example,
    // Date (optional)
    dateFrom: 2013 - 10 - 20,
    // Date (optional)
    dateTo: 2013 - 10 - 20,
  } satisfies GetHrDashboardSummaryRequest

  try {
    const data = await api.getHrDashboardSummary(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name         | Type     | Description | Notes                                |
| ------------ | -------- | ----------- | ------------------------------------ |
| **compId**   | `string` |             | [Defaults to `undefined`]            |
| **jobId**    | `string` |             | [Optional] [Defaults to `undefined`] |
| **dateFrom** | `Date`   |             | [Optional] [Defaults to `undefined`] |
| **dateTo**   | `Date`   |             | [Optional] [Defaults to `undefined`] |

### Return type

[**HrSummaryResponse**](HrSummaryResponse.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description          | Response headers |
| ----------- | -------------------- | ---------------- |
| **200**     | HR dashboard summary | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getMaterialDashboard

> MaterialDashboardResponse getMaterialDashboard(compId, jobId, dateFrom, dateTo)

Get material dashboard

### Example

```ts
import { Configuration, ReportApi } from 'api-client'
import type { GetMaterialDashboardRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new ReportApi(config)

  const body = {
    // string
    compId: compId_example,
    // string (optional)
    jobId: jobId_example,
    // Date (optional)
    dateFrom: 2013 - 10 - 20,
    // Date (optional)
    dateTo: 2013 - 10 - 20,
  } satisfies GetMaterialDashboardRequest

  try {
    const data = await api.getMaterialDashboard(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name         | Type     | Description | Notes                                |
| ------------ | -------- | ----------- | ------------------------------------ |
| **compId**   | `string` |             | [Defaults to `undefined`]            |
| **jobId**    | `string` |             | [Optional] [Defaults to `undefined`] |
| **dateFrom** | `Date`   |             | [Optional] [Defaults to `undefined`] |
| **dateTo**   | `Date`   |             | [Optional] [Defaults to `undefined`] |

### Return type

[**MaterialDashboardResponse**](MaterialDashboardResponse.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description             | Response headers |
| ----------- | ----------------------- | ---------------- |
| **200**     | Material dashboard data | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getMaterialDashboardBreakdown

> MaterialBreakdownResponse getMaterialDashboardBreakdown(compId, jobId, dateFrom, dateTo)

Get material dashboard breakdown

### Example

```ts
import { Configuration, ReportApi } from 'api-client'
import type { GetMaterialDashboardBreakdownRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new ReportApi(config)

  const body = {
    // string
    compId: compId_example,
    // string (optional)
    jobId: jobId_example,
    // Date (optional)
    dateFrom: 2013 - 10 - 20,
    // Date (optional)
    dateTo: 2013 - 10 - 20,
  } satisfies GetMaterialDashboardBreakdownRequest

  try {
    const data = await api.getMaterialDashboardBreakdown(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name         | Type     | Description | Notes                                |
| ------------ | -------- | ----------- | ------------------------------------ |
| **compId**   | `string` |             | [Defaults to `undefined`]            |
| **jobId**    | `string` |             | [Optional] [Defaults to `undefined`] |
| **dateFrom** | `Date`   |             | [Optional] [Defaults to `undefined`] |
| **dateTo**   | `Date`   |             | [Optional] [Defaults to `undefined`] |

### Return type

[**MaterialBreakdownResponse**](MaterialBreakdownResponse.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **200**     | Material dashboard breakdown | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getMaterialDashboardSummary

> MaterialSummaryResponse getMaterialDashboardSummary(compId, jobId, dateFrom, dateTo)

Get material dashboard summary

### Example

```ts
import { Configuration, ReportApi } from 'api-client'
import type { GetMaterialDashboardSummaryRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new ReportApi(config)

  const body = {
    // string
    compId: compId_example,
    // string (optional)
    jobId: jobId_example,
    // Date (optional)
    dateFrom: 2013 - 10 - 20,
    // Date (optional)
    dateTo: 2013 - 10 - 20,
  } satisfies GetMaterialDashboardSummaryRequest

  try {
    const data = await api.getMaterialDashboardSummary(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name         | Type     | Description | Notes                                |
| ------------ | -------- | ----------- | ------------------------------------ |
| **compId**   | `string` |             | [Defaults to `undefined`]            |
| **jobId**    | `string` |             | [Optional] [Defaults to `undefined`] |
| **dateFrom** | `Date`   |             | [Optional] [Defaults to `undefined`] |
| **dateTo**   | `Date`   |             | [Optional] [Defaults to `undefined`] |

### Return type

[**MaterialSummaryResponse**](MaterialSummaryResponse.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                | Response headers |
| ----------- | -------------------------- | ---------------- |
| **200**     | Material dashboard summary | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getMonetaryDashboard

> MonetaryDashboardResponse getMonetaryDashboard(compId, jobId, dateFrom, dateTo)

Get monetary dashboard

### Example

```ts
import { Configuration, ReportApi } from 'api-client'
import type { GetMonetaryDashboardRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new ReportApi(config)

  const body = {
    // string
    compId: compId_example,
    // string (optional)
    jobId: jobId_example,
    // Date (optional)
    dateFrom: 2013 - 10 - 20,
    // Date (optional)
    dateTo: 2013 - 10 - 20,
  } satisfies GetMonetaryDashboardRequest

  try {
    const data = await api.getMonetaryDashboard(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name         | Type     | Description | Notes                                |
| ------------ | -------- | ----------- | ------------------------------------ |
| **compId**   | `string` |             | [Defaults to `undefined`]            |
| **jobId**    | `string` |             | [Optional] [Defaults to `undefined`] |
| **dateFrom** | `Date`   |             | [Optional] [Defaults to `undefined`] |
| **dateTo**   | `Date`   |             | [Optional] [Defaults to `undefined`] |

### Return type

[**MonetaryDashboardResponse**](MonetaryDashboardResponse.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description             | Response headers |
| ----------- | ----------------------- | ---------------- |
| **200**     | Monetary dashboard data | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getMonetaryDashboardBreakdown

> MonetaryBreakdownResponse getMonetaryDashboardBreakdown(compId, jobId, dateFrom, dateTo)

Get monetary dashboard breakdown

### Example

```ts
import { Configuration, ReportApi } from 'api-client'
import type { GetMonetaryDashboardBreakdownRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new ReportApi(config)

  const body = {
    // string
    compId: compId_example,
    // string (optional)
    jobId: jobId_example,
    // Date (optional)
    dateFrom: 2013 - 10 - 20,
    // Date (optional)
    dateTo: 2013 - 10 - 20,
  } satisfies GetMonetaryDashboardBreakdownRequest

  try {
    const data = await api.getMonetaryDashboardBreakdown(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name         | Type     | Description | Notes                                |
| ------------ | -------- | ----------- | ------------------------------------ |
| **compId**   | `string` |             | [Defaults to `undefined`]            |
| **jobId**    | `string` |             | [Optional] [Defaults to `undefined`] |
| **dateFrom** | `Date`   |             | [Optional] [Defaults to `undefined`] |
| **dateTo**   | `Date`   |             | [Optional] [Defaults to `undefined`] |

### Return type

[**MonetaryBreakdownResponse**](MonetaryBreakdownResponse.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **200**     | Monetary dashboard breakdown | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getMonetaryDashboardSummary

> MonetarySummaryResponse getMonetaryDashboardSummary(compId, jobId, dateFrom, dateTo)

Get monetary dashboard summary

### Example

```ts
import { Configuration, ReportApi } from 'api-client'
import type { GetMonetaryDashboardSummaryRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new ReportApi(config)

  const body = {
    // string
    compId: compId_example,
    // string (optional)
    jobId: jobId_example,
    // Date (optional)
    dateFrom: 2013 - 10 - 20,
    // Date (optional)
    dateTo: 2013 - 10 - 20,
  } satisfies GetMonetaryDashboardSummaryRequest

  try {
    const data = await api.getMonetaryDashboardSummary(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name         | Type     | Description | Notes                                |
| ------------ | -------- | ----------- | ------------------------------------ |
| **compId**   | `string` |             | [Defaults to `undefined`]            |
| **jobId**    | `string` |             | [Optional] [Defaults to `undefined`] |
| **dateFrom** | `Date`   |             | [Optional] [Defaults to `undefined`] |
| **dateTo**   | `Date`   |             | [Optional] [Defaults to `undefined`] |

### Return type

[**MonetarySummaryResponse**](MonetarySummaryResponse.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                | Response headers |
| ----------- | -------------------------- | ---------------- |
| **200**     | Monetary dashboard summary | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getProfitTimeSeries

> TimeSeriesResponse getProfitTimeSeries(compId, jobId, dateFrom, dateTo, granularity)

Get profit time series

### Example

```ts
import { Configuration, ReportApi } from 'api-client'
import type { GetProfitTimeSeriesRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new ReportApi(config)

  const body = {
    // string
    compId: compId_example,
    // string (optional)
    jobId: jobId_example,
    // Date (optional)
    dateFrom: 2013 - 10 - 20,
    // Date (optional)
    dateTo: 2013 - 10 - 20,
    // string (optional)
    granularity: granularity_example,
  } satisfies GetProfitTimeSeriesRequest

  try {
    const data = await api.getProfitTimeSeries(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name            | Type     | Description | Notes                                      |
| --------------- | -------- | ----------- | ------------------------------------------ |
| **compId**      | `string` |             | [Defaults to `undefined`]                  |
| **jobId**       | `string` |             | [Optional] [Defaults to `undefined`]       |
| **dateFrom**    | `Date`   |             | [Optional] [Defaults to `undefined`]       |
| **dateTo**      | `Date`   |             | [Optional] [Defaults to `undefined`]       |
| **granularity** | `string` |             | [Optional] [Defaults to `&#39;month&#39;`] |

### Return type

[**TimeSeriesResponse**](TimeSeriesResponse.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description        | Response headers |
| ----------- | ------------------ | ---------------- |
| **200**     | Profit time series | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getReceivablesTimeSeries

> TimeSeriesResponse getReceivablesTimeSeries(compId, jobId, dateFrom, dateTo, granularity)

Get receivables time series

### Example

```ts
import { Configuration, ReportApi } from 'api-client'
import type { GetReceivablesTimeSeriesRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new ReportApi(config)

  const body = {
    // string
    compId: compId_example,
    // string (optional)
    jobId: jobId_example,
    // Date (optional)
    dateFrom: 2013 - 10 - 20,
    // Date (optional)
    dateTo: 2013 - 10 - 20,
    // string (optional)
    granularity: granularity_example,
  } satisfies GetReceivablesTimeSeriesRequest

  try {
    const data = await api.getReceivablesTimeSeries(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name            | Type     | Description | Notes                                      |
| --------------- | -------- | ----------- | ------------------------------------------ |
| **compId**      | `string` |             | [Defaults to `undefined`]                  |
| **jobId**       | `string` |             | [Optional] [Defaults to `undefined`]       |
| **dateFrom**    | `Date`   |             | [Optional] [Defaults to `undefined`]       |
| **dateTo**      | `Date`   |             | [Optional] [Defaults to `undefined`]       |
| **granularity** | `string` |             | [Optional] [Defaults to `&#39;month&#39;`] |

### Return type

[**TimeSeriesResponse**](TimeSeriesResponse.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description             | Response headers |
| ----------- | ----------------------- | ---------------- |
| **200**     | Receivables time series | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getRevenueTimeSeries

> TimeSeriesResponse getRevenueTimeSeries(compId, jobId, dateFrom, dateTo, granularity)

Get revenue time series

### Example

```ts
import { Configuration, ReportApi } from 'api-client'
import type { GetRevenueTimeSeriesRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new ReportApi(config)

  const body = {
    // string
    compId: compId_example,
    // string (optional)
    jobId: jobId_example,
    // Date (optional)
    dateFrom: 2013 - 10 - 20,
    // Date (optional)
    dateTo: 2013 - 10 - 20,
    // string (optional)
    granularity: granularity_example,
  } satisfies GetRevenueTimeSeriesRequest

  try {
    const data = await api.getRevenueTimeSeries(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name            | Type     | Description | Notes                                      |
| --------------- | -------- | ----------- | ------------------------------------------ |
| **compId**      | `string` |             | [Defaults to `undefined`]                  |
| **jobId**       | `string` |             | [Optional] [Defaults to `undefined`]       |
| **dateFrom**    | `Date`   |             | [Optional] [Defaults to `undefined`]       |
| **dateTo**      | `Date`   |             | [Optional] [Defaults to `undefined`]       |
| **granularity** | `string` |             | [Optional] [Defaults to `&#39;month&#39;`] |

### Return type

[**TimeSeriesResponse**](TimeSeriesResponse.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description         | Response headers |
| ----------- | ------------------- | ---------------- |
| **200**     | Revenue time series | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
