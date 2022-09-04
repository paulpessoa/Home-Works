import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import HomeDashboard from '../views/HomeDashboard.vue'
import PageAuth from '../views/PageAuth.vue'
import ErrorComponent from '@/components/ErrorComponent.vue'

import FormLogin from "@/components/FormLogin.vue"
import FormRegister from "@/components/FormRegister.vue"
import EmailConfirmation from '@/components/EmailConfirmation.vue'
import ResetPassword from "@/components/ResetPassword.vue"
import NewPassword from '@/components/NewPassword.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '*',
    name: 'error',
    component: ErrorComponent
  },
  {
    path: '' || '/' || 'home' || 'dashboard',
    redirect: { name: 'home' }
  },
  {
    path: '/',
    name: 'home',
    component: HomeDashboard
  },
  {
    path: '/auth',
    name: 'auth',
    component: PageAuth,
    children: [
      {
        path: '/login',
        name: 'login',
        component: FormLogin
      },
      {
        path: '/register',
        name: 'register',
        component: FormRegister
      },
      {
        path: '/email-confirmation',
        name: 'email-confirmation',
        component: EmailConfirmation
      },
      {
        path: '/reset-password',
        name: 'reset-password',
        component: ResetPassword
      },
      {
        path: '/new-password',
        name: 'new-password',
        component: NewPassword
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
