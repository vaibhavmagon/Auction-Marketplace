var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var forever = require('forever');
var cluster = require('cluster');
var cors = require('cors');
var os = require('os');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
http.listen(8080, "127.0.0.1");
app.io = io;

var Config = require('./config.js');
var configObj = new Config();

var globalObj = {
    configObj : configObj
};
// socket.io events
io.on("connection", function( socket ){
    console.log( "A user connected" );
    globalObj['socket'] = socket;
});


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/')));
app.set('view engine', 'jade');
app.use(cors());

/************ Controllers *************/

var users = require('./routes/userController')(io,globalObj);
app.use('/users', users);

var inventories = require('./routes/inventoryController');
app.use('/inventories', inventories);

var auctions = require('./routes/auctionController');
app.use('/auctions', auctions);

/**************************************/

/*app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});*/

app.get('*', function(req, res) {
    res.send('./index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

module.exports = app;

var numCPUs = os.cpus().length;

var port = process.env.PORT || configObj.port.number;

app.listen(port, function () {
    console.log("----------------- Starting Server --------------------");
    console.log(new Date());
    console.log('Express server listening on port %d in %s mode', port, app.get('env'));
});

// Starts the server in cluster mode.
/*
if (cluster.isMaster) {
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('online', function(worker) {
        console.log('Worker ' + worker.process.pid + ' is online');
    });

    cluster.on('exit', function(worker, code, signal) {
        console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
        console.log('Starting a new worker');
        cluster.fork();
    });
}else {

}*/
