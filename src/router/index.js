import Vue from 'vue'
import VueRouter from 'vue-router'

import finRoutes from './routes/finRoutes'



Vue.use(VueRouter)

const routes = finRoutes

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
