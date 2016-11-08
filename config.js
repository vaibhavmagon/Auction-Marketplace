/**
 * Created by vaibhav on 8/4/15.
 */

module.exports = function(){
    return {
        mysqlConf: {
            connectionLimit: 20,
            host: 'localhost',
            user: 'root',
            port: '3306',
            password: 'root',
            database: 'auctionDb',
            multipleStatements: true
        },
        port: {
            number: 3000
        },
        host: {
            ip: 'localhost'
        }
    };
};


