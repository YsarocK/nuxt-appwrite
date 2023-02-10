import { defineNuxtRouteMiddleware, navigateTo } from '#app'
import useAppwrite from '../composables/useAppwrite'

export default defineNuxtRouteMiddleware(async () => {
  const user = await useAppwrite().account.get()
  if (!user.$id) {
    return navigateTo('/login')
  }
  return
})