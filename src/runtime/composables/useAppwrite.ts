<<<<<<< HEAD
import { useNuxtApp } from "#app";
=======
import { useNuxtApp } from '#app'
>>>>>>> cba11edad02e22333e75bf99efe2e20127ceceea

const useAppwrite = () => {
  const { $appwrite } = useNuxtApp();
  return $appwrite;
}

export default useAppwrite