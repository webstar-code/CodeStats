const proxy = requier('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/', {target: 'http://localhost:5000'}))
  app.use(proxy('/', {target: 'https://code-stats-api.vercel.app'}))

}