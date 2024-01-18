<script setup lang="ts">
import { vMaska } from 'maska'
import { RouterLink, useRoute } from 'vue-router'
import { isValidEmail } from '@/helpers/email-validation'
import { ref } from 'vue'

import { useStudentsStore } from '../stores/students.store'
import { useField, useForm } from 'vee-validate'
import { toast } from 'vue3-toastify'
import router from '@/router'
import { onMounted } from 'vue'

const loading = ref(false)
const useRouter = useRoute()
const studentId = useRouter.params.id

const { handleSubmit } = useForm({
    validationSchema: {
        name(value: string) {
            if (value?.length >= 2) return true
            return 'nome deve ter no mínimo 2 caracteres.'
        },
        email(value: string) {
            if (isValidEmail(value)) return true
            return 'deve ser um email válido.'
        }
    }
})

const name = useField('name')
const email = useField('email')
const cpf = ref<string>()
const academicRecord = ref<string>()

const masks = {
    cpf: { mask: '###.###.###-##' }
}

const { getStudent, updateStudent } = useStudentsStore()

const handleGetStudentData = async () => {
    try {
        loading.value = true

        const response = await getStudent(+studentId)

        const student = response.result[0]

        if (response.isValid && student) {
            name.value.value = student.name
            email.value.value = student.email
            cpf.value = student.cpf
            academicRecord.value = student.academicRecord
        }
    } catch (error: any) {
        toast.error(error.message, {
            theme: 'dark',
            autoClose: 2500,
            position: toast.POSITION.TOP_RIGHT,
            style: { marginTop: '55px' }
        })
        router.push({ path: '/students' })
    } finally {
        setTimeout(() => {
            loading.value = false
        }, 1000)
    }
}

const handleUpdateStudent = handleSubmit(async (form: any): Promise<void> => {
    try {
        loading.value = true

        console.log({ form })

        await updateStudent(+studentId, form)

        toast.success('Dados atualizados com sucesso!', {
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

onMounted(() => {
    handleGetStudentData()
})
</script>

<template>
    <main>
        <div class="d-flex justify-space-between py-5">
            <h5 class="text-h4">Editar aluno</h5>
        </div>

        <v-form class="d-flex flex-column ga-2 py-5" @submit.prevent="handleUpdateStudent">
            <v-row>
                <v-text-field
                    label="Nome:"
                    type="text"
                    v-model="name.value.value"
                    :error-messages="name.errorMessage.value"
                    :loading="loading"
                    :disabled="loading"
                />
            </v-row>
            <v-row>
                <v-text-field
                    label="E-mail:"
                    type="email"
                    v-model="email.value.value"
                    :error-messages="email.errorMessage.value"
                    :loading="loading"
                    :disabled="loading"
                />
            </v-row>
            <v-row class="d-flex ga-5 pa-0">
                <v-text-field
                    label="RA:"
                    type="text"
                    v-model="academicRecord"
                    :disabled="true"
                    :loading="loading"
                />
                <v-text-field
                    label="CPF:"
                    type="text"
                    v-model="cpf"
                    :disabled="true"
                    v-maska:[masks.cpf]
                    :loading="loading"
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
