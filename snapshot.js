const fs = require('fs');

const takeSnapshot = () => {
  const file = "stream_" + new Date().toISOString() + ".jpg";
  fs.copyFile('public/stream.jpg', "public/" + file, (err) => err ? console.log:void(0));
  return file;
}

module.exports = {
  takeSnapshot
}
