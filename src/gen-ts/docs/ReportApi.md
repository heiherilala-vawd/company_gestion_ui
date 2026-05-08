# ReportApi

All URIs are relative to *https://api-dev.company.com*

| Method                                                                            | HTTP request                               | Description                           |
| --------------------------------------------------------------------------------- | ------------------------------------------ | ------------------------------------- |
| [**companiesCompIdYearlyReportGet**](ReportApi.md#companiescompidyearlyreportget) | **GET** /companies/{comp_id}/yearly-report | Get yearly report with job financials |

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
