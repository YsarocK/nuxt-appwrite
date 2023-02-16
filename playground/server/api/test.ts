import useAppwriteServer from '../../../src/runtime/composables/useAppwriteServer'

export default defineEventHandler(() => {
  return useAppwriteServer()
})