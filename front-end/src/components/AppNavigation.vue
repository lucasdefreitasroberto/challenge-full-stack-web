<script setup lang="ts">
import { ref } from 'vue'
import AppLink from './AppLink.vue'

const rail = ref<boolean>(true)
</script>

<template>
    <v-app-bar flat class="border-b" theme="dark">
        <v-app-bar-title>Grupo A+</v-app-bar-title>
    </v-app-bar>

    <v-navigation-drawer permanent :rail="rail" @click="rail = false" theme="dark">
        <v-list-item nav>
            <template v-slot:append>
                <v-btn
                    variant="text"
                    :icon="rail ? 'mdi-chevron-right' : 'mdi-chevron-left'"
                    @click.stop="rail = !rail"
                ></v-btn>
            </template>
        </v-list-item>

        <v-list>
            <AppLink to="/" icon="mdi-view-dashboard">Home</AppLink>
            <AppLink to="/about" icon="mdi-forum">About</AppLink>
        </v-list>
    </v-navigation-drawer>
</template>
