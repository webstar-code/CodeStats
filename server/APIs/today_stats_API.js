const router = require('express').Router();
const axios = require('axios').default;

router.get('/api/user/today_stats', (req, res) => {
  const date = req.query.date;
  const config = {
    method: 'get',
    url: `https://wakatime.com/api/v1/users/current/durations?date=${date}`,
    headers: {
      'Authorization': 'Bearer ' + req.headers['token']
    }
  };
  axios(config)
    .then(response => {
      let data = formatData(response.data);
      res.send(data);
    })
    .catch(err => res.status(401).send(err));

})

function formatData(data) {
  let grand_total;
  let projects = [];
  let localdata = [];
  data.data.forEach((item, index) => {
    if (!projects.includes(item.project)) {
      projects.push(item.project);
    }
  })
  projects = projects.map((item) => data.data.filter((e) => e.project == item));
  projects = projects.map((e) => {
    return e.reduce((total = { duration: 0, project: "" }, el) => ({ duration: el.duration + total.duration, project: el.project }))
  }
  );
  grand_total = { total_seconds: projects.map(e => e.duration).reduce((t, e) => t + e) }
  let date = new Date(data.end);
  date = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
    .toISOString()
    .split("T")[0];

  localdata = {
    date,
    grand_total,
    projects
  }
  return localdata;
}


// Run  every hour
setInterval(() => {
  if (new Date().getUTCMinutes() == 17) {
    let date = new Date();
    date = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
      .toISOString()
      .split("T")[0];
    console.log(date);
    PostData(date)
  }
}, 3600000);


function PostData(date) {

  firebase.firestore().collection('users').get().then(docs => {
    docs.forEach(doc => {
      const user = doc.data();
      // console.log(user);
      if (user.token) {
        const config = {
          method: 'get',
          url: `https://wakatime.com/api/v1/users/current/durations?date=${date}`,
          headers: {
            'Authorization': 'Bearer ' + user.token
          }
        };

        axios(config)
          .then(response => {
            let { date, grand_total } = formatData(response.data);
            data = { date, grand_total };
            console.log(data);
            firebase.firestore().collection(user.userid).doc('days').update({
              days: firebase.firestore.FieldValue.arrayUnion(data)
            })
              .then(() => console.log("Added document"));
          })
          .catch(err => res.status(401).send(err));

      }
    })
  })
}


module.exports = {
  today_stats: router
}

