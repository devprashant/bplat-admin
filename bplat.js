var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var appRouter = require('./routes');
var mongoose = require('mongoose');
var logger = require('morgan');

mongoose.connect('mongodb://localhost:27017/bplat');

var port = process.env.PORT || 3000;

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));

appRouter(app);

app.listen(port);
console.log('app running at '+ port);