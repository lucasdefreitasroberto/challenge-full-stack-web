<script setup lang="ts">
import PageHeader from '../components/PageHeader.vue'

const data = {
    headers: [
        { title: 'Registro Acadêmico', value: 'ra' },
        { title: 'Nome', value: 'name' },
        { title: 'CPF', value: 'cpf' },
        { title: 'Ações', value: 'actions' }
    ],
    desserts: [
        {
            id: 1,
            ra: 'Frozen Yogurt',
            name: 6.0,
            cpf: 200
        },
        {
            id: 1,
            ra: 'Frozen Yogurt',
            name: 6.0,
            cpf: 200
        },
        {
            id: 1,
            ra: 'Frozen Yogurt',
            name: 6.0,
            cpf: 200
        },
        {
            id: 1,
            ra: 'Frozen Yogurt',
            name: 6.0,
            cpf: 200
        },
        {
            id: 1,
            ra: 'Frozen Yogurt',
            name: 6.0,
            cpf: 200
        },
    ]
}

const editItem = (id: number) => {
    console.log(id)
}

const deleteItem = (id: number) => {
    console.log(id)
}
</script>

<template>
    <main class="studentsView">
        <PageHeader title="Alunos">
            <v-btn>Adicionar aluno</v-btn>
        </PageHeader>

        <div class="searchArea">
            <v-text-field hide-details="auto" placeholder="Pesquisar" />
        </div>

        <div>
            <v-data-table
                :headers="data.headers"
                :items="data.desserts"
                :sort-by="[{ key: 'calories', order: 'asc' }]"
            >
                <template v-slot:[`item.actions`]="{ item }">
                    <div class="actionButtons">
                        <v-btn class="p-0" @click="editItem(item.id)">
                            <v-icon icon="mdi-pencil" />
                        </v-btn>
                        <v-btn class="p-0" @click="deleteItem(item.id)">
                            <v-icon icon="mdi-delete" />
                        </v-btn>
                    </div>
                </template>
            </v-data-table>
        </div>
    </main>
</template>

<style lang="postcss" scoped>
.studentsView {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.searchArea {
    display: flex;
    justify-content: end;
}

.actionButtons {
    display: flex;
    gap: 5px;

    & .v-btn {
        min-width: 0;
        padding: 10px !important;
    }

    & button:hover {
        color: rgb(74 222 128);
        transition: all;
        transition-duration: 300ms;
    }
}

/* .studentsView {
    @apply flex flex-col gap-5;
}

.searchArea {
    @apply flex justify-end;
}

.actionButtons {
    @apply flex gap-1;

    & .v-btn {
        @apply min-w-0 p-2;
    }

    & button:hover {
        @apply text-green-400 transition-all duration-300;
    }
} */
</style>
