import { useNuxtApp } from '#app'

const useAppwrite = () => {
  const { $appwrite } = useNuxtApp();
  return $appwrite;
}

export default useAppwrite