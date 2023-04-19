const request = require("request");

const getGeoCode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYWxleG5vcmNoIiwiYSI6ImNsZ2RoMnEwZTBua2szZW8wa2M5aTllYTcifQ.PtJ7UQYVoKb4kFaR0ie58g&limit=1`;

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback("Unable to connect to the weather upp", undefined);
    } else if (body.features.length === 0) {
      callback('"Unable to find the location"', undefined);
    } else {
      return callback(undefined, {
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = getGeoCode;
