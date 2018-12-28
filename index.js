const express = require('express');
const os = require('os');
const Gpio = require('pigpio').Gpio;

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

const servo = new Gpio(4, {mode: Gpio.OUTPUT});

// 700 -> 2400
async function feed() {
  servo.servoWrite(2400);
  await sleep(400);
  servo.servoWrite(700);
}

app.use('/feed', (req, res, next) => {
  feed();
  res.end();
});

app.use('/uptime', (req, res, next) => {
  res.send(format(os.uptime()));
});

app.use(express.static('public'));

app.listen(port, () => console.log(`catfeeder listening on port ${port}!`));

process.on('SIGINT', () => {
  servo.digitalWrite(0);
  process.exit();
});
