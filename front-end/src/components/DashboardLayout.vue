<script setup lang="ts">
import AppNavigation from './AppNavigation.vue'
</script>

<template>
    <v-app theme="test">
        <AppNavigation />
        <v-main>
            <v-container>
                <slot />
            </v-container>
        </v-main>
    </v-app>
</template>
