const os = require('os');
const express = require('express');
const log = require('./log');
const utils = require('./utils');
const motor = require('./motor');


// Initialize
let settings = utils.loadJSON('settings.json');
log.loadLog();
motor.initialize();


const app = express();
const port = 4040;

app.use('/feed', (req, res, next) => {
  motor.feed();
  log.appendLog('FEED');
  res.end();
});

app.use('/vibrate', (req, res, next) => {
  motor.vibrate();
  log.appendLog('Vibrate');
  res.end();
});

app.use('/uptime', (req, res, next) => {
  res.send(utils.formatTimeDuration(os.uptime()));
});

app.use('/log', (req, res, next) => {
  res.send(log.getLog());
})

app.use('/settings', (req, res, next) => {
  res.send(settings);
})

app.use(express.static('public'));

app.listen(port, () => console.log(`catfeeder listening on port ${port}!`));

