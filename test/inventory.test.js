var assert = require('chai').assert;
var Inventory = require('../models/inventoryModel.js');
var Auction = require('../models/auctionModel.js');
var User = require('../models/userModel.js');

describe("Inventory", function () {
    this.timeout(30000);

    describe('Inventory entries', function () {
        var userName = 'test';
        it('should create a user', function (done) {
            User.create(userName, function (err, user) {
                Inventory.addInitial(userName, function(err,entry){
                    assert.isNull(err);
                    assert.isNotNull(user);
                    assert.isNotNull(entry);
                    done();
                });
            });
        });

        it('Check Inventories', function (done) {
            Inventory.find(userName, function(err,entry){
                assert.isNull(err);
                assert.isNotNull(entry);
                assert.deepEqual("Bread",entry[0].itemName);
                assert.deepEqual(30,entry[0].itemQuantity);
                assert.deepEqual("Carrot",entry[1].itemName);
                assert.deepEqual(18,entry[1].itemQuantity);
                assert.deepEqual("Diamond",entry[2].itemName);
                assert.deepEqual(1,entry[2].itemQuantity);
                done();
            });
        });
    });

    describe('Clear Db', function () {
        it('should delete tables', function (done) {
            User.deleteAll(function (err, user) {
                assert.isNull(err);
                Inventory.deleteAll(function (err, user) {
                    assert.isNull(err);
                    done();
                });
            });
        });
    });
});

