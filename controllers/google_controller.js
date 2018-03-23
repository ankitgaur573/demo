var google = require('./../google/google.js');

var GoogleController = function (cntrls, models) {
    return {

        geocode: function (req, res) {
            var address = req.params.address;
            google.getGeoCode(address, function handleResponse(error, geocode) {
                if (error){
                    res.status(400).send({error: error});
                } else {
                    console.log(geocode);
                    res.status(200).send({geocode: geocode});
                }
            });

        },

        getDetails: function (req, res) {
            var placeId = req.params.placeId;
            google.details(placeId, function handleResponse(error, details) {
                if(error){
                    res.status(400).send({error: error});
                } else {
                    res.status(200).send({detail: details})
                }
            })
        },

        search: function (req, res) {
            var userId = req.user.id;

            // Find if such request was made by user ever before
            models.RequestSearch.findOne({where: {userId: userId, lat: req.params.lat, long: req.params.long, radius: req.params.radius, type: req.params.type}}).then(function (savedSearchRequest) {
                if (savedSearchRequest){
                    // User have made such request before so just show cached data
                    var alreadyRequestedId = savedSearchRequest.id;
                    models.SavedPlaces.findAll({where: {requestId: alreadyRequestedId}}).then(function (savedPlaces) {
                        res.status(200).send({places: savedPlaces});
                    })

                }else{
                    // show data real time
                    google.search(req.params.lat, req.params.long, req.params.radius, req.params.type, function handleResponse(error, places) {
                        if (error){
                            res.status(400).send({error: error});
                        }else {
                            res.status(200).send({places: places});

                            // save both request and data for future use
                            var requestToBeSaved = models.RequestSearch.build({
                                userId: userId,
                                lat: req.params.lat,
                                long: req.params.long,
                                radius: req.params.radius,
                                type: req.params.type
                            });
                            requestToBeSaved.save().then(function (requestSaved) {
                                var savedRequestId = requestSaved.id;
                                for(var i = 0; i < places.length; i++){
                                    places[i].requestId = savedRequestId;
                                }
                                models.SavedPlaces.bulkCreate(places);
                            });
                        }
                    });
                }
            });
        },

        addFavourite: function (req, res) {
            var placeId = req.body.placeId;
            var userId = req.user.id;
            var name = req.body.name;
            if(!placeId || !name){
                res.status(400).send({error: "Invalid request"});
            } else{
                models.UserFavourite.findOne({where: {userId: userId, placeId: placeId}}).then(function (alreadySavedFavourite) {
                    if(alreadySavedFavourite){
                        res.status(200).send({message: "Marked as favourite"});
                    } else {
                        var favouriteToBeSaved = models.UserFavourite.build({
                            userId: userId,
                            placeId: placeId,
                            name: name
                        });
                        favouriteToBeSaved.save().then(function (value) {
                            if(value){
                                res.status(200).send({message: "Marked as favourite"});
                            } else res.status(400).send({error: "Something went wrong"});
                        })
                    }
                })
            }
        },

        getFavourite: function (req, res) {
            var userId = req.user.id;
            models.UserFavourite.findAll({where: {userId: userId}}).then(function (favourites) {
                if(favourites){
                    res.status(200).send({favourites: favourites});
                } else{
                    res.status(400).send({error: "Something went wrong"});
                }
            })
        }
    }
};

module.exports = GoogleController;
