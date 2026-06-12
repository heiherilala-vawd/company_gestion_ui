# TeamApi

All URIs are relative to *https://api-dev.company.com*

| Method                                          | HTTP request                               | Description                               |
| ----------------------------------------------- | ------------------------------------------ | ----------------------------------------- |
| [**crupdateTeams**](TeamApi.md#crupdateteams)   | **PUT** /companies/{comp_id}/teams         | Create new teams or update existing teams |
| [**deleteTeamById**](TeamApi.md#deleteteambyid) | **DELETE** /companies/{comp_id}/teams/{id} | Delete team by identifier                 |
| [**getTeamById**](TeamApi.md#getteambyid)       | **GET** /companies/{comp_id}/teams/{id}    | Get team by identifier                    |
| [**getTeams**](TeamApi.md#getteams)             | **GET** /companies/{comp_id}/teams         | Get all teams                             |

## crupdateTeams

> Array&lt;Team&gt; crupdateTeams(compId, crupdateTeam)

Create new teams or update existing teams

### Example

```ts
import {
  Configuration,
  TeamApi,
} from 'api-client';
import type { CrupdateTeamsRequest } from 'api-client';

async function example() {
  console.log("🚀 Testing api-client SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new TeamApi(config);

  const body = {
    // string
    compId: comp_btp001,
    // Array<CrupdateTeam>
    crupdateTeam: ...,
  } satisfies CrupdateTeamsRequest;

  try {
    const data = await api.crupdateTeams(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name             | Type                  | Description | Notes                     |
| ---------------- | --------------------- | ----------- | ------------------------- |
| **compId**       | `string`              |             | [Defaults to `undefined`] |
| **crupdateTeam** | `Array<CrupdateTeam>` |             |                           |

### Return type

[**Array&lt;Team&gt;**](Team.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **200**     | Teams created or updated     | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## deleteTeamById

> deleteTeamById(compId, id)

Delete team by identifier

### Example

```ts
import { Configuration, TeamApi } from 'api-client'
import type { DeleteTeamByIdRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new TeamApi(config)

  const body = {
    // string
    compId: comp_btp001,
    // string
    id: team_001,
  } satisfies DeleteTeamByIdRequest

  try {
    const data = await api.deleteTeamById(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name       | Type     | Description | Notes                     |
| ---------- | -------- | ----------- | ------------------------- |
| **compId** | `string` |             | [Defaults to `undefined`] |
| **id**     | `string` |             | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **204**     | Team deleted successfully    | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getTeamById

> Team getTeamById(compId, id)

Get team by identifier

### Example

```ts
import { Configuration, TeamApi } from 'api-client'
import type { GetTeamByIdRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new TeamApi(config)

  const body = {
    // string
    compId: comp_btp001,
    // string
    id: team_001,
  } satisfies GetTeamByIdRequest

  try {
    const data = await api.getTeamById(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name       | Type     | Description | Notes                     |
| ---------- | -------- | ----------- | ------------------------- |
| **compId** | `string` |             | [Defaults to `undefined`] |
| **id**     | `string` |             | [Defaults to `undefined`] |

### Return type

[**Team**](Team.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **200**     | The identified team          | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getTeams

> Array&lt;Team&gt; getTeams(compId, page, pageSize)

Get all teams

### Example

```ts
import { Configuration, TeamApi } from 'api-client'
import type { GetTeamsRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new TeamApi(config)

  const body = {
    // string
    compId: comp_btp001,
    // number (optional)
    page: 1,
    // number (optional)
    pageSize: 20,
  } satisfies GetTeamsRequest

  try {
    const data = await api.getTeams(body)
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
| **page**     | `number` |             | [Optional] [Defaults to `undefined`] |
| **pageSize** | `number` |             | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;Team&gt;**](Team.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **200**     | List of teams                | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
