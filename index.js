// index.js
const { nextISSTimesForMyLocation } = require('./iss');

const printPassTimes = function(passTimes) {
  for (const times of passTimes) {
    const dateTime = new Date(0);
    dateTime.setUTCSeconds(times.risetime);

    const duration = times.duration;

    console.log(`Next pass at ${dateTime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) return console.log("It didn't work!", error);
  
  printPassTimes(passTimes);
});