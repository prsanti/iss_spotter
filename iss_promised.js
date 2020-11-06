const request = require('request-promise-native');

const IPurl = 'https://api.ipify.org?format=json';

const fetchMyIP = () => {
  return request(IPurl);
};

const fetchCoordsByIP = (body) => {
  const ip = JSON.parse(body).ip;
  return request(`http://ip-api.com/json/${ip}`);
};

const fetchISSFlyOverTimes = (body) => {
  const lat = JSON.parse(body).lat;
  const lon = JSON.parse(body).lon;

  const coordinates = {
    latitude: lat,
    longitude: lon
  }
  const url = `http://api.open-notify.org/iss-pass.json?lat=${coordinates.latitude}&lon=${coordinates.longitude}`;
  return request(url);
};

const nextISSTimesForMyLocation = (body) => {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    })
};

module.exports = { nextISSTimesForMyLocation };