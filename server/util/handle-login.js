const router = require('express').Router()
const axios = require('axios')

const baseURL = 'https://cnodejs.org/api/v1'

router.post('/login', (req, res, next) => {
  console.log(req.body.accesstoken)
  axios
    .post(`${baseURL}/accesstoken`, {
      accesstoken: req.body.accesstoken
    })
    .then(response => {
      const data = response.data
      console.log(data)
      if (response.status === 200 && data.success) {
        req.session.user = {
          accesstoken: req.body.accesstoken,
          loginname: data.loginname,
          id: data.id,
          avatarUrl: data.avatar_url
        }

        res.json({
          success: true,
          data: data
        })
      } else {
        res.status(response.status).send(response.data)
      }
    })
    .catch(err => {
      if (err.response) {
        res.status(500).send(err.response.data)
      } else {
        next(err)
      }
    })
})

router.get('/logout', (req, res, next) => {
  req.session.user = null
  res.json({
    success: true,
    data: {}
  })
})

module.exports = router
