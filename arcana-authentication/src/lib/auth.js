import { AuthProvider } from '@arcana/auth'

let authInstance

export async function getAuthInstance () {
  if (authInstance == null) {
    authInstance = new AuthProvider(process.env.VUE_APP_ARCANA_APP_ADDRESS, {
      network: process.env.VUE_APP_ARCANA_NETWORK ?? 'dev',
      alwaysVisible: true,
      theme: 'light',
      position: 'right'
    })
    await authInstance.init()
    await authInstance.connect()
  }
  return authInstance
}
