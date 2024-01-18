<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const props = defineProps(['to', 'icon'])
const isActive = computed(() => route.path === props.to)
</script>

<template>
    <router-link :to="to" class="text-decoration-none text-white">
        <v-list-item link :prepend-icon="props.icon" :active="isActive">
            <slot />
        </v-list-item>
    </router-link>
</template>
