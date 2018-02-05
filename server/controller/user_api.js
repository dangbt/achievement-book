var dataUser = require('./data_user');

module.exports = {
    login: function(req, res){
        try {
            var { username, password } = req.body;
            dataUser.findUser({ username: username }, function (err, data) {
                if (err) {
                    res.status(500).end(err);
                }
                else {
                    if (data.length <= 0) {
                        res.status(404).end('User not found');
                    }
                    else {
                        var User = require('../models/user');
                        var user = new User(data[0]);
                        user.verifyPassword(password, function(err, valid){
                            if (err) {
                                res.status(500).end(err);
                                return;
                            }
                            if (valid) {
                                req.session.regenerate(function () {
                                    req.session.user = {
                                        username: user.username
                                    }
                                    res.status(200).end('Logged in successfully');
                                })
                            }
                            else {
                                res.status(401).end('Incorrect password');
                            }
                        })
                    }
                }
            })
        } catch (err) {
            res.status(500).end(err);
        }
        
    },

    logout: function(req, res){
        try {
            req.session.destroy(function(err){
                if (err) {
                    res.status(500).end(err);
                }
                else {
                    res.status(200).end('Logged out successfully');
                }
            })
        } catch (error) {
            
        }
    },

    authenticate: function(req, res, next){
        if (req.session.user){
            next();
        }
        else {
            res.status(401).end('No permission, must login');
        }
    },

    checkAuthenticate: function(req, res){
        if (req.session.user){
            res.status(200).end('Logged in');
        }
        else {
            res.status(401).end('Not logged in');
        }
    }
}