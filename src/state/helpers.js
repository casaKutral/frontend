import { mapState, mapGetters, mapActions } from 'vuex'

export const authComputed = {
  ...mapState('auth', {
    currentUser: (state) => state.currentUser,
  }),
  ...mapGetters('auth', ['loggedIn']),
}
export const WorkshopsComputed = {
  ...mapState('workshops', {
    workshops: (state) => state.workshops,
  }),
}
export const TeachersComputed = {
  ...mapState('teachers', {
    teachers: (state) => state.teachers,
  }),
}

export const authMethods = mapActions('auth', ['logIn', 'logOut'])
