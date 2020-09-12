const request = require("request")

const geoCode = (address, callback) => {
  const url1 =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=pk.eyJ1Ijoic2xtc2hhZHk1MzkiLCJhIjoiY2tlOXd1bm95MmIxOTJybXM1cWN5M2I5dSJ9.cEvyfS16YExCEyOq-TNVmg&limit=1";

  request({ url: url1, json: true }, (error, response) => {
    if (error) {
      callback("Internet is not working.", undefined);
    } else if (response.body.features.length === 0) {
      callback("Please be a little more specific", undefined);
    } else {
      callback(undefined, {
        Latitude: response.body.features[0].center[1],
        Longitude: response.body.features[0].center[0],
        Location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geoCode