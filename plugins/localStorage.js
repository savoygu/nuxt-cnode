import createPersistedState from 'vuex-persistedstate'

export default ({store}) => {
  createPersistedState({
      key: '__CNode__',
      paths: ['accesstoken', 'user']
  })(store)
}
