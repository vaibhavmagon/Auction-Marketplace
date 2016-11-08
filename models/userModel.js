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
    create: function (name, cb) {
        try {
            pool.getConnection(function (err, dbConn) {
                var sql = 'SELECT * FROM user WHERE userName = ' + dbConn.escape(name);
                dbConn.query(sql, function (err, result) {
                    if (err) {
                        dbConn.release();
                        return cb(err);
                    } else {
                        if (result && result.length == 0) {
                            var ctxObj = {userName: name, userBal: 1000, isLoggedIn: true};
                            dbConn.query('INSERT INTO user SET ?', ctxObj, function (err, newResult) {
                                if (err) {
                                    return cb(err);
                                }
                                dbConn.release();
                                newResult['newUser'] = 1;
                                return cb(null, newResult);
                            });
                        } else {
                            dbConn.release();
                            return cb(null, result[0]);
                        }
                    }
                });
            });
        }catch(err){
            return cb(err);
        }
    },
    find: function (name, cb) {
        try {
            pool.getConnection(function (err, dbConn) {
                var sql = 'SELECT * FROM user WHERE userName = ' + dbConn.escape(name);
                dbConn.query(sql, function (err, result) {
                    if (err) {
                        dbConn.release();
                        return cb(err);
                    } else {
                        dbConn.release();
                        return cb(null, result[0]);
                    }
                });
            });
        }catch(err){
            return cb(err);
        }
    },
    update: function (userName, fieldValue, fieldName, cb) {
        try {
            pool.getConnection(function (err, dbConn) {
                var obj = {};
                obj['' + fieldName + ''] = fieldValue;
                dbConn.query('UPDATE user SET ? WHERE userName = ?', [obj, userName], function (err, result) {
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
                dbConn.query('DELETE FROM user WHERE userName = ?', [itemName], function (err, result) {
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
                dbConn.query('TRUNCATE user', function (err, result) {
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
