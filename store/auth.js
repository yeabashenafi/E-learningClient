export const state = () => ({
  user: null,
})

export const getters = {
  id(state) {
    return state.user?.id
  },
  name({ user }) {
    return user ? user.firstName : null
  },
  fullName({ user }) {
    return user ? `${user.firstName} ${user.lastName}` : null
  },
  isLoggedIn(state) {
    return !!state?.user?.id
  },
  roles(state) {
    return state.user ? state.user.roles : []
  },
}

export const mutations = {
  setUser(state, user) {
    state.user = user
  },
  removeUser(state) {
    state.user = null
  },
}

export const actions = {
  login({ commit }, user) {
    commit('setUser', user)
  },
  logout({ commit }) {
    commit('removeUser')
  },
}
