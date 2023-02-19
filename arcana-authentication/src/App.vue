<template>
  <div id="app">
  </div>
</template>

<script>
import { getAuthInstance } from '@/lib/auth'

export default {
  name: 'App',
  async mounted () {
    // eslint-disable-next-line no-unused-vars
    const a = await getAuthInstance()
    // Provider available at a.provider
    window.open('//krishiblock-ethforall.vercel.app', '_self')
  }
}
</script>
