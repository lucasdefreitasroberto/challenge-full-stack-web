<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps(['to', 'icon'])
const route = useRoute()
const isActive = computed(() => route.path === props.to)
</script>

<template>
    <router-link :to="to" class="routerLink" :class="{ active: isActive }">
        <v-list-item link :prepend-icon="props.icon">
            <slot />
        </v-list-item>
    </router-link>
</template>

<style lang="postcss" scoped>
.routerLink {
    text-decoration: none;
    color: white;
}

.routerLink.active {
    color: rgb(74 222 128);
}

/* .routerLink {
    @apply no-underline;

    &.active {
        @apply text-green-400;
    }
} */
</style>
