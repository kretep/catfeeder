const express = require('express');
const os = require('os');
const Gpio = require('pigpio-mock').Gpio;
const log = require('./log');

const app = express();
const port = 4040;


function format(seconds){
  function pad(s){
    return (s < 10 ? '0' : '') + s;
  }
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);

  return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
}

function sleep(millis) {
  return new Promise(resolve => setTimeout(resolve, millis));
}

// Load log
log.loadLog();

// Set up GPIO
const servo = new Gpio(4, {mode: Gpio.OUTPUT});

// Make sure to properly release on exit
process.on('SIGINT', () => {
  servo.digitalWrite(0);
  process.exit();
});


// 700 -> 2400
async function feed() {
  servo.servoWrite(2400);
  await sleep(400);
  servo.servoWrite(700);
}

app.use('/feed', (req, res, next) => {
  feed();
  log.appendLog('FEED');
  res.end();
});

async function vibrate() {
  for (let i=0; i < 3; i++) {
    servo.servoWrite(1100);
    await sleep(100);
    servo.servoWrite(700);
    await sleep(100);
  }
}

app.use('/vibrate', (req, res, next) => {
  vibrate();
  log.appendLog('Vibrate');
  res.end();
});

app.use('/uptime', (req, res, next) => {
  res.send(format(os.uptime()));
});

app.use('/log', (req, res, next) => {
  res.send(log.getLog());
})

app.use(express.static('public'));

app.listen(port, () => console.log(`catfeeder listening on port ${port}!`));


