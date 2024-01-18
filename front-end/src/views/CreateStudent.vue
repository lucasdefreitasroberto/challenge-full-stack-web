<script setup lang="ts">
import { vMaska } from 'maska'
import { RouterLink } from 'vue-router'
import { isValidCPF } from '@/helpers/cpf-validation'
import { isValidEmail } from '@/helpers/email-validation'
import { ref, getCurrentInstance } from 'vue'

import { useStudentsStore } from '../stores/students.store'
import { useField, useForm } from 'vee-validate'
import { toast } from 'vue3-toastify'
import router from '@/router'

const loading = ref(false)

const { handleSubmit } = useForm({
    validationSchema: {
        academicRecord(value: string) {
            if (value?.length >= 2) return true
            return 'RA deve ter no mínimo 2 caracteres.'
        },
        name(value: string) {
            if (value?.length >= 2) return true
            return 'nome deve ter no mínimo 2 caracteres.'
        },
        email(value: string) {
            if (isValidEmail(value)) return true
            return 'deve ser um email válido.'
        },
        cpf(value: string) {
            if (isValidCPF(value)) return true
            return 'deve ser um cpf válido.'
        }
    }
})

const cpf = useField('cpf')
const name = useField('name')
const email = useField('email')
const academicRecord = useField('academicRecord')

const masks = {
    cpf: { mask: '###.###.###-##' }
}

const { createStudent } = useStudentsStore()

const handleCreateStudent = handleSubmit(async (form: any): Promise<void> => {
    try {
        loading.value = true

        await createStudent(form)

        toast.success('Cadastro realizado com sucesso!', {
            theme: 'dark',
            autoClose: 2500,
            position: toast.POSITION.TOP_RIGHT,
            style: { marginTop: '55px' }
        })

        router.push({ path: '/students' })
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
})
</script>

<template>
    <main>
        <div class="d-flex justify-space-between py-5">
            <h5 class="text-h4">Cadastro de aluno</h5>
        </div>

        <v-form class="d-flex flex-column ga-2 py-5" @submit.prevent="handleCreateStudent">
            <v-row>
                <v-text-field
                    label="Nome:"
                    type="text"
                    v-model="name.value.value"
                    :error-messages="name.errorMessage.value"
                    :disabled="loading"
                />
            </v-row>
            <v-row>
                <v-text-field
                    label="E-mail:"
                    type="email"
                    v-model="email.value.value"
                    :error-messages="email.errorMessage.value"
                    :disabled="loading"
                />
            </v-row>
            <v-row class="d-flex ga-5 pa-0">
                <v-text-field
                    label="RA:"
                    type="text"
                    v-model="academicRecord.value.value"
                    :error-messages="academicRecord.errorMessage.value"
                    :disabled="loading"
                />
                <v-text-field
                    label="CPF:"
                    type="text"
                    v-model="cpf.value.value"
                    :error-messages="cpf.errorMessage.value"
                    v-maska:[masks.cpf]
                    :disabled="loading"
                />
            </v-row>

            <v-row class="d-flex ga-5 justify-end pa-0">
                <RouterLink class="text-decoration-none" to="/students">
                    <v-btn class="d-flex w-full" height="45"> Cancelar </v-btn>
                </RouterLink>

                <v-btn class="d-flex" height="45" type="submit" :disabled="loading"> Salvar </v-btn>
            </v-row>
        </v-form>
    </main>
</template>
