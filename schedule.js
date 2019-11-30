const schedule = require('node-schedule');

const scheduledJobs = [];

const checkSchedule = (scheduleItem, log) => {

  // Determine start and end times to check log
  const duration = scheduleItem['min-hours-without-food'];
  const endTime = new Date();
  const startTime = new Date(endTime.getTime() - duration * 60 * 60 * 1000);
  console.log('checking', startTime, endTime);

  // Find any matching feed events in the log
  const hasBeenFed = log.some(entry => {
    const entryTime = Date.parse(entry.time);
    return (entryTime >= startTime && entryTime <= endTime && entry.message === "FEED");
  });

  // If no feed entries were found in log, execute feed command n times
  console.log("fed:", hasBeenFed);
  if (!hasBeenFed) {
    const n = parseInt(scheduleItem['feed-count']);
  }
}

const initialize = (settings, log) => {
  settings.schedule.forEach(item => {
    const s = item['feed-at'].split(':');
    const [hour, minute] = s.map(e => parseInt(e));
    scheduledJobs.push(schedule.scheduleJob(
      {hour, minute},
      checkSchedule.bind(this, item, log)
    ));
    console.log(`Added scheduled feed for ${hour}:${minute}`);
  });
  checkSchedule(settings.schedule[0], log);
}

module.exports = {
  initialize
}
