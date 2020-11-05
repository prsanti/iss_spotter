const request = require('request');
const IPurl = 'https://api.ipify.org?format=json';
let coordsUrl = 'http://ip-api.com/json/99.226.40.107';
let flyOverUrl = "http://api.open-notify.org/iss-pass.json?lat=43.5698&lon=-80.2421";

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request(IPurl, (error, response, body) => {
    // returns the callback function with the error, and description of null.
    if (error) return callback(error, null);

    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    // Returns the ipv4 address after it checks for any errors
    const ipv4 = JSON.parse(body).ip;
    callback(null, ipv4);
  });
};

const fetchCoordsByIP = function(coordinates, callback) {

  request(coordsUrl, (error, response, body) => {
    // returns the callback function with the error, and description of null.
    if (error) return callback(error, null);
  
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
  
    // Returns the ipv4 address after it checks for any errors
    const location = JSON.parse(body);
    const coordinates = {
      latitude: location.lat,
      longitude: location.lon
    };

    callback(null, coordinates);
  });
};

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coords, callback) {
  request(flyOverUrl, (error, response, body) => {
    // returns the callback function with the error, and description of null.
    if (error) return callback(error, null);
  
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
  
    // Returns the ipv4 address after it checks for any errors
    const flyOverTimes = JSON.parse(body).response;

    callback(null, flyOverTimes);
  });
};

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results. 
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */ 
const nextISSTimesForMyLocation = function(callback) {
  // empty for now
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};