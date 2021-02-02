import axios from 'axios'

export const state = {
  workshops: [],
  teachers: [],
  hours: [],
  booking: [],
  workshopWithID: {},
}

export const getters = {}

export const mutations = {
  CACHE_WORKSHOPS(state, newWorkshops) {
    state.workshops = newWorkshops
  },
  CACHE_WORKSHOPSWID(state, choseWorkshop) {
    state.workshopWithID = choseWorkshop
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
  fetchWorkshops({ commit }, payload) {
    if (payload) {
      return axios
        .get(`https://backend.casakutral.vercel.app/api/workshops/${payload}`)
        .then((response) => {
          const workshop = response.data
          commit('CACHE_WORKSHOPSWID', workshop)
          return workshop
        })
    } else {
      return axios
        .get(`https://backend.casakutral.vercel.app/api/workshops`)
        .then((response) => {
          const workshops = response.data
          commit('CACHE_WORKSHOPS', workshops)
          return workshops
        })
    }
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
    const findHours = payload.dates?.map((booking) => {
      const matchHours = state.hours.find((hour) => {
        if (hour.date._id === booking.date.id) {
          return hour
        }
      })
      return matchHours
    })
    findHours.map((hour) => {
      let newCapacity
      if (
        hour?.booked?.available === 1 ||
        hour?.booked?.available === hour?.booked?.pending - 1
      ) {
        newCapacity = {
          pending: hour.booked.pending + 1,
          confirmed: hour.booked.confirmed,
          available: 0,
        }
      } else {
        newCapacity = {
          pending: hour.booked.pending + 1,
          confirmed: hour.booked.confirmed,
          available: hour.booked.available - 1,
        }
      }
      return axios
        .patch(`https://backend.casakutral.vercel.app/api/dates/${hour._id}`, {
          booked: newCapacity,
        })
        .then((response) => {
          console.log(response)
        })
    })
  },
}
