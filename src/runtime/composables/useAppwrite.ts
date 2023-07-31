import { useNuxtApp } from '#app'
import { Appwrite } from "../plugins/appwrite";

/**
 * Use the current Appwrite instance
 * @returns Client, Databases, Account, Storage, Avatars, Functions, Role, Permission
 */
const useAppwrite = () => {
  const app = useNuxtApp();
  const $appwrite: Appwrite = app.$appwrite;
  return $appwrite;
}

export default useAppwrite
