<script lang="ts" setup>
import { ref } from 'vue'

const passwordHidden = ref(true)
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
                <v-row no-gutters>
                    <v-col cols="12">
                        <v-text-field label="Usuário" />
                    </v-col>
                    <v-col cols="12">
                        <v-text-field
                            :type="!passwordHidden ? 'text' : 'password'"
                            label="Password"
                        >
                            <template v-slot:append-inner>
                                <v-icon @click="passwordHidden = !passwordHidden">
                                    {{ !passwordHidden ? 'mdi-eye' : 'mdi-eye-off' }}
                                </v-icon>
                            </template>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-btn color="red-darken-2" width="100%" min-height="50px"> Entrar</v-btn>
                    </v-col>
                </v-row>
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
