var http = require('http')
var express = require('express')
var app = express()
require('dotenv').config()
var Freelancer = require('./Freelancer')
var Guru  = require('./Guru')
var Upwork = require('./Upwork')
var bodyParser = require('body-parser')
var cors = require('cors')
app.use('/static', express.static('public'))
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.post('/freelancer', Freelancer)
app.post('/guru', Guru)
app.post('/upwork', Upwork)
var server = http.createServer(app)
server.listen(8080);
