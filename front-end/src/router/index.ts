import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import StudentsView from '../views/StudentsView.vue'
import DashboardLayout from '../components/DashboardLayout.vue'
import CreateStudentVue from '@/views/CreateStudent.vue'
import UpdateStudentVue from '@/views/UpdateStudentView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const loginBeforeEnter = () => {
    const accessToken = localStorage.getItem('accessToken')
    return accessToken ? { name: 'dashboard' } : true
}

const dashboardBeforeEnter = () => {
    const accessToken = localStorage.getItem('accessToken')
    return accessToken ? true : { name: 'login' }
}

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),

    routes: [
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: NotFoundView
        },
        {
            name: 'login',
            path: '/login',
            component: LoginView,
            beforeEnter: loginBeforeEnter
        },
        {
            path: '/',
            name: 'dashboard',
            redirect: 'home',
            component: DashboardLayout,
            beforeEnter: dashboardBeforeEnter,
            children: [
                {
                    path: '/home',
                    name: 'home',
                    component: HomeView
                },
                {
                    path: '/students',
                    name: 'students',
                    component: StudentsView
                },
                {
                    path: '/students/create',
                    name: 'createStudent',
                    component: CreateStudentVue
                },
                {
                    path: '/students/:id/update',
                    name: 'updateStudent',
                    component: UpdateStudentVue
                }
            ]
        }
    ]
})

export default router
