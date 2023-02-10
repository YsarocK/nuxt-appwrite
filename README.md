# nuxt3-appwrite

## Features
- ```useAppwrite``` composable exposing **Account, Databases & Storage APIs**.
- Working authentication on localhost (proxying requests & cookies)
- [INCOMING] SSR authentication routes
- [INCOMING] SSR session

## Installation
- In your .env file, create :
	- APPWRITE_ENDPOINT
	- APPWRITE_PROJECT_ID
	- APPWRITE_URL
	- NODE_ENV

## Configuration
You can configure the following settings :
```js
export default defineNuxtConfig({
  appwrite: {
		proxyRoute: '/appwrite', // Development appwrite proxy route
    guardRoutes: [], // Route protected by SSR session guard (NO CLIENT-SIDE)
    guardRoutesRedirectURL: '/login', // Non-logged user redirection URL
    guardSSR: true // Define if route protection should be handle server
  }
})
```

When using client-side guard, a ```guard```middleware is provided and has to be add on protected route.

## Exemple
```js
<script setup lang="ts">
const { client, account, storage, database } = useAppwrite()
</script>
```