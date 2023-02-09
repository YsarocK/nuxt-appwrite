# nuxt-appwrite

## Features
- ```useAppwrite``` composable exposing **Account, Users, Databases & Storage APIs**.
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
You can configure the proxying route (default to /appwrite) with the **proxyRoute** settings.