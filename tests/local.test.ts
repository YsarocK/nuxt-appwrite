import { describe, it, expect } from 'vitest'
import { fileURLToPath } from 'node:url'
import { setup, $fetch } from '@nuxt/test-utils'

describe('local', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixture', import.meta.url)),
  })
  it('success to connect at endpoint', async () => {
    const html = await $fetch('/')
    console.log(html)
    expect(html).toContain("<h1>It&#39;s working!</h1>")
  })
})