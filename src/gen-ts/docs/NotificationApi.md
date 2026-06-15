# NotificationApi

All URIs are relative to *https://api-dev.company.com*

| Method                                                                            | HTTP request                                                              | Description                                        |
| --------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | -------------------------------------------------- |
| [**crupdateNotifications**](NotificationApi.md#crupdatenotifications)             | **PUT** /users/{userId}/companies/{companyId}/notifications               | Create or update notifications                     |
| [**deleteNotificationById**](NotificationApi.md#deletenotificationbyid)           | **DELETE** /users/{userId}/companies/{companyId}/notifications/{id}       | Delete notification by identifier                  |
| [**getNotificationById**](NotificationApi.md#getnotificationbyid)                 | **GET** /users/{userId}/companies/{companyId}/notifications/{id}          | Get notification by identifier                     |
| [**getNotifications**](NotificationApi.md#getnotifications)                       | **GET** /users/{userId}/companies/{companyId}/notifications               | Get all notifications for the current user         |
| [**getUnreadNotificationCount**](NotificationApi.md#getunreadnotificationcount)   | **GET** /users/{userId}/companies/{companyId}/notifications/unread_count  | Get unread notification count for the current user |
| [**markNotificationAsCompleted**](NotificationApi.md#marknotificationascompleted) | **PUT** /users/{userId}/companies/{companyId}/notifications/{id}/complete | Mark notification as completed                     |
| [**markNotificationAsRead**](NotificationApi.md#marknotificationasread)           | **PUT** /users/{userId}/companies/{companyId}/notifications/{id}/read     | Mark notification as read                          |

## crupdateNotifications

> Array&lt;Notification&gt; crupdateNotifications(userId, companyId, crupdateNotification)

Create or update notifications

### Example

```ts
import {
  Configuration,
  NotificationApi,
} from 'api-client';
import type { CrupdateNotificationsRequest } from 'api-client';

async function example() {
  console.log("🚀 Testing api-client SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new NotificationApi(config);

  const body = {
    // string
    userId: user_123456,
    // string
    companyId: comp_btp001,
    // Array<CrupdateNotification>
    crupdateNotification: ...,
  } satisfies CrupdateNotificationsRequest;

  try {
    const data = await api.crupdateNotifications(body);
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
| **userId**               | `string`                      |             | [Defaults to `undefined`] |
| **companyId**            | `string`                      |             | [Defaults to `undefined`] |
| **crupdateNotification** | `Array<CrupdateNotification>` |             |                           |

### Return type

[**Array&lt;Notification&gt;**](Notification.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                           | Response headers |
| ----------- | ------------------------------------- | ---------------- |
| **200**     | List of created/updated notifications | -                |
| **400**     | Bad request                           | -                |
| **403**     | Forbidden                             | -                |
| **429**     | Too many requests to the API          | -                |
| **500**     | Internal server error                 | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## deleteNotificationById

> deleteNotificationById(userId, companyId, id)

Delete notification by identifier

### Example

```ts
import { Configuration, NotificationApi } from 'api-client'
import type { DeleteNotificationByIdRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new NotificationApi(config)

  const body = {
    // string
    userId: user_123456,
    // string
    companyId: comp_btp001,
    // string
    id: notif_001,
  } satisfies DeleteNotificationByIdRequest

  try {
    const data = await api.deleteNotificationById(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name          | Type     | Description | Notes                     |
| ------------- | -------- | ----------- | ------------------------- |
| **userId**    | `string` |             | [Defaults to `undefined`] |
| **companyId** | `string` |             | [Defaults to `undefined`] |
| **id**        | `string` |             | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                       | Response headers |
| ----------- | --------------------------------- | ---------------- |
| **204**     | Notification deleted successfully | -                |
| **400**     | Bad request                       | -                |
| **403**     | Forbidden                         | -                |
| **404**     | Not found                         | -                |
| **429**     | Too many requests to the API      | -                |
| **500**     | Internal server error             | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getNotificationById

> Notification getNotificationById(userId, companyId, id)

Get notification by identifier

### Example

```ts
import { Configuration, NotificationApi } from 'api-client'
import type { GetNotificationByIdRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new NotificationApi(config)

  const body = {
    // string
    userId: user_123456,
    // string
    companyId: comp_btp001,
    // string
    id: notif_001,
  } satisfies GetNotificationByIdRequest

  try {
    const data = await api.getNotificationById(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name          | Type     | Description | Notes                     |
| ------------- | -------- | ----------- | ------------------------- |
| **userId**    | `string` |             | [Defaults to `undefined`] |
| **companyId** | `string` |             | [Defaults to `undefined`] |
| **id**        | `string` |             | [Defaults to `undefined`] |

### Return type

[**Notification**](Notification.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **200**     | The identified notification  | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getNotifications

> Array&lt;Notification&gt; getNotifications(userId, companyId, page, pageSize, read, completed)

Get all notifications for the current user

### Example

```ts
import { Configuration, NotificationApi } from 'api-client'
import type { GetNotificationsRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new NotificationApi(config)

  const body = {
    // string
    userId: user_123456,
    // string
    companyId: comp_btp001,
    // number (optional)
    page: 1,
    // number (optional)
    pageSize: 20,
    // boolean (optional)
    read: false,
    // boolean (optional)
    completed: false,
  } satisfies GetNotificationsRequest

  try {
    const data = await api.getNotifications(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name          | Type      | Description | Notes                                |
| ------------- | --------- | ----------- | ------------------------------------ |
| **userId**    | `string`  |             | [Defaults to `undefined`]            |
| **companyId** | `string`  |             | [Defaults to `undefined`]            |
| **page**      | `number`  |             | [Optional] [Defaults to `undefined`] |
| **pageSize**  | `number`  |             | [Optional] [Defaults to `undefined`] |
| **read**      | `boolean` |             | [Optional] [Defaults to `undefined`] |
| **completed** | `boolean` |             | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;Notification&gt;**](Notification.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **200**     | List of notifications        | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## getUnreadNotificationCount

> UnreadNotificationCountResponse getUnreadNotificationCount(userId, companyId)

Get unread notification count for the current user

### Example

```ts
import { Configuration, NotificationApi } from 'api-client'
import type { GetUnreadNotificationCountRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new NotificationApi(config)

  const body = {
    // string
    userId: user_123456,
    // string
    companyId: comp_btp001,
  } satisfies GetUnreadNotificationCountRequest

  try {
    const data = await api.getUnreadNotificationCount(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name          | Type     | Description | Notes                     |
| ------------- | -------- | ----------- | ------------------------- |
| **userId**    | `string` |             | [Defaults to `undefined`] |
| **companyId** | `string` |             | [Defaults to `undefined`] |

### Return type

[**UnreadNotificationCountResponse**](UnreadNotificationCountResponse.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **200**     | Unread notification count    | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## markNotificationAsCompleted

> Notification markNotificationAsCompleted(userId, companyId, id)

Mark notification as completed

### Example

```ts
import { Configuration, NotificationApi } from 'api-client'
import type { MarkNotificationAsCompletedRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new NotificationApi(config)

  const body = {
    // string
    userId: user_123456,
    // string
    companyId: comp_btp001,
    // string
    id: notif_001,
  } satisfies MarkNotificationAsCompletedRequest

  try {
    const data = await api.markNotificationAsCompleted(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name          | Type     | Description | Notes                     |
| ------------- | -------- | ----------- | ------------------------- |
| **userId**    | `string` |             | [Defaults to `undefined`] |
| **companyId** | `string` |             | [Defaults to `undefined`] |
| **id**        | `string` |             | [Defaults to `undefined`] |

### Return type

[**Notification**](Notification.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                      | Response headers |
| ----------- | -------------------------------- | ---------------- |
| **200**     | Notification marked as completed | -                |
| **400**     | Bad request                      | -                |
| **403**     | Forbidden                        | -                |
| **404**     | Not found                        | -                |
| **429**     | Too many requests to the API     | -                |
| **500**     | Internal server error            | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## markNotificationAsRead

> Notification markNotificationAsRead(userId, companyId, id)

Mark notification as read

### Example

```ts
import { Configuration, NotificationApi } from 'api-client'
import type { MarkNotificationAsReadRequest } from 'api-client'

async function example() {
  console.log('🚀 Testing api-client SDK...')
  const config = new Configuration({
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: 'YOUR BEARER TOKEN',
  })
  const api = new NotificationApi(config)

  const body = {
    // string
    userId: user_123456,
    // string
    companyId: comp_btp001,
    // string
    id: notif_001,
  } satisfies MarkNotificationAsReadRequest

  try {
    const data = await api.markNotificationAsRead(body)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// Run the test
example().catch(console.error)
```

### Parameters

| Name          | Type     | Description | Notes                     |
| ------------- | -------- | ----------- | ------------------------- |
| **userId**    | `string` |             | [Defaults to `undefined`] |
| **companyId** | `string` |             | [Defaults to `undefined`] |
| **id**        | `string` |             | [Defaults to `undefined`] |

### Return type

[**Notification**](Notification.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **200**     | Notification marked as read  | -                |
| **400**     | Bad request                  | -                |
| **403**     | Forbidden                    | -                |
| **404**     | Not found                    | -                |
| **429**     | Too many requests to the API | -                |
| **500**     | Internal server error        | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
