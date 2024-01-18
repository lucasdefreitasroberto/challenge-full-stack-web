<script lang="ts" setup>
import { useField, useForm } from 'vee-validate'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth.store'
import { toast } from 'vue3-toastify'
import router from '@/router'

const loading = ref(false)
const passwordHidden = ref(true)

const { login } = useAuthStore()

const { handleSubmit } = useForm({
    validationSchema: {
        username(value: string) {
            if (value?.length >= 2) return true
            return 'username é requerido'
        },
        password(value: string) {
            if (value?.length >= 8) return true
            return 'mínimo 8 caracteres'
        }
    }
})

const username = useField('username')
const password = useField('password')

const handleLogin = handleSubmit(async (form: any): Promise<void> => {
    try {
        loading.value = true

        const result: any = await login(form)

        if (result.isValid)
            toast.success('Usuário autenticado com sucesso!', {
                theme: 'dark',
                autoClose: 2500,
                position: toast.POSITION.TOP_RIGHT
            })

        router.push({ path: '/' })
    } catch (error: any) {
        toast.error(error.message, {
            theme: 'dark',
            autoClose: 2500,
            position: toast.POSITION.TOP_RIGHT
        })
    } finally {
        loading.value = false
    }
})
</script>

<template>
    <v-app>
        <v-container class="d-flex h-screen justify-center align-center p">
            <v-card
                color="grey-lighten-1"
                class="card px-5 py-10 pa-sm-10 d-flex flex-column justify-center"
            >
                <v-row no-gutters>
                    <v-col cols="12">
                        <v-img
                            class="mx-auto mb-5"
                            :width="100"
                            src="https://maisaedu.com.br/hubfs/site-grupo-a/logo-mais-a-educacao.svg"
                        />
                    </v-col>
                </v-row>
                <v-form @submit.prevent="handleLogin">
                    <v-row no-gutters>
                        <v-col cols="12">
                            <v-text-field
                                label="Usuário"
                                v-model="username.value.value"
                                :error-messages="username.errorMessage.value"
                            />
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                :type="!passwordHidden ? 'text' : 'password'"
                                label="Password"
                                v-model="password.value.value"
                                :error-messages="password.errorMessage.value"
                            >
                                <template v-slot:append-inner>
                                    <v-icon @click="passwordHidden = !passwordHidden">
                                        {{ !passwordHidden ? 'mdi-eye' : 'mdi-eye-off' }}
                                    </v-icon>
                                </template>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-btn
                                color="red-darken-2"
                                width="100%"
                                min-height="50px"
                                type="submit"
                                :disabled="loading"
                            >
                                <v-progress-circular
                                    v-if="loading"
                                    indeterminate
                                    model-value="20"
                                    :size="37"
                                ></v-progress-circular>
                                <span v-else>Entrar</span>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card>
        </v-container>
    </v-app>
</template>

<style lang="postcss" scoped>
.card {
    width: 400px;
    min-height: 350px;
}
</style>
