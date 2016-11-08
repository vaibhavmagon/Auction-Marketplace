var assert = require('chai').assert;
var Inventory = require('../models/inventoryModel.js');
var Auction = require('../models/auctionModel.js');
var User = require('../models/userModel.js');

describe("Auction", function () {
    this.timeout(30000);

    describe('Create User', function () {
        it('should create a user', function (done) {
            var userName = 'test';

            User.create(userName, function (err, user) {
                Inventory.addInitial(userName, function(err,entry){
                    assert.isNull(err);
                    assert.isNotNull(user);
                    assert.isNotNull(entry);
                    done();
                });
            });
        });
    });

    describe('Auction Tests ', function () {
        it('Check if auction exists', function (done) {
            Auction.find(function (err, auction) {
                assert.isNull(err);
                assert.isNotNull(auction);
                done();
            });
        });

        var userName2 = 'test 2';
        var userName3 = 'test 3';

        it('should create a another user', function (done) {
            User.create(userName2, function (err, user) {
                Inventory.addInitial(userName2, function(err,entry){
                    assert.isNull(err);
                    assert.isNotNull(user);
                    assert.isNotNull(entry);
                    done();
                });
            });
        });

        it('should create a third user', function (done) {
            User.create(userName3, function (err, user) {
                Inventory.addInitial(userName3, function(err,entry){
                    console.log(entry,user);
                    assert.isNull(err);
                    assert.isNotNull(user);
                    assert.isNotNull(entry);
                    done();
                });
            });
        });

        var userDetails = {
            userName : 'test'
        };

        it('Create an auction', function (done) {
            User.find(userDetails.userName,function (err, user) {
                assert.isNull(err);
                assert.isNotNull(user);

                Inventory.find(userDetails.userName,function (err, details) {
                    assert.isNull(err);
                    assert.isNotNull(details);

                    Auction.create(details[0].itemName, details[0].itemQuantity,user.userBal,user.userName,new Date().getTime(),function (err, auction) {
                        assert.isNull(err);
                        assert.isNotNull(auction);
                        done();
                    });
                });
            });
        });

        it('Bid for Auction by second user', function (done) {
            Auction.find(function (err, auction) {
                assert.isNull(err);
                assert.isNotNull(auction[0]);
                Auction.update(auction[0].itemName,userName2,1500, function(err,entry){
                    assert.isNull(err);
                    assert.isNotNull(entry);
                    done();
                });
            });
        });

        it('Bid for Auction by third user', function (done) {
            Auction.find(function (err, auction) {
                assert.isNull(err);
                assert.isNotNull(auction[0]);
                Auction.update(auction[0].itemName,userName3,1500, function(err,entry){
                    assert.isNull(err);
                    assert.isNotNull(entry);
                    done();
                });
            });
        });
    });

    describe('Clear Db', function () {
        it('should delete tables', function (done) {
            User.deleteAll(function (err, user) {
                assert.isNull(err);
                Inventory.deleteAll(function (err, inventory) {
                    assert.isNull(err);
                    Auction.deleteAll(function (err, auction) {
                        assert.isNull(err);
                        done();
                    });
                });
            });
        });
    });
});

