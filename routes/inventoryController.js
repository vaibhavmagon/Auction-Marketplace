var express = require('express');
var router = express.Router();
var Inventory = require('../models/inventoryModel.js');

router.get('/', function(req, res) {
    res.send('respond with a resource');
});

router.get('/create/:name', function (req, res) {
    try {
        var userName = req.params.name;
        Inventory.create(userName, function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
        });
    }catch(err){
        res.send(err);
    }
});

router.get('/find/:name', function (req, res) {
    try {
        var userName = req.params.name;
        Inventory.find(userName, function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
        });
    }catch(err){
        res.send(err);
    }
});

router.get('/findOne/:name/:itemName', function (req, res) {
    try {
        var userName = req.params.name;
        var item = req.params.itemName;
        Inventory.findOne(userName, item, function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
        });
    }catch(err){
        res.send(err);
    }
});


module.exports = router;

