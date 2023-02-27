import { defineNuxtModule, addPlugin, addImportsDir, createResolver, addServerHandler, addRouteMiddleware, extendViteConfig } from '@nuxt/kit'

export interface ModuleOptions {
  proxyRoute: string,
  guardRoutes: string[],
  guardRoutesRedirectURL: string,
  guardSSR: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt3-appwrite',
    configKey: 'appwrite'
  },
  defaults: {
    proxyRoute: '/appwrite',
    guardRoutes: [],
    guardRoutesRedirectURL: '/login',
    guardSSR: true
  },
  setup(options, nuxt) {
    extendViteConfig((config) => {
      config.optimizeDeps = config.optimizeDeps || {}
      config.optimizeDeps.include = config.optimizeDeps.include || []
      config.optimizeDeps.include.push('cross-fetch')
    })

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
      appwrite: {
        guardRoutes: options.guardRoutes,
        guardRoutesRedirectURL: options.guardRoutesRedirectURL,
        guardSSR: options.guardSSR,
        APPWRITE_API_KEY: process.env.APPWRITE_API_KEY || '',
      },
      public: {
        appwrite: {
          APPWRITE_ENDPOINT: process.env.NODE_ENV === 'development'
            ? `${nuxt.options.devServer.url}${options.proxyRoute}`
            : process.env.APPWRITE_ENDPOINT,
          APPWRITE_PROJECT_ID: process.env.APPWRITE_PROJECT_ID,
        }
      }
    }

    const resolver = createResolver(import.meta.url)
    addPlugin(resolver.resolve('./runtime/plugins/appwrite'))
    addImportsDir(resolver.resolve('./runtime', "composables"));
    addImportsDir(resolver.resolve('./runtime/server', "composables"));

    if (options.guardRoutes.length > 0) {
      if (options.guardSSR) {
        addServerHandler({ middleware: true, handler: resolver.resolve('./runtime/server/middleware/guard') })
      } else {
        console.warn('guardSSR is false, guardRoutes will not work on SSR. Add "guard" middleware to protected routes manually.')
      }
    }

    addRouteMiddleware({ name: 'guard', path: resolver.resolve('./runtime/middleware/guard') })
  }
})
