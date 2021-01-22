const router = require('express').Router();
const axios = require('axios').default;

router.get('/api/user/data_dumps', async (req, res) => {
  const config = {
    method: 'GET',
    url: 'https://wakatime.com/api/v1/users/current/data_dumps',
    headers: {
      'Authorization': 'Bearer ' + req.headers['token']
    },
  };

  const resx = await axios(config).catch(err => res.status(401).send(err));

  console.log(resx.data);
  if (!resx.data.data.length != 0) {
    res.send({ message: "Cannot import at the moment! Please try later." });
  } else {
    const url = resx.data.data[0].download_url;
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream'
    }).catch(err => res.status(401).send(err));

    response.data.pipe(res)
  }
})


module.exports = {
  data_dumps: router
}