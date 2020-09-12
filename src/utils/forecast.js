const request = require("request");



const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=baca8f556d1fcb3f3f9ba596c731efe2&%20query=${latitude},${longitude}`;

    request({ url: url, json: true }, (error, response) => {
    if (error) {
        callback("Unable to connect to weather service.", undefined);
    } else if (response.body.error) {
        callback("Unable to find location", undefined);
    } else {
        callback(undefined, 
        `${response.body.current.weather_descriptions[0]}. It is currently ${response.body.current.temperature} degrees out but it feels like ${response.body.current.feelslike}`
    );
    }
  });
}





module.exports = forecast