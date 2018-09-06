function handleError (error, app, store, redirect, route) {
  if (error.response.status) {
    switch (error.response.status) {
      case 401:
        redirect(`/signin?from=${route.fullPath}`)
        break
      case 403:
        app.$toast.error('登录过期，请重新登录')
        store.commit('SET_STATE', { user: null })
        setTimeout(_ => {
          redirect(`/signin?from=${route.fullPath}`)
        }, 1000)
        break
      case 404:
        app.$toast.error('网络请求不存在')
        break
      default:
        app.$toast.error(error.response.data.error_msg)
    }
    return Promise.reject(error.response)
  }
}

export default function ({ $axios, app, store, redirect, route }) {
  $axios.onRequest(
    config => {
      console.log('Making request to ' + config.url)
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )

  $axios.onResponse(
    response => {
      if (response.status === 200) {
        return Promise.resolve(response)
      } else {
        return Promise.reject(response)
      }
    },
    error => handleError(error, app, store, redirect, route)
  )

  $axios.onError(error => handleError(error, app, store, redirect, route))
}
