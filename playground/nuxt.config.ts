export default defineNuxtConfig({
  modules: ['../src/module'],
  appwrite: {
    guardRoutes: ['/test'],
    guardRoutesRedirectURL: '/login',
    guardSSR: true
  },
  imports: {
    autoImport: true
  }
})
