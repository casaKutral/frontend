import axios from 'axios'

export const state = {
  workshops: [],
  teachers: [],
  hours: [],
  booking: [],
}

export const getters = {}

export const mutations = {
  CACHE_WORKSHOPS(state, newWorkshops) {
    state.workshops = newWorkshops
  },
  CACHE_TEACHERS(state, newTeachers) {
    state.teachers = newTeachers
  },
  CACHE_HOURS(state, newHours) {
    state.hours = newHours
  },
  CACHE_BOOKING(state, newBooking) {
    state.booking = newBooking
  },
}

export const actions = {
  fetchWorkshops({ commit }) {
    return axios
      .get(`https://backend.casakutral.vercel.app/api/workshops`)
      .then((response) => {
        const workshops = response.data
        commit('CACHE_WORKSHOPS', workshops)
        return workshops
      })
  },
  fetchTeachers({ commit }) {
    return axios
      .get('https://backend.casakutral.vercel.app/api/teachers')
      .then((response) => {
        const teachers = response.data
        commit('CACHE_TEACHERS', teachers)
        return teachers
      })
  },
  fetchHours({ commit }) {
    return axios
      .get('https://backend.casakutral.vercel.app/api/dates')
      .then((response) => {
        const hours = response.data
        commit('CACHE_HOURS', hours)
        return hours
      })
  },
  postBooking({ commit }, payload) {
    return axios
      .post('https://backend.casakutral.vercel.app/api/bookings', payload)
      .then((response) => {
        const booking = response
        commit('CACHE_BOOKING', booking)
        return booking
      })
  },
  updateHours({ commit, state }, payload) {
    const findHours = payload.map((booking) => {
      const matchHours = state.hours.fillter((hour) => {
        if (hour.date === booking.date && hour.hour === booking.hour) {
          return hour
        }
      })
      return matchHours
    })
    findHours.map((hour) => {
      if (hour.capacity === 1) {
        return axios
          .delete(`https://backend.casakutral.vercel.app/api/dates/${hour._id}`)
          .then((response) => {
            console.log(response)
          })
      } else {
        const newCapacity = hour.capacity - 1
        return axios
          .pacth(
            `https://backend.casakutral.vercel.app/api/dates/${hour._id}`,
            { capacity: newCapacity }
          )
          .then((response) => {
            console.log(response)
          })
      }
    })
  },
}
