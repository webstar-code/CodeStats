const router = require('express').Router();
const axios = require('axios').default;

router.get('/api/user/all_time_since_today', (req, res) => {
  const config = {
    method: 'get',
    url: 'https://wakatime.com/api/v1/users/current/all_time_since_today',
    headers: {
      'Authorization': 'Bearer ' + req.headers['token']
    }
  };
  axios(config)
    .then(response => res.send(response.data))
    .catch(err => res.status(401).send(err));

})


module.exports = {
  alltime_stats: router
}