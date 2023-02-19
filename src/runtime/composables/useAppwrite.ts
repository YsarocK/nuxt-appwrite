import { useNuxtApp } from '#app'
/**
 * Use the current Appwrite instance
 * @returns Client, Databases, Account, Storage, Avatars, Functions, Role, Permission
 */
const useAppwrite = () => {
  const { $appwrite } = useNuxtApp();
  return $appwrite;
}

export default useAppwrite