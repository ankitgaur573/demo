var Express = require('express'),
    Router = Express.Router();

module.exports = function(cntrls, models) {
    Router.get('/geocode/:address', cntrls.GoogleController(cntrls, models).geocode);
    Router.get('/search/:lat/:long/:radius/:type', cntrls.GoogleController(cntrls, models).search);
    Router.post('/favourite', cntrls.GoogleController(cntrls, models).addFavourite);
    Router.get('/favourite', cntrls.GoogleController(cntrls, models).getFavourite);
    return Router;
};
