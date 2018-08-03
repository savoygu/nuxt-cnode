import Vue from 'vue'

export function host(url) {
  const host = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '')
  const parts = host.split('.').slice(-3)
  if (parts[0] === 'www') parts.shift()
  return parts.join('.')
}

export function timeAgo(time) {
  const between = (Date.now() - +new Date(time)) / 1000
  if (between < 3600) {
    return pluralize(~~(between / 60), ' 分钟前')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' 小时前')
  } else if(between < 2592000) {
    return pluralize(~~(between / 86400), ' 天前')
  } else if(between < 31536000) {
    return pluralize(~~(between / 2592000), ' 个月前')
  } else {
    return pluralize(~~(between / 31536000), ' 年前')
  }
}

function pluralize(time, label) {
  return time + label
}

const filters = {
  host,
  timeAgo
}
export default filters

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
