import axios from 'axios'
export function initialize (store, router) {
  router.beforeEach((to, from, next) => {
    // ADMIN
    const requiresAdminAuth = to.matched.some(record => record.meta.requiresAdminAuth)
    const currentAdminUser = store.state.adminLogin.currentUser

    if (requiresAdminAuth && !currentAdminUser) {
      next('/')
    } else {
      next()
    }
  })

  axios.interceptors.response.use(null, (error) => {
    if (error.response.status === 403) {
      console.log('deu erro 403')
      store.commit('adminLogin/LOG_OUT')
      router.push('/')
    }

    return Promise.reject(error)
  })

  if (store.state.adminLogin.currentUser) {
    setAuthorization(store.state.adminLogin.currentUser.token)
  }
}

export function setAuthorization (token) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`
}
