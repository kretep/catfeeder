const os = require('os');
const express = require('express');
const utils = require('./core/utils');
const commands = require('./core/commands');

// Initialize core logic
commands.initialize();

// Set up web server
const app = express();
const port = 4040;

app.use('/feed', (req, res, next) => {
  commands.feed();
  res.end();
});

app.use('/shake', (req, res, next) => {
  commands.shake();
  res.end();
});

app.use('/snapshot', (req, res, next) => {
  commands.takeSnapshot();
  res.end();
});

app.use('/uptime', (req, res, next) => {
  res.send(utils.formatTimeDuration(os.uptime()));
});

app.use('/log', (req, res, next) => {
  const logger = commands.getLogger();
  res.send(logger.getLog());
})

app.use('/settings', (req, res, next) => {
  const settings = commands.getSettings();
  res.send(settings);
})

app.use(express.static('public'));

app.listen(port, () => console.log(`catfeeder listening on port ${port}!`));
