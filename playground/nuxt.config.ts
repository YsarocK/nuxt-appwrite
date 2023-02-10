export default defineNuxtConfig({
  modules: ['../src/module'],
  appwrite: {
    guardSSR: false
  },
  imports: {
    autoImport: true
  }
})