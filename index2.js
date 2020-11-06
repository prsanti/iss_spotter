const { nextISSTimesForMyLocation} = require('./iss_promised');

const printPassTimes = function(passTimes) {
  for (const times of passTimes) {
    const dateTime = new Date(0);
    dateTime.setUTCSeconds(times.risetime);

    const duration = times.duration;

    console.log(`Next pass at ${dateTime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("Error: ", error.message);
  })