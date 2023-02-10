<<<<<<< HEAD
import { defineNuxtRouteMiddleware } from '#app'
=======
import { defineNuxtRouteMiddleware, navigateTo } from '#app'
>>>>>>> cba11edad02e22333e75bf99efe2e20127ceceea
import useAppwrite from '../composables/useAppwrite'

export default defineNuxtRouteMiddleware(async () => {
  const user = await useAppwrite().account.get()
  if (!user.$id) {
<<<<<<< HEAD
    return { path: '/login' }
=======
    return navigateTo('/login')
>>>>>>> cba11edad02e22333e75bf99efe2e20127ceceea
  }
  return
})