const utils = require('./utils');
const logger = require('./logger');
const motor = require('./motor');
const schedule = require('./schedule');

let settings;

const initialize = () => {
  settings = utils.loadJSON('settings.json');
  logger.loadLog();
  motor.initialize();
  schedule.initialize();
}

const getSettings = () => settings;

const getLogger = () => logger;

const feed = (source) => {
  motor.feed();
  logger.appendLog('FEED');
}

const vibrate = (source) => {
  motor.vibrate();
  logger.appendLog('vibrate');
}

Object.assign(module.exports,
  { initialize, getSettings, getLogger, feed, vibrate });
