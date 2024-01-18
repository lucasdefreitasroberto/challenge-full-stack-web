import api from './api'

export default {
    login: async (data: { username: string; password: string }) => {
        const result = await api.post('/auth/login', data)
        return result.data
    },
    verify: async () => {
        const result = await api.get('/auth/verify')
        return result.data
    }
}
