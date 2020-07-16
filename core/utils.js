const fs = require('fs');

const loadJSON = (path, defaultObject = {}) => {
  let obj = defaultObject;
  try {
    let rawdata = fs.readFileSync(path);
    obj = JSON.parse(rawdata);
  } catch(err) {
    console.log(err);
  }
  return obj;
}

const saveJSON = (path, obj) => {
  try {
    let rawdata = JSON.stringify(obj);
    fs.writeFileSync(path, rawdata);
  } catch(err) {
    console.log(err);
  }
}

const formatTimeDuration = (seconds) => {
  function pad(s){
    return (s < 10 ? '0' : '') + s;
  }
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);

  return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
}

module.exports = {
  loadJSON, saveJSON, formatTimeDuration
}
