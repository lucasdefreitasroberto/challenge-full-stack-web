<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps(['student'])
const loading = ref(false)

import { useStudentsStore } from '@/stores/students.store'
import { toast } from 'vue3-toastify'
import { ref } from 'vue'

const { deleteStudent } = useStudentsStore()

const handleDeleteStudent = async () => {
    try {
        loading.value = true
        const response = await deleteStudent(props.student.id)

        if (response.isValid) {
            toast.success('Aluno removido com sucesso!', {
                theme: 'dark',
                autoClose: 2500,
                position: toast.POSITION.TOP_RIGHT,
                style: { marginTop: '55px' }
            })
        }
    } catch (error: any) {
        toast.error(error.message, {
            theme: 'dark',
            autoClose: 2500,
            position: toast.POSITION.TOP_RIGHT,
            style: { marginTop: '55px' }
        })
    } finally {
        loading.value = false
    }
}
</script>
<template>
    <v-dialog transition="dialog-top-transition" max-width="600">
        <template v-slot:activator="{ props }">
            <v-btn class="pa-0" v-bind="props">
                <v-icon icon="mdi-delete" />
            </v-btn>
        </template>
        <template v-slot:default="{ isActive }">
            <v-card>
                <v-toolbar color="red-darken-3" title="Remover Aluno" class="pl-2"></v-toolbar>
                <v-card-text>
                    <p class="text-h7">
                        Você está prestes a excluir permanentemente os dados do aluno selecionado,
                        essa ação não pode ser desfeita.
                    </p>
                    <p class="pt-5">Tem certeza de que deseja prosseguir?</p>
                </v-card-text>
                <v-card-actions class="justify-end">
                    <v-btn variant="elevated" @click="isActive.value = false">Cancelar</v-btn>
                    <v-btn
                        variant="elevated"
                        color="red-darken-3"
                        @click="handleDeleteStudent"
                    >
                        Excluir
                    </v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>

<style scoped>
.v-btn {
    min-width: 0;
    padding: 10px !important;
}
</style>
