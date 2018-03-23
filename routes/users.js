var Express = require('express'),
    Router = Express.Router();

module.exports = function(cntrls, models) {
    Router.post('/registerapi', cntrls.UserController(cntrls, models).register);
    Router.post('/loginapi', cntrls.UserController(cntrls, models).login);
    return Router;
};


