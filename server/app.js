const path = require('path')
const fs = require('fs')

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const session = require('express-session')

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
  maxAge: 10 * 60 * 1000,
  name: 'CNode',
  resave: false,
  saveUninitialized: false,
  secret: 'Nuxt-CNode'
}))

app.use('/api/user', require('./util/handle-login'))
app.use('/api', require('./util/proxy'))

app.use(function (error, req, res, next) {
  console.log(error)
  res.status(500).send(error)
})

// const host = process.env.HOST || '0.0.0.0'
// const port = process.env.PORT || 3333
// app.listen(port, host, () => {
//   console.log('Server started on 3333')
// })

module.exports = {
  path: '/',
  handler: app
}
