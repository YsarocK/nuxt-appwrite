import { defineNuxtRouteMiddleware, navigateTo } from '#app'
import useAppwrite from '../composables/useAppwrite'

export default defineNuxtRouteMiddleware(async () => {
  try {
    await useAppwrite().account.get();
  } catch {
    return navigateTo('/login')
  }
  return
})
