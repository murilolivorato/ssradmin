
import axios from 'axios'
const state = {
  pageInfo: {
    STORE_LOGIN: process.env.API_URL + 'api/admin/post-login',
    LOAD_USER_INFO: process.env.API_URL + 'api/admin/info',
    LOGOUT: process.env.API_URL + 'api/admin/logout'
  },
  currentUser: '',
  isLoggedIn: false,
  localeOs: '',
  localeUser: ''
}
const mutations = {
  'LOG_OUT' (state) {
    state.isLoggedIn = false
    state.currentUser = null
  },
  'SET_LOGGED_IN' (state, status) {
    state.isLoggedIn = status
  },
  'STORE_TOKEN' (state, data) {
    state.currentUser = Object.assign({}, { token: data.access_token })
  },
  'ADD_USER_INFO' (state, data) {
    state.currentUser = { ...state.currentUser, ...data }
  },
  'SET_USER_IMAGE' (state, image) {
    state.currentUser.image = image
  },
  'LOCALE_OS' (state, data) {
    state.localeOs = data
  }
}

const actions = {
  store: ({ commit }, data) => {
    return new Promise((resolve, reject) => {
      axios.post(state.pageInfo.STORE_LOGIN, data)
        .then(response => {
          commit('STORE_TOKEN', response.data)
          resolve(true)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  },

  getUserInfo: ({ commit }) => {
    const header = { headers: { Authorization: 'Bearer ' + state.currentUser.token } }

    // GET THE DATA TO SEND
    return new Promise((resolve, reject) => {
      axios.post(state.pageInfo.LOAD_USER_INFO, null, header)
        .then(response => {
          // ADD USER INFO
          commit('ADD_USER_INFO', response.data)

          // RETURN REQUEST
          resolve(true)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  },

  logout: ({ commit }, data) => {
    // GET THE DATA TO SEND
    return new Promise((resolve, reject) => {
      axios.post(state.pageInfo.LOGOUT, data)
        .then(response => {
          commit('LOG_OUT')
          resolve(true)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  }

}

const getters = {
  getToken: state => {
    return state.currentUser.token
  },
  isLoggedIn: state => {
    return state.isLoggedIn
  },
  currentUser: state => {
    return state.currentUser
  },
  pageInfo: state => {
    return state.pageInfo
  },
  localeOs: state => {
    return state.localeOs
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
