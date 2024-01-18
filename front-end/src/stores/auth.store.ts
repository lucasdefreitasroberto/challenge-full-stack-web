import router from '@/router'
import authService from '@/services/auth.service'
import { defineStore } from 'pinia'

type Login = {
    username: string
    password: string
}

export const useAuthStore = defineStore('auth', () => {
    const login = async ({ username, password }: Login) => {
        username = username.replace(/\s/g, '')
        password = password.replace(/\s/g, '')

        const response = await authService.login({ username, password })

        localStorage.setItem('accessToken', response.result[0].token)

        return response
    }

    const logout = async () => {
        localStorage.removeItem('accessToken')
    }

    const checkToken = async () => {
        try {
            await authService.verify()
        } catch (error: any) {
            localStorage.removeItem('accessToken')
            router.push('/login')
        }
    }

    return { login, logout, checkToken }
})
