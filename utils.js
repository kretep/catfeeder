const fs = require('fs');

const loadJSON = (path, defaultObject = {}) => {
  let log = defaultObject;
  try {
    let rawdata = fs.readFileSync(path);
    log = JSON.parse(rawdata);
  } catch(err) {
    console.log(err);
  }
  return log;
}

module.exports = {
  loadJSON
}
