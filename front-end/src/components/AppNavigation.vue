<script setup lang="ts">
import { ref } from 'vue'
import AppLink from './AppLink.vue'
import { useAuthStore } from '@/stores/auth.store'
import router from '@/router'

const rail = ref<boolean>(true)
const { logout } = useAuthStore()

const handleLogout = () => {
    logout()
    router.push({ path: '/login' })
}
</script>

<template>
    <v-app-bar flat class="border-b">
        <v-app-bar-title class=""></v-app-bar-title>
        <v-btn icon="mdi-logout" size="large" @click="handleLogout"></v-btn>
    </v-app-bar>

    <v-navigation-drawer permanent :rail="rail" @click="rail = false">
        <v-list-item title="Módulo Acadêmico" nav>
            <template v-slot:append>
                <v-btn
                    variant="text"
                    :icon="rail ? 'mdi-chevron-right' : 'mdi-chevron-left'"
                    @click.stop="rail = !rail"
                />
            </template>
        </v-list-item>

        <v-divider />

        <v-list class="d-flex flex-column ga-2" nav>
            <AppLink to="/home" icon="mdi-view-dashboard">Home</AppLink>
            <AppLink to="/students" icon="mdi-account-group">Alunos</AppLink>
        </v-list>
    </v-navigation-drawer>
</template>
