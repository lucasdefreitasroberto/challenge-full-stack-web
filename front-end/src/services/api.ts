import router from '@/router'
import axios from 'axios'

const client = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

client.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken')

        if (accessToken) {
            config.headers = {
                ...config.headers,
                authorization: `Bearer ${accessToken}`
            } as any
        }

        return config
    },
    (error) => Promise.reject(error)
)

client.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401) {
            localStorage.removeItem('accessToken')
            router.push('/login')
        }

        let errorMessage: string | string[] = 'Internal Server Error'

        if (!error.response?.data?.isValid && error.response?.data?.message)
            errorMessage = error.response?.data?.message

        return Promise.reject({
            message: errorMessage,
            status: error.response?.status || 500
        })
    }
)

export default client
