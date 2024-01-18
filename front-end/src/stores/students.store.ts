import studentsService, {
    type CreateStudent,
    type UpdateStudent
} from '@/services/students.service'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export type Student = {
    id: number
    cpf: string
    name: string
    email: string
    academicRecord: string
}

export const useStudentsStore = defineStore('students', () => {
    const students = ref<Student[]>([])
    const total = ref<number>(0)

    const listStudent = async (page: number, perPage: number, search?: string) => {
        const response: any = await studentsService.list(page, perPage, search)

        students.value = response.result
        total.value = response.pagination.total

        return response
    }

    const getStudent = async (id: number) => {
        return await studentsService.getOne(id)
    }

    const createStudent = async (data: CreateStudent) => {
        const response: any = await studentsService.create(data)

        if (response.isValid) {
            students.value.push(response.result[0])
            total.value++
        }

        return response
    }

    const updateStudent = async (id: number, data: UpdateStudent) => {
        const response: any = await studentsService.update(id, data)

        if (response.isValid) {
            const index = students.value.findIndex((student: Student) => student.id === id)
            if (index >= 0) students.value[index] = response.result[0]
        }

        return response
    }

    const deleteStudent = async (id: number) => {
        const response: any = await studentsService.delete(id)

        if (response.isValid) {
            const index = students.value.findIndex((student: Student) => student.id === id)
            if (index >= 0) students.value.splice(index, 1)
            total.value--
        }

        return response
    }

    return {
        students,
        total,
        listStudent,
        getStudent,
        createStudent,
        updateStudent,
        deleteStudent
    }
})
