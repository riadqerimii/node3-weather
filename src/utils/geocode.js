const request = require("request");

const geocode = (address, callback) => {
  console.log(address, callback, "test");
  const url =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    encodeURIComponent(address) +
    "&limit=1&appid=23f34cf4f94768d7c9f5fbdaf0a71c03&fbclid=IwAR1hs6rLfO3JMpoTt8G3VqRx6S6uVjFHuM_kdqMcLTlbXlR3ic5Pe-gXq1c";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (body.length === 0) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      callback(undefined, {
        latitude: body[0].lat,
        longitude: body[0].lon,
        location: body[0].local_names.en,
      });
    }
  });
};
module.exports = geocode;
