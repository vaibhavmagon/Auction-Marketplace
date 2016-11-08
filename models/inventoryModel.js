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
    addInitial: function (name,cb) {
        try {
            pool.getConnection(function (err, dbConn) {
                var values = [
                    ['Bread', 30, name],
                    ['Carrot', 18, name],
                    ['Diamond', 1, name]
                ];
                dbConn.query('INSERT INTO inventory (itemName, itemQuantity, userName) VALUES ?', [values], function (err, result) {
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
    find: function (name,cb) {
        try {
            pool.getConnection(function (err, dbConn) {
                var sql = 'SELECT * FROM inventory WHERE userName = ' + dbConn.escape(name);
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
    findOne: function (name, itemName, cb) {
        try {
            pool.getConnection(function (err, dbConn) {
                var sql = 'SELECT * FROM inventory WHERE userName = ' + dbConn.escape(name) + ' AND itemName = ' + dbConn.escape(itemName);
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
    create: function (itemName, itemQuantity, userName, cb) {
        try {
            pool.getConnection(function (err, dbConn) {
                var sql = 'SELECT * FROM inventory WHERE userName = ' + dbConn.escape(userName);
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
    update: function (userName, fieldValue, fieldName, itemName, cb) {
        try {
            pool.getConnection(function (err, dbConn) {
                var obj = {};
                obj['' + fieldName + ''] = fieldValue;
                dbConn.query('UPDATE inventory SET ? WHERE userName = ? AND itemName = ?', [obj, userName, itemName], function (err, result) {
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
                dbConn.query('TRUNCATE inventory', function (err, result) {
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

