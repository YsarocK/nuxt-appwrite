import { useNuxtApp } from '#app'
/**
 * Use the current Appwrite session
 */
const useAuthSession = () => {
  const { $appwrite } = useNuxtApp();
  try {
    const session = $appwrite.account.get(); ``
    return session;
  } catch (error) {
    return error
  }
}

export default useAuthSession