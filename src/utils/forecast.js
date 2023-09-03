const request = require("request");
const forecast = (latitude, longitude, callback) => {
  // console.log(latitude, longitude, callback);
  const url =
    "http://api.weatherstack.com/current?access_key=a855768770952a041d472d7306a7668b&query=" +
    latitude +
    "," +
    longitude;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect to weather service! ", undefined);
    } else if (body.error) {
      // console.log(callback);
      // callback("unable to find location", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          ". It is currently " +
          body.current.temperature +
          " degres out. it feels like  " +
          body.current.feelslike +
          " degres out."
      );
    }
  });
};

// forecast(42.3702, 21.1483, (error, data) => {
//   console.log(data);
// });

module.exports = forecast;
