import { Client, Account } from "appwrite"

export const getSessionFromServer = async (cookies: Record<string, string>, config: any): Promise<boolean | undefined> => {
  const client = new Client()
  client
    .setEndpoint(config.public.appwrite.APPWRITE_ENDPOINT)
    .setProject(config.public.appwrite.APPWRITE_PROJECT_ID);

  const account = new Account(client);

  const sessionCookiesNames = [
    `a_session_${config.public.appwrite.APPWRITE_PROJECT_ID.toLowerCase()}`,
    `a_session_${config.public.appwrite.APPWRITE_PROJECT_ID.toLowerCase()}_legacy`,
  ];

  const hash = cookies[sessionCookiesNames[0]] ?? cookies[sessionCookiesNames[1]] ?? '';

  const authCookies: any = new Map();
  authCookies[`a_session_${config.public.appwrite.APPWRITE_PROJECT_ID.toLowerCase()}`] = hash;

  client.headers['X-Fallback-Cookies'] = JSON.stringify(authCookies);

  const user = account.get()

  return user
    .then(u => {
      if (u.$id) {
        return true
      } else {
        return undefined
      }
    })
    .catch(err => {
      console.log(err)
      return undefined
    })
}
