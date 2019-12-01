const utils = require('./utils');
const logger = require('./logger');
const motor = require('./motor');
const schedule = require('./schedule');
const snapshot = require('./snapshot');

let settings;

const initialize = () => {
  settings = utils.loadJSON('settings.json');
  logger.loadLog();
  motor.initialize();
  schedule.initialize();
}

const getSettings = () => settings;

const getLogger = () => logger;

const feed = () => {
  motor.feed();
  logger.appendLog({message: 'feed'});
  console.log('Command: feed');
}

const vibrate = () => {
  motor.vibrate();
  logger.appendLog({message: 'vibrate'});
  console.log('Command: vibrate');
}

const takeSnapshot = () => {
  const path = snapshot.takeSnapshot();
  logger.appendLog({message: 'snapshot', href: path});
  console.log('Command: snapshot');
}

Object.assign(module.exports,
  { initialize, getSettings, getLogger, feed, vibrate, takeSnapshot });
