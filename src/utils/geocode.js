const request = require('postman-request');

const geocode = (address,callback) => {
  const URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiaGlrYXJ1LXNoIiwiYSI6ImNrYmY0OHF1NDA0d2sydG12NGcwb3ljMTgifQ.1O1GNsOBnIk3_MyUATTyJA&limit=1`;

  request({url:URL,json:true},(error,response,body) => {
    if(error){
      callback('Unable to connect to location services1',undefined)
    }else if(body.features.length === 0){
      callback('Unable to find location. Try another search!',undefined)
    }else{
      const [longitude,latitude] = body.features[0].center;
      const location = body.features[0].place_name;
      callback(undefined,{longitude,latitude,location})
    }
  })

};

module.exports = geocode;