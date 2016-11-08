var assert = require('chai').assert;
var Inventory = require('../models/inventoryModel.js');
var Auction = require('../models/auctionModel.js');
var User = require('../models/userModel.js');

describe("User", function () {
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
