export default defineNuxtConfig({
  modules: ['../src/module'],
  appwrite: {
    guardRoutes: ['/protected'],
    guardRoutesRedirectURL: '/',
    guardSSR: true
  },
  imports: {
    autoImport: true
  }
})
