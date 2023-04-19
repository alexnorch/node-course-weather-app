const request = require("request");

const forecast = (longitude, latitude, callback) => {
  const apiKey = "09b74568f29044e589273701231204";
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude}, ${longitude}`;

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback("Unable to connect to the app", undefined);
    } else if (body.error) {
      callback(body.error.message, undefined);
    } else {
      const { temp_c, feelslike_c } = body.current;
      callback(
        undefined,
        `It is currently ${temp_c} degrees out. It feels like ${feelslike_c} degrees out`
      );
    }
  });
};

module.exports = forecast;
