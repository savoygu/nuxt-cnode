// 解析URL字符串的工具函数，支持链式调用
export function parseURL(urlString: string | URL) {
  let url: URL

  if (typeof urlString === 'string') {
    const parseString = urlString.split('sourceUid=')[1]
    if (parseString && parseString[0] === '#') {
      urlString = urlString.replace(parseString, parseString.replace(/^#/, '%23'))
    }
  }

  if (urlString instanceof URL) {
    url = urlString
  }
  else {
    try {
      url = new URL(urlString)
    }
    catch {
      url = new URL(urlString, 'http://dummy-base')
    }
  }

  const api = {
    addParam(key: string, value: string) {
      url.searchParams.append(key, value)
      return api
    },
    setParam(key: string, value: string) {
      url.searchParams.set(key, value)
      return api
    },
    getParam(key: string) {
      return url.searchParams.get(key)
    },
    getAllParams(key: string) {
      return url.searchParams.getAll(key)
    },
    hasParam(key: string, value?: string) {
      if (value === undefined) {
        return url.searchParams.has(key)
      }
      return url.searchParams.getAll(key).includes(value)
    },
    deleteParam(key: string, value?: string) {
      if (value === undefined) {
        url.searchParams.delete(key)
      }
      else {
        const values = url.searchParams.getAll(key)
        url.searchParams.delete(key)
        values.forEach((v) => {
          if (v !== value)
            url.searchParams.append(key, v)
        })
      }
      return api
    },
    getAllParamsObject() {
      const obj: Record<string, string | string[]> = {}
      url.searchParams.forEach((value, key) => {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          if (Array.isArray(obj[key])) {
            (obj[key] as string[]).push(value)
          }
          else {
            obj[key] = [obj[key] as string, value]
          }
        }
        else {
          obj[key] = value
        }
      })
      return obj
    },
    toString() {
      if (url.origin === 'http://dummy-base') {
        return url.pathname + url.search + url.hash
      }
      return url.toString()
    },
    getPath() {
      return url.pathname
    },
    getQueryString(encoded = false) {
      const queryString = url.search.slice(1)
      return encoded ? encodeURIComponent(queryString) : queryString
    },
    getHash() {
      return url.hash
    },
    getHost() {
      return url.host
    },
    getProtocol() {
      return url.protocol
    },
    url, // 原始URL对象
  }

  return api
}
