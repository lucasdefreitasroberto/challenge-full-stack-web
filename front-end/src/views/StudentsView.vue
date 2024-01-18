<script setup lang="ts">
import { useStudentsStore } from '@/stores/students.store'
import type { Student } from '@/stores/students.store'
import { ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { toast } from 'vue3-toastify'
import DeleteStudentDialog from '@/components/DeleteStudentDialog.vue'
import router from '@/router'

const loading = ref(false)

const page = ref(1)
const perPage = ref(5)
const searchInput = ref<string>()
const typingTimeout = ref<NodeJS.Timeout | null>()

watch(searchInput, async (newValue) => {
    if ((newValue && newValue?.length >= 3) || !newValue) {
        loading.value = true
        if (typingTimeout.value) {
            clearTimeout(typingTimeout.value)
        }

        typingTimeout.value = setTimeout(async () => {
            await handleListStudents()
        }, 1000)
    }
})

const tableHeaders = [
    { title: 'Registro Acadêmico', value: 'academicRecord' },
    { title: 'Nome', value: 'name' },
    { title: 'E-mail', value: 'email' },
    { title: 'CPF', value: 'cpf' },
    { title: 'Ações', value: 'actions' }
]

const tableDesserts = ref<Student[]>()

const perPageOptions = [
    { value: 5, title: '5' },
    { value: 10, title: '10' },
    { value: 20, title: '20' },
    { value: 40, title: '40' }
]

const studentsStore = useStudentsStore()

const { listStudent } = studentsStore

const handleListStudents = async () => {
    try {
        loading.value = true

        await listStudent(page.value, perPage.value, searchInput.value)

        tableDesserts.value = studentsStore.students
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

const handleUpdateTable = async (value: any) => {
    page.value = value.page
    perPage.value = value.itemsPerPage
    await handleListStudents()
}
</script>

<template>
    <main>
        <div class="d-flex justify-space-between py-5">
            <h5 class="text-h4">Alunos</h5>
            <RouterLink to="/students/create">
                <v-btn height="45">Adicionar aluno</v-btn>
            </RouterLink>
        </div>

        <div class="pb-5">
            <v-text-field hide-details="auto" v-model="searchInput" placeholder="Pesquisar" />
        </div>

        <div>
            <v-data-table-server
                :headers="tableHeaders"
                :items="tableDesserts"
                :loading="loading"
                :items-per-page-options="perPageOptions"
                :items-length="studentsStore.total"
                :page="page"
                :items-per-page="perPage"
                @update:options="handleUpdateTable"
            >
                <template v-slot:loading>
                    <v-skeleton-loader type="table-row@5"></v-skeleton-loader>
                </template>

                <template v-slot:[`item.actions`]="{ item }">
                    <v-row class="d-flex ga-2">
                        <v-btn
                            class="pa-0"
                            @click="router.push({ path: `/students/${item.id}/update` })"
                        >
                            <v-icon icon="mdi-pencil" />
                        </v-btn>
                        <DeleteStudentDialog :student="item" />
                    </v-row>
                </template>
            </v-data-table-server>
        </div>
    </main>
</template>

<style scoped>
.v-btn {
    min-width: 0;
    padding: 10px !important;
}
</style>
