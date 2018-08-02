// import express from 'express'
// import apicache from 'apicache'

const express = require('express')
const apicache = require('apicache')

const app = express()

// https://github.com/kwhitley/apicache
app.use(apicache.middleware('15 minutes'))

// apicache.options({ debug: true })

// export default {
//   path: '/api/',
//   handler: app
// }

module.exports = {
  path: '/api/',
  handler: app
}
