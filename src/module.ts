import { defineNuxtModule, addPlugin, addImportsDir, createResolver } from '@nuxt/kit'

// Module options TypeScript interface definition
export interface ModuleOptions {
  proxyRoute: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-appwrite',
    configKey: 'appwrite'
  },
  defaults: {
    proxyRoute: '/appwrite'
  },
  setup(options, nuxt) {
    nuxt.options.nitro.devProxy = {
      ...nuxt.options.nitro.devProxy,
      [options.proxyRoute]: {
        target: process.env.APPWRITE_ENDPOINT,
        changeOrigin: true,
        cookieDomainRewrite: "localhost"
      }
    }

    if (!process.env.APPWRITE_PROJECT_ID) {
      throw new Error('APPWRITE_PROJECT_ID is not defined')
    }

    if (!process.env.APPWRITE_ENDPOINT) {
      throw new Error('APPWRITE_ENDPOINT is not defined')
    }

    nuxt.options.runtimeConfig.public = {
      APPWRITE_ENDPOINT: process.env.NODE_ENV === 'development'
        ? `${nuxt.options.devServer.url}/appwrite`
        : process.env.APPWRITE_ENDPOINT,
      APPWRITE_PROJECT_ID: process.env.APPWRITE_PROJECT_ID,
    }

    const resolver = createResolver(import.meta.url)
    addPlugin(resolver.resolve('./runtime/main'))

    addImportsDir(resolver.resolve('./runtime', "composables"));
  }
})
