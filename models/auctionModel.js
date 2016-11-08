var mysql = require('mysql');
var Config = require('../config.js');
var configObj = new Config();

var pool = mysql.createPool({
    connectionLimit: configObj.mysqlConf.connectionLimit,
    host: configObj.mysqlConf.host,
    user: configObj.mysqlConf.user,
    port: configObj.mysqlConf.port,
    password: configObj.mysqlConf.password,
    database: configObj.mysqlConf.database,
    multipleStatements: configObj.mysqlConf.multipleStatements
});

module.exports = {
    update: function (itemName,bidderName, bidderBid,cb) {
        try {
            pool.getConnection(function (err, dbConn) {
                dbConn.query('UPDATE auction SET ? WHERE itemName = ?', [
                    {bidderBid: bidderBid, bidderName: bidderName},
                    itemName
                ], function (err, result) {
                    if (err) {
                        dbConn.release();
                        return cb(err);
                    } else {
                        dbConn.release();
                        return cb(null, result);
                    }
                });
            });
        }catch(err){
            return cb(err);
        }
    },
    create: function (itemName, itemQuantity, minBid, userName,startTimeStamp, cb) {
        try {
            pool.getConnection(function (err, dbConn) {
                var sql = 'SELECT * FROM auction';
                dbConn.query(sql, function (err, result) {
                    if (err) {
                        dbConn.release();
                        return cb(err);
                    } else {
                        if (result && result.length == 0) {
                            var ctxObj = {itemName: itemName, itemQuantity: itemQuantity, minBid: minBid, userName: userName, startTimeStamp: startTimeStamp};
                            dbConn.query('INSERT INTO auction SET ?', ctxObj, function (err, newResult) {
                                if (err) {
                                    console.log(err);
                                    return cb(err);
                                }
                                dbConn.release();
                                return cb(null, newResult);
                            });
                        } else {
                            dbConn.release();
                            return cb(null, 0);
                        }
                    }
                });
            });
        }catch(err){
            return cb(err);
        }
    },
    find: function (cb) {
        try {
            pool.getConnection(function (err, dbConn) {
                var sql = 'SELECT * FROM auction';
                dbConn.query(sql, function (err, result) {
                    if (err) {
                        dbConn.release();
                        return cb(err);
                    } else {
                        dbConn.release();
                        return cb(null, result);
                    }
                });
            });
        }catch(err){
            return cb(err);
        }
    },
    delete : function(itemName, cb){
        try {
            pool.getConnection(function (err, dbConn) {
                dbConn.query('DELETE FROM auction WHERE userName = ?', [itemName], function (err, result) {
                    if (err) {
                        dbConn.release();
                        return cb(err);
                    } else {
                        dbConn.release();
                        return cb(null, result);
                    }
                });
            });
        }catch(err){
            return cb(err);
        }
    },
    deleteAll : function(cb){
        try {
            pool.getConnection(function (err, dbConn) {
                dbConn.query('TRUNCATE auction', function (err, result) {
                    if (err) {
                        dbConn.release();
                        return cb(err);
                    } else {
                        dbConn.release();
                        return cb(null, result);
                    }
                });
            });
        }catch(err){
            return cb(err);
        }
    }
};