import { useNuxtApp } from "#app";
import { Models } from "node-appwrite";

/**
 * Use the current Appwrite session
 */
const useAuthSession = () => {
  const { $appwrite } = useNuxtApp();
  const session = ref<Models.Account<Models.Preferences> | undefined | null>(null)

  onBeforeMount(async () => {
    try {
      session.value = await $appwrite.account.get();
    } catch (e) {
      session.value = undefined
    }
  })

  return session
}

export default useAuthSession