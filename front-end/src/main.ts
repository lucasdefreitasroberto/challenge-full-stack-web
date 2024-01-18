import './assets/main.css'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import 'vue3-toastify/dist/index.css'
import { useAuthStore } from '@/stores/auth.store'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify'

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import App from './App.vue'
import router from './router'

import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

const vuetify = createVuetify({
    theme: {
        defaultTheme: 'dark'
    },
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi
        }
    },
    components,
    directives
})

const app = createApp(App)

app.use(Vue3Toastify, {
    clearOnUrlChange: false
} as ToastContainerOptions)
app.use(vuetify)
app.use(createPinia())
app.use(router)

if (localStorage.getItem('accessToken')) {
    ;(async () => {
        const authStore = useAuthStore()
        await authStore.checkToken()
    })()
}

app.mount('#app')
