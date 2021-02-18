import Login from 'layouts/Login'
import Admin from 'layouts/Admin'
import AdminLogin from 'pages/AdminLogin'
import HomeAdmin from 'pages/admin/HomeAdmin'

const routes = [
  {
    path: '/acesso-admin',
    component: Login,
    children: [{ path: '', component: AdminLogin, name: 'AdminLogin', meta: { template: 'login' } }]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  },
  // HOME
  {
    path: '/admin/home',
    component: Admin,
    children: [{ path: '', component: HomeAdmin, name: 'AdminHome', meta: { template: 'admin', requiresAdminAuth: true } }]
  }
]

export default routes
