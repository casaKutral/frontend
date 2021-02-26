import axios from 'axios'

export const state = {
  cached: [],
  users: [],
  user: {},
}

export const getters = {}

export const mutations = {
  CACHE_USER(state, newUser) {
    state.cached.push(newUser)
  },
  CACHE_USERS(state, users) {
    state.users = users
  },
  CACHE_SAVED_USER(state, user) {
    state.user = user
  },
}

export const actions = {
  fetchUser({ commit, state, rootState }, { username }) {
    // 1. Check if we already have the user as a current user.
    // 2. Check if we've already fetched and cached the user.
    // 3. Fetch the user from the API and cache it in case
    //    we need it again in the future.
    const { currentUser } = rootState.auth
    if (currentUser && currentUser.username === username) {
      return Promise.resolve(currentUser)
    }
    const matchedUser = state.cached.find((user) => user.username === username)
    if (matchedUser) {
      return Promise.resolve(matchedUser)
    }
    return axios.get(`/api/users/${username}`).then((response) => {
      const user = response.data
      commit('CACHE_USER', user)
      return user
    })
  },
  fetchUsers({ commit }) {
    return axios
      .get(`https://backend.casakutral.vercel.app/api/users`)
      .then((response) => {
        const users = response.data
        const savedUser = JSON.parse(localStorage.getItem('user'))
        if (savedUser) {
          const matchedUser = users.find(
            (user) => user.email === savedUser.email
          )
          commit('CACHE_SAVED_USER', matchedUser)
        }
        commit('CACHE_USERS', users)
        return users
      })
  },
  updateUser({ commit, state }, payload) {
    return axios
      .patch(
        `https://backend.casakutral.vercel.app/api/users/${state.user._id}`,
        {
          bookings_ids: payload,
        }
      )
      .then((response) => {
        // console.log(response)
        const updatedUser = response.data
        return updatedUser
      })
  },
  createUser({ commit }, payload) {
    return axios
      .post('https://backend.casakutral.vercel.app/api/users', payload)
      .then((response) => {
        const user = response.data
        commit('CACHE_SAVED_USER', user)
        return user
      })
  },
}
