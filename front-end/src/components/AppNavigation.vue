<script setup lang="ts">
import { ref } from 'vue'
import AppLink from './AppLink.vue'

const rail = ref<boolean>(true)
</script>

<template>
    <v-app-bar flat class="border-b" theme="dark">
        <v-app-bar-title class=""></v-app-bar-title>
        <v-btn icon="mdi-calendar" size="large"></v-btn>
    </v-app-bar>

    <v-navigation-drawer permanent :rail="rail" @click="rail = false" theme="dark">
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

        <v-list>
            <AppLink to="/home" icon="mdi-view-dashboard">Home</AppLink>
            <AppLink to="/students" icon="mdi-account-group">Alunos</AppLink>
        </v-list>
    </v-navigation-drawer>
</template>
