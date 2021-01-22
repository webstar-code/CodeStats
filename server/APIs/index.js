const router = require('express').Router();

const{ user } = require('./user_API');
const{ today_stats } = require('./today_stats_API');
const{ data_dumps } = require('./data_dump_API');
const{ alltime_stats } = require('./alltime_stats_API');

router.use('/', user);
router.use('/', today_stats);
router.use('/', data_dumps);
router.use('/', alltime_stats);


module.exports = {
  APIs: router,
}