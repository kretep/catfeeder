const schedule = require('node-schedule');
const commands = require('./commands');

const scheduledJobs = [];
let count = 0;
let timeout;

const executeFeedCycles = () => {
  commands.feed();

  // Wait a bit between multiple feeds
  timeout = setInterval(() => {
    count--;
    if (count > 0) {
      commands.feed();
    }
    else {
      clearInterval(timeout);

      // Finally, wait another bit and take a snapshot
      timeout = setTimeout(commands.takeSnapshot, 10 * 1000);
    }
  }, 1500);
}

const checkSchedule = (scheduleItem) => {
  // Do not proceed if schedule is not enabled
  let settings = commands.getSettings();
  if (settings.scheduleEnabled !== true) { // also covers undefined
    return;
  }

  let logger = commands.getLogger();

  // Determine start and end times to check log
  const duration = scheduleItem['min-hours-without-food'];
  const endTime = new Date();
  const startTime = new Date(endTime.getTime() - duration * 60 * 60 * 1000);
  console.log('Checking feeding period', startTime, endTime);

  // Find any matching feed events in the log
  const feedEntry = logger.getLog().find(entry => {
    const entryTime = Date.parse(entry.time);
    return (entryTime >= startTime && entryTime <= endTime && entry.message === "feed");
  });

  // If no feed entries were found in log, execute feed command n times
  console.log("Fed at:", feedEntry);
  if (feedEntry === undefined) {
    logger.appendLog({message: `scheduled check found no previous feed event; feeding`});
    count = parseInt(scheduleItem['feed-count']);
    executeFeedCycles();
  }
  else {
    const time = feedEntry.time.slice(11, 16);
    logger.appendLog({message: `scheduled check found previous feed event at ${time}; not feeding`});
  }
}

const initialize = () => {
  let settings = commands.getSettings();
  if (settings.schedule === undefined) {
    return;
  }
  settings.schedule.forEach(item => {
    const s = item['feed-at'].split(':');
    const [hour, minute] = s.map(e => parseInt(e));
    scheduledJobs.push(schedule.scheduleJob(
      {hour, minute},
      checkSchedule.bind(this, item)
    ));
    console.log(`Added scheduled feed for ${hour}:${minute}`);
  });
}

module.exports = {
  initialize
}
