/**
 * 已废弃，替代方案为 ~/plugins/localStorage.js
 */
import store2 from 'store2'
import { STORE_NAMESPACE } from '~/common/constants'

class Store {
  constructor(options) {
    options = options || {}
    this.namespace = options.namespace || STORE_NAMESPACE
    this.data = store2.namespace(this.namespace)
  }

  set (key, data, overwrite) {
    this.data.set(key, data, overwrite)
  }

  setAll (data, overwrite) {
    this.data.setAll(data, overwrite)
  }

  get (key, alt) {
    return this.data.get(key, alt)
  }

  getAll () {
    return this.data.getAll()
  }

  transact (key, fn, alt) {
    return this.data.transact(key, fn, alt)
  }

  clear () {
    this.data.clear()
  }

  has (key) {
    return this.data.has(key)
  }

  remove (key) {
    return this.data.remove(key)
  }

  each(fn, fill) {
    this.data.each(fn, fill)
  }

  add (key, data) {
    this.data.add(key, data)
  }

  keys (fillList) {
    return this.data.keys(fillList)
  }

  size () {
    return this.data.size()
  }

  clearAll () {
    return this.data.clearAll()
  }
}

export const store = new Store()

export default Store
