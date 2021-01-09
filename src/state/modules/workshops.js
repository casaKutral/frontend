import axios from 'axios'

export const state = {
  workshops: [],
  teachers: [],
}

export const getters = {}

export const mutations = {
  CACHE_WORKSHOPS(state, newWorkshops) {
    state.workshops = newWorkshops
  },
  CACHE_TEACHERS(state, newTeachers) {
    state.teachers = newTeachers
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
}
