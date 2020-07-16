const request = require('postman-request');

const forecast = ({longitude,latitude},callback) => {
  const URL =` http://api.weatherstack.com/current?access_key=f3179a1aeeed0a7d59bae564a369b6f6&query=${latitude},${longitude}`;

  request({url:URL,json:true},(error,response,body) => {
    if(error){
      callback('Unable to connect to weather service!',undefined)
    }else if(body.error){
      callback('Unable to find location1',undefined)
    }else{
      callback(undefined,`${body.current.weather_descriptions}.  It is currentiy ${body.current.temperature} degress out. It feels like ${body.current.feelslike} degress out `)
    }
  })

};

module.exports = forecast;


