const Gpio = require('pigpio').Gpio;

let servo;

const sleep = (millis) => {
  return new Promise(resolve => setTimeout(resolve, millis));
}

const initialize = () => {
  // Set up GPIO
  servo = new Gpio(4, {mode: Gpio.OUTPUT});

  // Make sure to properly release on exit
  process.on('SIGINT', () => {
    servo.digitalWrite(0);
    process.exit();
  });
}

// 700 -> 2400
const feed = async () => {
  servo.servoWrite(2400);
  await sleep(300);
  servo.servoWrite(700);
}

const shake = async () => {
  for (let i=0; i < 3; i++) {
    servo.servoWrite(1100);
    await sleep(100);
    servo.servoWrite(700);
    await sleep(100);
  }
}

module.exports = {
  initialize, feed, shake
}
