import { defineNuxtModule, addPlugin, addImportsDir, createResolver, addServerHandler } from '@nuxt/kit'

// Module options TypeScript interface definition
export interface ModuleOptions {
  proxyRoute: string,
  protectedRoutes: string[],
  protectedRoutesRedirectURL: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-appwrite',
    configKey: 'appwrite'
  },
  defaults: {
    proxyRoute: '/appwrite',
    protectedRoutes: [],
    protectedRoutesRedirectURL: '/login'
  },
  setup(options, nuxt) {
    if (!process.env.APPWRITE_PROJECT_ID) {
      throw new Error('APPWRITE_PROJECT_ID is not defined')
    }

    if (!process.env.APPWRITE_ENDPOINT) {
      throw new Error('APPWRITE_ENDPOINT is not defined')
    }

    nuxt.options.nitro.devProxy = {
      ...nuxt.options.nitro.devProxy,
      [options.proxyRoute]: {
        target: process.env.APPWRITE_ENDPOINT,
        changeOrigin: true,
        cookieDomainRewrite: "localhost"
      }
    }

    nuxt.options.runtimeConfig = {
      ...nuxt.options.runtimeConfig,
      protectedRoutes: options.protectedRoutes,
      protectedRoutesRedirectURL: options.protectedRoutesRedirectURL,
      public: {
        APPWRITE_ENDPOINT: process.env.NODE_ENV === 'development'
          ? `${nuxt.options.devServer.url}/${options.proxyRoute}}`
          : process.env.APPWRITE_ENDPOINT,
        APPWRITE_PROJECT_ID: process.env.APPWRITE_PROJECT_ID,
      }
    }

    const resolver = createResolver(import.meta.url)
    addPlugin(resolver.resolve('./runtime/main'))
    addImportsDir(resolver.resolve('./runtime', "composables"));

    if (options.protectedRoutes.length > 0) {
      addServerHandler({ middleware: true, handler: resolver.resolve('./server/middleware/guard'), })
    }
  }
})
