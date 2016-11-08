var express = require('express');
var router = express.Router();
var Auction = require('../models/auctionModel.js');
var User = require('../models/userModel.js');
var Inventory = require('../models/inventoryModel.js');

router.get('/', function(req, res) {
    res.send('respond with a resource');
});

router.post('/create', function (req, res) {
    try {
        var userName = req.body.name;
        var itemName = req.body.itemName;
        var itemQuantity = req.body.itemQuantity;
        var minBid = req.body.minBid;
        var startTimeStamp = req.body.startTimeStamp;
        Auction.create(itemName, itemQuantity, minBid, userName, startTimeStamp, function (err, result) {
            if (err) {
                res.send(err);
            } else if (result == 0) {
                var errObj = {
                    err: true,
                    msg: 'Auction in process. Please try later.'
                };
                res.send(errObj);
            } else {
                Auction.find(function (err, resultFound) {
                    res.send(resultFound);
                });
            }
        });
    }catch(err){
        res.send(err);
    }
});

router.post('/submit', function (req, res) {
    try {
        var userName = req.body.userName;
        var userBal = req.body.userBal;
        Auction.find(function (err, result) {
            if (err) {
                res.send(err);
            } else if (result && result.length > 0 && result[0].bidderBid && result[0].bidderName) {
                var moneyAdd = userBal + result[0].bidderBid;
                User.update(userName, moneyAdd, 'userBal', function (err, userResult1) {
                    if (err) {
                        res.send(err);
                    } else {
                        Inventory.findOne(userName, result[0].itemName, function (err, intOne) {
                            var intDed = intOne.itemQuantity - result[0].itemQuantity;
                            Inventory.update(userName, intDed, 'itemQuantity', result[0].itemName, function (err, bidderFound) {
                                if (err) {
                                    res.send(err);
                                } else {
                                    User.find(result[0].bidderName, function (err, bidderFound) {
                                        if (err) {
                                            res.send(err);
                                        } else {
                                            var moneyDed = bidderFound.userBal - result[0].bidderBid;
                                            User.update(bidderFound.userName, moneyDed, 'userBal', function (err, userResult2) {
                                                if (err) {
                                                    res.send(err);
                                                } else {
                                                    Inventory.findOne(bidderFound.userName, result[0].itemName, function (err, intTwo) {
                                                        var intAdd = intTwo.itemQuantity + result[0].itemQuantity;
                                                        Inventory.update(bidderFound.userName, intAdd, 'itemQuantity', result[0].itemName, function (err, bidderFound) {
                                                            if (err) {
                                                                res.send(err);
                                                            } else {
                                                                res.send(result);
                                                            }
                                                        });
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        });
                    }
                });
            } else {
                var errObj = {
                    err: true,
                    msg: 'No Bids found! Closing the Auction without any transaction!'
                };
                console.log(errObj);
                res.send(errObj);
            }
        });
    }catch(err){
        res.send(err);
    }
});

router.post('/bidAuction', function (req, res) {
    try {
        var itemName = req.body.itemName;
        var bidderName = req.body.bidderName;
        var bidderBid = req.body.bidderBid;
        Auction.find(function (err, result) {
            if (err) {
                res.send(err);
            } else if (result && result.length > 0) {
                var bidComp;
                if (result[0].bidderBid) {
                    bidComp = result[0].bidderBid;
                } else {
                    bidComp = 0;
                }
                if (bidComp < bidderBid) {
                    Auction.update(itemName, bidderName, bidderBid, function (err, resultFound) {
                        res.send("Bid Posted!");
                    });
                } else {
                    res.send("Bid Posted!");
                }
            } else {
                res.send("No Item to bid for!");
            }
        });
    }catch(err){
        res.send(err);
    }
});

router.get('/find', function (req, res) {
    try {
        Auction.find(function (err, result) {
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

router.get('/deleteAuction/:itemName', function (req, res) {
    try {
        var itemName = req.params.itemName;
        Auction.delete(itemName, function (err, result) {
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
