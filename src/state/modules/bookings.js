import axios from 'axios'

export const state = {
  bookings: [],
}

export const getters = {}

export const mutations = {
  CACHE_BOOKINGS(state, allbooking) {
    state.bookings = allbooking
  },
}

export const actions = {
  fetchBookings({ commit }) {
    return axios
      .get('https://backend.casakutral.vercel.app/api/bookings')
      .then((response) => {
        const bookings = response.data
        commit('CACHE_BOOKINGS', bookings)
        return bookings
      })
  },
  updateBookings({ commit, state }, payload) {
    payload.map((id) => {
      return axios
        .patch(`https://backend.casakutral.vercel.app/api/bookings/${id}`, {
          status: 'Pagado',
          action: 'updateStatus',
        })
        .then((response) => {
          // console.log(response)
        })
        .catch((err) => {
          console.error(err)
        })
    })
  },
  deleteBookings({ commit, state }, payload) {
    payload.map((id) => {
      return axios
        .delete(`https://backend.casakutral.vercel.app/api/bookings/${id}`)
        .then((response) => {
          // console.log(response)
        })
        .catch((err) => {
          console.error(err)
        })
    })
  },
}
