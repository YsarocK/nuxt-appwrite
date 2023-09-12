import { getSessionFromServer } from "../utils/getSessionFromServer"
import { defineEventHandler, parseCookies, sendRedirect } from "h3";
import { useRuntimeConfig } from "#imports";

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()
  const protectedRoutes: string[] = runtimeConfig.appwrite.guardRoutes
  const protectedRoutesRedirectURL: string = runtimeConfig.appwrite.guardRoutesRedirectURL

  const URL: string | undefined = event.node.req.url

  const protectedRoute = () => {
    if (!URL) return
    return protectedRoutes.some(route => URL.startsWith(route))
  }

  if (protectedRoute()) {
    const cookies = parseCookies(event)
    const session = await getSessionFromServer(cookies, runtimeConfig)
    if (!session) {
      await sendRedirect(event, protectedRoutesRedirectURL)
    }
  }
  return
})
