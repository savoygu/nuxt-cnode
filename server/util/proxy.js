const axios = require('axios')
const queryString = require('query-string')

const baseURL = 'https://cnodejs.org/api/v1'

module.exports = function (req, res, next) {
  const path = req.path
  const user = req.session.user || {}
  const needAccessToken = req.query.needAccessToken

  console.log(user)

  if (needAccessToken && !user.accesstoken) {
    res.status(401).send({
      success: false,
      error_msg: '你需要先进行登录'
    })
  }

  const query = Object.assign({}, req.query, {
    accesstoken: (needAccessToken && req.method === 'GET') ? user.accesstoken : ''
  })

  if (query.needAccessToken) {
    delete query.needAccessToken
  }

  axios(`${baseURL}${path}`,
    {
      method: req.method,
      params: query,
      data: queryString.stringify(Object.assign({}, req.body, {
        accesstoken: (needAccessToken && req.method === 'POST') ? user.accesstoken : ''
      })),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then(response => {
      if (response.status === 200) {
        res.send(response.data)
      } else {
        res.status(response.status).send(response.data)
      }
    })
    .catch(err => {
      if (err.response) {
        res.status(500).send(err.response.data)
      } else {
        res.status(500).send({
          success: false,
          error_msg: '未知错误'
        })
      }
    })
}
