var express = require('express');
var router = express.Router();
var User = require('../models/userModel.js');
var Inventory = require('../models/inventoryModel.js');

module.exports = function(io,gObj) {

    router.get('/', function (req, res) {
        res.send('respond with a resource');
    });

    router.get('/create/:name', function (req, res) {
        try {
            console.log(req.params.name);
            var userName = req.params.name;
            var obj = new Object();
            User.create(userName, function (err, result) {
                if (err) {
                    res.send(err);
                }
                if (result['newUser'] == 1) {
                    console.log(gObj);
                    Inventory.addInitial(userName, function (err, invResult) {
                        User.find(userName, function (err, userFound) {
                            res.send(userFound);
                        });
                    });
                } else {
                    gObj.socket.on('connected', function (ele) {
                        console.log("connected",ele.nameFrom);
                        obj[ele.nameFrom] = gObj.socket.id;
                        console.log(obj);
                        res.send(result);
                    });
                }
            });
        } catch (err) {
            console.log(err);
            res.send(err);
        }
    });

    router.get('/find/:name', function (req, res) {
        try {
            var userName = req.params.name;
            User.find(userName, function (err, result) {
                if (err) {
                    res.send(err);
                }
                res.send(result);
            });
        } catch (err) {
            res.send(err);
        }
    });

    router.get('/logout/:name', function (req, res) {
        try {
            var userName = req.params.name;
            var isLoggedIn = false;
            User.update(userName, isLoggedIn, 'isLoggedIn', function (err, result) {
                if (err) {
                    res.send(err);
                }
                res.send(result);
            });
        } catch (err) {
            res.send(err);
        }
    });

    return router;
};

