<script setup lang="ts">
import PageLayout from '../components/PageHeader.vue'

const data = {
    headers: [
        { title: 'Registro Acadêmico', value: 'ra' },
        { title: 'Nome', value: 'name' },
        { title: 'CPF', value: 'cpf' },
        { title: 'Ações', value: 'actions' }
    ],
    desserts: [
        {
            ra: 'Frozen Yogurt',
            name: 6.0,
            cpf: 200,
            actions: 24
        },
        {
            ra: 'Frozen Yogurt',
            name: 6.0,
            cpf: 200,
            actions: 24
        },
        {
            ra: 'Frozen Yogurt',
            name: 6.0,
            cpf: 200,
            actions: 24
        },
        {
            ra: 'Frozen Yogurt',
            name: 6.0,
            cpf: 200,
            actions: 24
        },
        {
            ra: 'Frozen Yogurt',
            name: 6.0,
            cpf: 200,
            actions: 24
        },
        {
            ra: 'Frozen Yogurt',
            name: 6.0,
            cpf: 200,
            actions: 24
        },
        {
            ra: 'Frozen Yogurt',
            name: 6.0,
            cpf: 200,
            actions: 24
        }
    ]
}
</script>

<template>
    <PageLayout title="Home"></PageLayout>
    <div>content</div>
</template>
