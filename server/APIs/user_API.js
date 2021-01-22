const router = require('express').Router();
const axios = require('axios').default;

// User
router.get('/api/user', (req, res) => {

  const config = {
    method: 'GET',
    url: 'https://wakatime.com/api/v1/users/current',
    headers: {
      'Authorization': 'Bearer ' + req.headers['token']
    }
  };
  axios(config)
    .then(response => {
      res.send(response.data)
    })
    .catch(err => res.status(401).send(err));
})

module.exports = {
  user: router
}