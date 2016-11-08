var mysql = require('mysql');
var Config = require('./config.js');
var configObj = new Config();

var pool = mysql.createPool({
    connectionLimit: configObj.mysqlConf.connectionLimit,
    host: configObj.mysqlConf.host,
    user: configObj.mysqlConf.user,
    port: configObj.mysqlConf.port,
    password: configObj.mysqlConf.password,
    multipleStatements: configObj.mysqlConf.multipleStatements
});

pool.getConnection(function (err, dbConn) {
    if (err) {
        throw err;
    }else {
        console.log('Connected... Now running script to initialise database - ' + configObj.mysqlConf.database + ' & tables - user, inventory and auction');
        dbConn.query('CREATE DATABASE '+ configObj.mysqlConf.database, function (err, resultDB) {
            if (err) throw err;
            dbConn.query('USE ' + configObj.mysqlConf.database, function (err, resultUse) {
                if (err) throw err;
                dbConn.query('CREATE TABLE user( userId INT NOT NULL AUTO_INCREMENT, userName VARCHAR(100) NOT NULL, userBal INT NOT NULL, isLoggedIn BOOLEAN NOT NULL, PRIMARY KEY (userId))', function (err, result1) {
                    if (err) throw err;
                    dbConn.query('CREATE TABLE inventory( itemName VARCHAR(100) NOT NULL, itemQuantity INT NOT NULL, userName VARCHAR(100) NOT NULL)', function (err, result2) {
                        if (err) throw err;
                        dbConn.query('CREATE TABLE auction( itemName VARCHAR(100) NOT NULL, itemQuantity INT NOT NULL, userName VARCHAR(100) NOT NULL, minBid INT NOT NULL, bidderName VARCHAR(100), bidderBid INT , startTimeStamp BIGINT NOT NULL )', function (err, result3) {
                            dbConn.release();
                            if (err) throw err;
                            console.log("Tables Created. U can run the app using forever start server.js");
                            process.exit(1);
                        });
                    });
                });
            });
        });
    }
});
