# JobApi

All URIs are relative to *https://api-dev.company.com*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**assignUserToJob**](JobApi.md#assignusertojob) | **PUT** /companies/{comp_id}/jobs/{job_id}/users/{user_id} | Assign a user to a job |
| [**crupdateJobs**](JobApi.md#crupdatejobs) | **PUT** /companies/{comp_id}/jobs | Create new jobs or update existing jobs |
| [**deleteJobById**](JobApi.md#deletejobbyid) | **DELETE** /companies/{comp_id}/jobs/{id} | Delete a job by identifier |
| [**getJobById**](JobApi.md#getjobbyid) | **GET** /companies/{comp_id}/jobs/{id} | Get job by identifier |
| [**getJobResponsibleUsers**](JobApi.md#getjobresponsibleusers) | **GET** /companies/{comp_id}/jobs/{job_id}/users | Get responsible users for a job |
| [**getJobs**](JobApi.md#getjobs) | **GET** /companies/{comp_id}/jobs | Get all jobs |
| [**unassignUserFromJob**](JobApi.md#unassignuserfromjob) | **DELETE** /companies/{comp_id}/jobs/{job_id}/users/{user_id} | Unassign a user from a job |



## assignUserToJob

> assignUserToJob(compId, jobId, userId)

Assign a user to a job

### Example

```ts
import {
  Configuration,
  JobApi,
} from 'api-client';
import type { AssignUserToJobRequest } from 'api-client';

async function example() {
  console.log("🚀 Testing api-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new JobApi(config);

  const body = {
    // string
    compId: comp_btp001,
    // string
    jobId: job_001,
    // string
    userId: usr_123456,
  } satisfies AssignUserToJobRequest;

  try {
    const data = await api.assignUserToJob(body);
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
| **compId** | `string` |  | [Defaults to `undefined`] |
| **jobId** | `string` |  | [Defaults to `undefined`] |
| **userId** | `string` |  | [Defaults to `undefined`] |

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
| **200** | User assigned to job successfully |  -  |
| **400** | Bad request |  -  |
| **403** | Forbidden |  -  |
| **404** | Not found |  -  |
| **429** | Too many requests to the API |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## crupdateJobs

> Array&lt;Job&gt; crupdateJobs(compId, crupdateJob)

Create new jobs or update existing jobs

### Example

```ts
import {
  Configuration,
  JobApi,
} from 'api-client';
import type { CrupdateJobsRequest } from 'api-client';

async function example() {
  console.log("🚀 Testing api-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new JobApi(config);

  const body = {
    // string
    compId: comp_btp001,
    // Array<CrupdateJob>
    crupdateJob: [{"id":"job_001","company_id":"comp_btp001","description":"Construction d'un entrepôt logistique de 5000m²","contract_signature_date":"2024-01-20","start_date":"2024-02-01","end_date":"2024-08-31","status":"IN_PROGRESS","comment":"Le projet a pris du retard"},{"company_id":"comp_hotel001","description":"Rénovation complète des chambres","contract_signature_date":"2024-02-15","start_date":"2024-03-15","end_date":"2024-05-30","status":"PENDING_SIGNATURE","comment":"Nouveau projet hôtelier"}],
  } satisfies CrupdateJobsRequest;

  try {
    const data = await api.crupdateJobs(body);
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
| **compId** | `string` |  | [Defaults to `undefined`] |
| **crupdateJob** | `Array<CrupdateJob>` |  | |

### Return type

[**Array&lt;Job&gt;**](Job.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The created or updated jobs |  -  |
| **400** | Bad request |  -  |
| **403** | Forbidden |  -  |
| **404** | Not found |  -  |
| **429** | Too many requests to the API |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteJobById

> deleteJobById(compId, id)

Delete a job by identifier

### Example

```ts
import {
  Configuration,
  JobApi,
} from 'api-client';
import type { DeleteJobByIdRequest } from 'api-client';

async function example() {
  console.log("🚀 Testing api-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new JobApi(config);

  const body = {
    // string
    compId: comp_btp001,
    // string
    id: job_001,
  } satisfies DeleteJobByIdRequest;

  try {
    const data = await api.deleteJobById(body);
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
| **compId** | `string` |  | [Defaults to `undefined`] |
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
| **204** | Job deleted successfully |  -  |
| **400** | Bad request |  -  |
| **403** | Forbidden |  -  |
| **404** | Not found |  -  |
| **429** | Too many requests to the API |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getJobById

> Job getJobById(compId, id)

Get job by identifier

### Example

```ts
import {
  Configuration,
  JobApi,
} from 'api-client';
import type { GetJobByIdRequest } from 'api-client';

async function example() {
  console.log("🚀 Testing api-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new JobApi(config);

  const body = {
    // string
    compId: comp_btp001,
    // string
    id: job_001,
  } satisfies GetJobByIdRequest;

  try {
    const data = await api.getJobById(body);
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
| **compId** | `string` |  | [Defaults to `undefined`] |
| **id** | `string` |  | [Defaults to `undefined`] |

### Return type

[**Job**](Job.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The identified job |  -  |
| **400** | Bad request |  -  |
| **403** | Forbidden |  -  |
| **404** | Not found |  -  |
| **429** | Too many requests to the API |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getJobResponsibleUsers

> Array&lt;User&gt; getJobResponsibleUsers(compId, jobId)

Get responsible users for a job

### Example

```ts
import {
  Configuration,
  JobApi,
} from 'api-client';
import type { GetJobResponsibleUsersRequest } from 'api-client';

async function example() {
  console.log("🚀 Testing api-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new JobApi(config);

  const body = {
    // string
    compId: comp_btp001,
    // string
    jobId: job_001,
  } satisfies GetJobResponsibleUsersRequest;

  try {
    const data = await api.getJobResponsibleUsers(body);
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
| **compId** | `string` |  | [Defaults to `undefined`] |
| **jobId** | `string` |  | [Defaults to `undefined`] |

### Return type

[**Array&lt;User&gt;**](User.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | List of responsible users for the job |  -  |
| **400** | Bad request |  -  |
| **403** | Forbidden |  -  |
| **404** | Not found |  -  |
| **429** | Too many requests to the API |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getJobs

> Array&lt;Job&gt; getJobs(compId, page, pageSize, status, description)

Get all jobs

### Example

```ts
import {
  Configuration,
  JobApi,
} from 'api-client';
import type { GetJobsRequest } from 'api-client';

async function example() {
  console.log("🚀 Testing api-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new JobApi(config);

  const body = {
    // string
    compId: comp_btp001,
    // number (optional)
    page: 1,
    // number (optional)
    pageSize: 20,
    // JobStatus (optional)
    status: IN_PROGRESS,
    // string | Filter jobs by description, case is ignored (optional)
    description: entrepôt,
  } satisfies GetJobsRequest;

  try {
    const data = await api.getJobs(body);
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
| **compId** | `string` |  | [Defaults to `undefined`] |
| **page** | `number` |  | [Optional] [Defaults to `undefined`] |
| **pageSize** | `number` |  | [Optional] [Defaults to `undefined`] |
| **status** | `JobStatus` |  | [Optional] [Defaults to `undefined`] [Enum: PENDING_SIGNATURE, IN_PROGRESS, COMPLETED] |
| **description** | `string` | Filter jobs by description, case is ignored | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;Job&gt;**](Job.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | List of jobs |  -  |
| **400** | Bad request |  -  |
| **403** | Forbidden |  -  |
| **404** | Not found |  -  |
| **429** | Too many requests to the API |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## unassignUserFromJob

> unassignUserFromJob(compId, jobId, userId)

Unassign a user from a job

### Example

```ts
import {
  Configuration,
  JobApi,
} from 'api-client';
import type { UnassignUserFromJobRequest } from 'api-client';

async function example() {
  console.log("🚀 Testing api-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new JobApi(config);

  const body = {
    // string
    compId: comp_btp001,
    // string
    jobId: job_001,
    // string
    userId: usr_123456,
  } satisfies UnassignUserFromJobRequest;

  try {
    const data = await api.unassignUserFromJob(body);
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
| **compId** | `string` |  | [Defaults to `undefined`] |
| **jobId** | `string` |  | [Defaults to `undefined`] |
| **userId** | `string` |  | [Defaults to `undefined`] |

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
| **204** | User unassigned from job successfully |  -  |
| **400** | Bad request |  -  |
| **403** | Forbidden |  -  |
| **404** | Not found |  -  |
| **429** | Too many requests to the API |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

