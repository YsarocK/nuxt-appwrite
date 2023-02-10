import { defineNuxtModule, addPlugin, addImportsDir, createResolver, addServerHandler, addRouteMiddleware } from '@nuxt/kit'

// Module options TypeScript interface definition
export interface ModuleOptions {
  proxyRoute: string,
  guardSSR: boolean,
  guardRoutes: string[],
  guardRoutesRedirectURL: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-appwrite',
    configKey: 'appwrite'
  },
  defaults: {
    guardSSR: false,
    proxyRoute: '/appwrite',
    guardRoutes: [],
    guardRoutesRedirectURL: '/login'
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
      protectedRoutes: options.guardRoutes,
      protectedRoutesRedirectURL: options.guardRoutesRedirectURL,
      public: {
        APPWRITE_ENDPOINT: process.env.NODE_ENV === 'development'
          ? `${nuxt.options.devServer.url}${options.proxyRoute}}`
          : process.env.APPWRITE_ENDPOINT,
        APPWRITE_PROJECT_ID: process.env.APPWRITE_PROJECT_ID,
      }
    }

    const resolver = createResolver(import.meta.url)
    addPlugin(resolver.resolve('./runtime/main'))
    addImportsDir(resolver.resolve('./runtime', "composables"));
    addImportsDir(resolver.resolve('./runtime', "middleware"));

    if (options.guardRoutes.length > 0) {
      if (options.guardSSR) {
        addServerHandler({ middleware: true, handler: resolver.resolve('./server/middleware/guard'), })
      } else {
        console.warn('guardSSR is set to false, make sure to add the guard middleware to your nuxt.config.js')
      }
    }

    addRouteMiddleware({ name: 'guard', path: resolver.resolve('./runtime/middleware/guard') })
  }
})
