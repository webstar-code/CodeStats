const router = require('express').Router();
const qs = require('querystring');
const axios = require('axios').default;

require('dotenv').config();

const clientId = process.env.clientId;
const clientSecret = process.env.clientSecret;
let redirect_uri = process.env.redirect_uri;
let queryparams = `client_id=${clientId}&response_type=code&redirect_uri=${redirect_uri}&scope=email,read_stats,read_logged_time`;

router.get('/auth', (req, res) => {
  res.redirect('https://wakatime.com/oauth/authorize?' + (queryparams));
})

let client_URL = `${process.env.CLIENT_PROD}/sigin` || `${process.env.CLIENT_DEV}/sigin`;

function toImport(req, res) {
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
    data : data
  };
  
  axios(config)
  .then(function (response) {
    let token = response.data.access_token;
    console.log(token);
    req.body = {token};
    return next()
  })
  .catch(err => res.status(401).send(err));
}, toImport)

router.get('/api', (req, res) => {
  res.send({token: token});
})

module.exports = {
  authRouter: router,
}
