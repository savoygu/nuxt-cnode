
import axios from 'axios'

const baseURL = process.env.API_BASE || ''

const parseURL = (url, params) => {
  const str = Object.keys(params).reduce((result, key) => {
    result += `${key}=${params[key]}&`; // eslint-disable-line
    return result
  }, '')
  return `${baseURL}/api${url}${str.length > 0 ? '?' : ''}${str.substr(0, str.length - 1)}`
}

export const get = (url, params) => new Promise((resolve, reject) => {
  params = params || {}
  axios.get(parseURL(url, params))
    .then((res) => {
      const { data } = res
      if (data && data.success === true) {
        resolve(data)
      } else {
        reject(data)
      }
    })
    .catch(reject)
})

export const post = (url, params, data) => new Promise((resolve, reject) => {
  axios.post(parseURL(url, params), data)
    .then((res) => {
      const { data: result } = res
      if (result && result.success === true) {
        resolve(result)
      } else {
        reject(result)
      }
    })
    .catch(reject)
})
