import { getSessionFromServer } from "../utils/getSessionFromServer"

const runtimeConfig = useRuntimeConfig()
const protectedRoutes: string[] = runtimeConfig.appwrite.guardRoutes
const protectedRoutesRedirectURL: string = runtimeConfig.appwrite.guardRoutesRedirectURL

export default defineEventHandler(async (event) => {
  const URL: string | undefined = event.node.req.url

  const protectedRoute = () => {
    if (!URL) return
    return protectedRoutes.some(route => URL.startsWith(route))
  }
  if (protectedRoute()) {
    const cookies = parseCookies(event)
    const session = await getSessionFromServer(cookies)
    if (!session) {
      sendRedirect(event, protectedRoutesRedirectURL)
    }
  }
  return
})