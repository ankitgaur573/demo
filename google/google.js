var request = require("request");
var config = require("./../config/default.json");
var requestMaker = request.defaults({
    proxy: null
});

var googleModule = {

    getGeoCode: function(address, callback) {
        try {
            requestMaker('https://maps.googleapis.com/maps/api/geocode/json?address='+address+'&key='+config.key, function (error, response) {
                if(error){
                    callback(error, null)
                }
                else if(response.statusCode === 200) {
                    if(response.body){
                        var body = JSON.parse(response.body);
                        if(body.results.length === 0){
                            callback("No results found", null)
                        }else{
                            callback(null, body.results[0].geometry.location)
                        }
                    }else{
                        callback("something went wrong", null)
                    }
                }else {
                    callback("something went wrong", null)
                }
            });
        }catch (e) {
            console.log(e);
        }
    },

    search: function(lat, long, radius, type, callback) {
        try {
            requestMaker('https://maps.googleapis.com/maps/api/place/nearbysearch/json?key='+config.key+'&location='+lat+','+long+'&radius='+radius+'&type='+type, function (error, response) {
                if(error){
                    callback(error, null)
                }
                else if(response.statusCode === 200) {
                    if(response.body){
                        var body = JSON.parse(response.body);
                        if(body.results.length === 0){
                            callback("No results found", null)
                        }else{
                            var places = [];
                            body.results.map((item) => {
                                places.push({
                                    placeId: item.id,
                                    address: item.vicinity,
                                    icon: item.icon || null,
                                    name: item.name
                            });
                        });
                            callback(null, places);
                        }
                    }else{
                        callback("something went wrong", null)
                    }
                }else {
                    callback("something went wrong", null)
                }
            });
        }catch (e) {
            console.log(e);
        }
    }
};

module.exports = googleModule;