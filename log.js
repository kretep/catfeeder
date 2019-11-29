const fs = require('fs');

let log;

const getLog = () => log;

const loadLog = () => {
  try {
    let rawdata = fs.readFileSync('log.json');
    log = JSON.parse(rawdata);
  } catch(err) {
    console.log(err);
    log = [];
  }
}

const saveLog = (log, path) => {
  try {
    fs.writeFileSync(path, JSON.stringify(log));
  }
  catch(err) {
    console.log(err);
  }
}

const appendLog = (message) => {
  const time = new Date().toISOString();
  log.push({ time, message });
  saveLog(log, 'log.json');
}

module.exports = {
  getLog, loadLog, saveLog, appendLog
}
