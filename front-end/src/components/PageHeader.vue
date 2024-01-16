<script lang="ts" setup>
const props = defineProps(['title'])
</script>
<template>
    <div class="home">
        <div class="header">
            <h2>{{ props.title }}</h2>
            <slot />
        </div>
    </div>
</template>

<style lang="postcss" scoped>
.home {
    display: flex;
    flex-direction: column;

    & .header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        & .searchArea {
            display: flex;
            width: 300px;
            align-items: center;
        }
    }
}
/* 
.home {
    @apply flex flex-col;

    & .header {
        @apply flex justify-between items-center;
    }
}
 */
</style>
