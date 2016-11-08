var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var request = require('request');
var cheerio = require('cheerio');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/')));
app.set('view engine', 'jade');
app.use(cors());

app.get('/companyApi/:id',function(req,res){
    request('http://stackshare.io/' + req.params.id + '/' + req.params.id, function (error, response, html) {
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(html);
            var obj = {};
            var tags = [];
            var techStack = [];
            var utilities = [];
            var devops = [];
            var business_tools = [];
            obj['name'] = req.params.id;
            obj['companyLogo'] = $('div.sp-service-logo p a').html();
            obj['description'] = $('div#stack-description p').text();
            obj['tagLength'] = $('div#stack-name .row').find('a').length;
            console.log($('div#stack-name a').text());
            $('div#stack-name div.row a').each(function(i, elem) {
                tags[i] = $(this).text();
            });
            obj['tags'] = tags;
            $('div.application_and_data div#stack-item-services-tile div div.stack-service-name-under').each(function(i, elem) {
                techStack[i] = $(this).text();
            });
            $('div.utilities div#stack-item-services-tile div div.stack-service-name-under').each(function(i, elem) {
                utilities[i] = $(this).text();
            });
            $('div.devops div#stack-item-services-tile div div.stack-service-name-under').each(function(i, elem) {
                devops[i] = $(this).text();
            });
            $('div.business_tools div#stack-item-services-tile div div.stack-service-name-under').each(function(i, elem) {
                business_tools[i] = $(this).text();
            });
            obj['businessTools'] = business_tools;
            obj['devops'] = devops;
            obj['utilities'] = utilities;
            obj['techStack'] = techStack;
            res.send(obj);
        }
    });
});

app.get('/techApi/:id',function(req,res){
    request('http://stackshare.io/' + req.params.id, function (error, response, html) {
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(html);
            var obj = {};
            var tags = [];
            var companiesUsing = [];
            var similarTech = [];
            obj['name'] = $('div#service-name a').text();
            obj['techLogo'] = $('div.sp-service-logo a').html();
            obj['description'] = $('div#service-description span').text();
            $('td.reasons-list div.panel-group div.reason_item span.reason-author-pop').each(function(i, elem) {
                tags[i] = $(this).text();
            });
            $('div.stack-logo a').each(function(i, elem) {
                if($(this).attr("data-hint") != null) {
                    companiesUsing[i] = $(this).attr("data-hint");
                }
            });
            $('div.similar-services-items div.stack-logo a').each(function(i, elem) {
                if($(this).attr("data-hint") != null){
                    similarTech[i] = $(this).attr("data-hint");
                }
            });
            obj['similarTech'] = similarTech;
            obj['companiesUsing'] = companiesUsing;
            obj['tags'] = tags;
            res.send(obj);
        }
    });
});

module.exports = app;

var port = 3000;

app.listen(port, function () {
    console.log("----------------- Starting Server --------------------");
    console.log(new Date());
    console.log('Express server listening on port %d in %s mode', port, app.get('env'));
});



