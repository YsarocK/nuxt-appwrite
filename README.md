# nuxt-appwrite

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
    protectedRoutes: ['/account'], // Route protected by SSR session guard
    protectedRoutesRedirectURL: '/login' // Non-logged user redirection URL
  }
})

```

## Exemple
```js
<script setup lang="ts">
const { client, account, storage, database } = useAppwrite()
</script>
```