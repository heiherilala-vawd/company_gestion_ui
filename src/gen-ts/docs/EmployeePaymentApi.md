# EmployeePaymentApi

All URIs are relative to *https://api-dev.company.com*

| Method                                                                           | HTTP request                                                                                              | Description                                          |
| -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| [**crupdateEmployeePayments**](EmployeePaymentApi.md#crupdateemployeepayments)   | **PUT** /companies/{comp_id}/job/{job_id}/user/{user_id}/expenses/{expenses_id}/employee_payments         | Create new employee payments or update existing ones |
| [**deleteEmployeePaymentById**](EmployeePaymentApi.md#deleteemployeepaymentbyid) | **DELETE** /companies/{comp_id}/job/{job_id}/user/{user_id}/expenses/{expenses_id}/employee_payments/{id} | Delete employee payment by identifier                |
| [**getEmployeePaymentById**](EmployeePaymentApi.md#getemployeepaymentbyid)       | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/expenses/{expenses_id}/employee_payments/{id}    | Get employee payment by identifier                   |
| [**getEmployeePayments**](EmployeePaymentApi.md#getemployeepayments)             | **GET** /companies/{comp_id}/job/{job_id}/user/{user_id}/expenses/{expenses_id}/employee_payments         | Get all employee payments                            |

## crupdateEmployeePayments

> Array&lt;EmployeePayment&gt; crupdateEmployeePayments(compId, jobId, userId, expensesId, crupdateEmployeePayment)

Create new employee payments or update existing ones

### Example

```ts
import { Configuration, EmployeePaymentApi } from 'api-client'
import type { CrupdateEmployeePaymentsRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new EmployeePaymentApi(config)

  const body = {
    // string
    compId: comp_btp001,
    // string
    jobId: job_001,
    // string
    userId: usr_123456,
    // string
    expensesId: exp_004,
    // Array<CrupdateEmployeePayment>
    crupdateEmployeePayment: [
      {
        id: 'emp_pay_001',
        expense_id: 'exp_004',
        employee_id: 'usr_123456',
        payment_description: 'Salaire février 2024 + prime',
        payment_type: 'MONTHLY',
      },
    ],
  } satisfies CrupdateEmployeePaymentsRequest

  try {
    const data = await api.crupdateEmployeePayments(body)
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
| **expensesId**              | `string`                         |             | [Defaults to `undefined`] |
| **crupdateEmployeePayment** | `Array<CrupdateEmployeePayment>` |             |                           |

### Return type

[**Array&lt;EmployeePayment&gt;**](EmployeePayment.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                              | Response headers |
| ----------- | ---------------------------------------- | ---------------- |
| **200**     | The created or updated employee payments | -                |
| **400**     | Bad request                              | -                |
| **403**     | Forbidden                                | -                |
| **404**     | Not found                                | -                |
| **429**     | Too many requests to the API             | -                |
| **500**     | Internal server error                    | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## deleteEmployeePaymentById

> deleteEmployeePaymentById(compId, jobId, userId, expensesId, id)

Delete employee payment by identifier

### Example

```ts
import { Configuration, EmployeePaymentApi } from 'api-client'
import type { DeleteEmployeePaymentByIdRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new EmployeePaymentApi(config)

  const body = {
    // string
    compId: comp_btp001,
    // string
    jobId: job_001,
    // string
    userId: usr_123456,
    // string
    expensesId: exp_004,
    // string
    id: emp_pay_001,
  } satisfies DeleteEmployeePaymentByIdRequest

  try {
    const data = await api.deleteEmployeePaymentById(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name           | Type     | Description | Notes                     |
| -------------- | -------- | ----------- | ------------------------- |
| **compId**     | `string` |             | [Defaults to `undefined`] |
| **jobId**      | `string` |             | [Defaults to `undefined`] |
| **userId**     | `string` |             | [Defaults to `undefined`] |
| **expensesId** | `string` |             | [Defaults to `undefined`] |
| **id**         | `string` |             | [Defaults to `undefined`] |

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
| **204**     | Employee payment deleted successfully | -                |
| **400**     | Bad request                           | -                |
| **403**     | Forbidden                             | -                |
| **404**     | Not found                             | -                |
| **429**     | Too many requests to the API          | -                |
| **500**     | Internal server error                 | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getEmployeePaymentById

> EmployeePayment getEmployeePaymentById(compId, jobId, userId, expensesId, id)

Get employee payment by identifier

### Example

```ts
import { Configuration, EmployeePaymentApi } from 'api-client'
import type { GetEmployeePaymentByIdRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new EmployeePaymentApi(config)

  const body = {
    // string
    compId: comp_btp001,
    // string
    jobId: job_001,
    // string
    userId: usr_123456,
    // string
    expensesId: exp_004,
    // string
    id: emp_pay_001,
  } satisfies GetEmployeePaymentByIdRequest

  try {
    const data = await api.getEmployeePaymentById(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name           | Type     | Description | Notes                     |
| -------------- | -------- | ----------- | ------------------------- |
| **compId**     | `string` |             | [Defaults to `undefined`] |
| **jobId**      | `string` |             | [Defaults to `undefined`] |
| **userId**     | `string` |             | [Defaults to `undefined`] |
| **expensesId** | `string` |             | [Defaults to `undefined`] |
| **id**         | `string` |             | [Defaults to `undefined`] |

### Return type

[**EmployeePayment**](EmployeePayment.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                     | Response headers |
| ----------- | ------------------------------- | ---------------- |
| **200**     | The identified employee payment | -                |
| **400**     | Bad request                     | -                |
| **403**     | Forbidden                       | -                |
| **404**     | Not found                       | -                |
| **429**     | Too many requests to the API    | -                |
| **500**     | Internal server error           | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getEmployeePayments

> Array&lt;EmployeePayment&gt; getEmployeePayments(compId, jobId, userId, expensesId, page, pageSize, employeeId, expenseId, paymentDescription, paymentType)

Get all employee payments

### Example

```ts
import { Configuration, EmployeePaymentApi } from 'api-client'
import type { GetEmployeePaymentsRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new EmployeePaymentApi(config)

  const body = {
    // string
    compId: comp_btp001,
    // string
    jobId: job_001,
    // string
    userId: usr_123456,
    // string
    expensesId: exp_004,
    // number (optional)
    page: 1,
    // number (optional)
    pageSize: 20,
    // string (optional)
    employeeId: usr_123456,
    // string (optional)
    expenseId: exp_004,
    // string | Filter employee payments by description, case is ignored (optional)
    paymentDescription: salaire,
    // PaymentType (optional)
    paymentType: MONTHLY,
  } satisfies GetEmployeePaymentsRequest

  try {
    const data = await api.getEmployeePayments(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name                   | Type          | Description                                              | Notes                                                                |
| ---------------------- | ------------- | -------------------------------------------------------- | -------------------------------------------------------------------- |
| **compId**             | `string`      |                                                          | [Defaults to `undefined`]                                            |
| **jobId**              | `string`      |                                                          | [Defaults to `undefined`]                                            |
| **userId**             | `string`      |                                                          | [Defaults to `undefined`]                                            |
| **expensesId**         | `string`      |                                                          | [Defaults to `undefined`]                                            |
| **page**               | `number`      |                                                          | [Optional] [Defaults to `undefined`]                                 |
| **pageSize**           | `number`      |                                                          | [Optional] [Defaults to `undefined`]                                 |
| **employeeId**         | `string`      |                                                          | [Optional] [Defaults to `undefined`]                                 |
| **expenseId**          | `string`      |                                                          | [Optional] [Defaults to `undefined`]                                 |
| **paymentDescription** | `string`      | Filter employee payments by description, case is ignored | [Optional] [Defaults to `undefined`]                                 |
| **paymentType**        | `PaymentType` |                                                          | [Optional] [Defaults to `undefined`] [Enum: ADVANCE, MONTHLY, OTHER] |

### Return type

[**Array&lt;EmployeePayment&gt;**](EmployeePayment.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **200**     | List of employee payments    | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
