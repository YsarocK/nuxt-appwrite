import { defineNuxtPlugin } from '#app'
import { Appwrite } from './plugins/appwrite'

export default defineNuxtPlugin((nuxtApp) => {
  const appwrite = new Appwrite({
    endpoint: nuxtApp.$config.public.appwrite.APPWRITE_ENDPOINT,
    project: nuxtApp.$config.public.appwrite.APPWRITE_PROJECT_ID
  })

  return {
    provide: {
      appwrite
    }
  }
})
