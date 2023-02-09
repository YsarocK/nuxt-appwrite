import { defineNuxtPlugin } from '#app'
import { Appwrite } from './appwrite'

export default defineNuxtPlugin((nuxtApp) => {
  const appwrite = new Appwrite({
    endpoint: nuxtApp.$config.public.APPWRITE_ENDPOINT,
    project: nuxtApp.$config.public.APPWRITE_PROJECT_ID
  })

  return {
    provide: {
      appwrite
    }
  }
})
