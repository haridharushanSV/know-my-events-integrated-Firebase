import { createRouter, createWebHistory } from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'
import LoginForm from '../components/loginPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: LoginForm
    },
    {
      path: '/hello',
      component: HelloWorld
    }
  ]
})

export default router