import api from './api'

export type CreateStudent = {
    cpf: string
    name: string
    email: string
    academicRecord: string
}

export type UpdateStudent = {
    name: string
    email: string
}

export default {
    create: async (data: CreateStudent) => {
        const result = await api.post('/students', data)
        return result.data
    },
    getOne: async (id: number) => {
        const result = await api.get(`/students/${id}`)
        return result.data
    },
    update: async (id: number, data: UpdateStudent) => {
        const result = await api.put(`/students/${id}`, data)
        return result.data
    },
    delete: async (id: number) => {
        const result = await api.delete(`/students/${id}`)
        return result.data
    },
    list: async (page: number, perPage: number, search?: string) => {
        const result = await api.get('/students', { params: { search, page, perPage } })
        return result.data
    }
}
