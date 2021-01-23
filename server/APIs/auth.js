const router = require('express').Router();
const qs = require('querystring');
const axios = require('axios').default;

require('dotenv').config();

const clientId = process.env.clientId;
const clientSecret = process.env.clientSecret;
let redirect_uri = process.env.redirect_uri;


router.get('/auth', (req, res) => {
  if(req.get('host') == 'localhost:5000') {
    redirect_uri = 'http://localhost:5000/auth/wakatime/callback';
  }
  let queryparams = `client_id=${clientId}&response_type=code&redirect_uri=${redirect_uri}&scope=email,read_stats,read_logged_time`;
  res.redirect('https://wakatime.com/oauth/authorize?' + (queryparams));
})


function toImport(req, res) {
  let client_URL = `${process.env.CLIENT_DEV}/signin`;
  if (req.hostname != 'localhost') {
    console.log(req.hostname);
    client_URL = `${process.env.CLIENT_PROD}/signin`
  }
  res.redirect(`${client_URL}?token=${req.body.token}`)
}

router.get('/auth/wakatime/callback', async (req, res, next) => {
  

  let code = req.query.code;
  var data = qs.stringify({
    'client_id': clientId,
    'client_secret': clientSecret,
    'redirect_uri': redirect_uri,
    'grant_type': 'authorization_code',
    'code': code
  });

  var config = {
    method: 'post',
    url: 'https://wakatime.com/oauth/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: data
  };

  axios(config)
    .then(function (response) {
      let token = response.data.access_token;
      console.log(token);
      req.body = { token };
      return next()
    })
    .catch(err => res.status(401).send(err));
}, toImport)

router.get('/api', (req, res) => {
  res.send({ token: token });
})

module.exports = {
  authRouter: router,
}
