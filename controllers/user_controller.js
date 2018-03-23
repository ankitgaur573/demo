var bcrypt = require('bcrypt');
var jwt= require("jsonwebtoken");
var config    = require(__dirname + '/../config/default.json');

var UserController = function (cntrls, models) {

    return {
        register: function (req, res) {
            var bodyParams = req.body,
                name = req.body.name,
                email = req.body.email,
                password = req.body.password;

            models.Users.findOne({where: {email: email}}).then(function (user) {

                if (user) {
                    res.status(403).send({ error: "User with specified email already exists" });
                }
                else {
                    if (name && email && password) {
                        var hash = bcrypt.hashSync(req.body.password, 10);
                        var newUser = models.Users.build({
                            name: name,
                            email: email,
                            password: hash
                        });
                        newUser.save();
                        var token=jwt.sign(newUser.dataValues ,config.JWTSECRET,{
                            expiresIn:'24h'
                        });
                        res.status(201).send({token: token, message: "Registered Successfully"});
                    } else {
                        res.status(406).send({ error: "missing data" });
                        // res.render('Register', { message: 'Something missing' });
                    }
                }
            });
        },

        login: function (req, res) {
            var bodyParams = req.body,
                name = req.body.name,
                email = req.body.email,
                password = req.body.password;
            models.Users.findOne({where: {email: email}}).then(function (user) {
                if (user) {
                    bcrypt.compare(password, user.password, function(err, ress) {
                        if(!ress){
                            res.status(406).send({ error: "Email and Password does not match." });
                        }else{
                            var token=jwt.sign(user.dataValues ,config.JWTSECRET,{
                                expiresIn:'24h'
                            });
                            res.status(200).send({token: token, message: "Logged In Successfully"});
                        }
                    });
                }
                else {
                    res.status(406).send({ error: "Email does not Exist." });
                }
            });
        }
    }
};

module.exports = UserController;
