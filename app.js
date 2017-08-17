const express = require("express");
const mustache = require("mustache-express")
const mongoose = require("mongoose");
const session = require("express-session");
const bodyParser = require('body-parser');
const morgan = require('morgan');
const MongoStore = require('connect-mongo')(session);

const app = express();

app.engine('mustache', mustache())
app.set('view engine', 'mustache')
app.use(express.static('public'));
app.use(morgan('tiny'))
app.use(bodyParser.urlencoded({extended: false}))
mongoose.Promise = require("bluebird");
mongoose.connect("mongodb://0.0.0.0:27017/gabble")

var session2 = {
  secret: 'gopher city',
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  cookie: {},
  resave: true,
  saveUninitialized: true
}


app.listen(3000, function(){
  console.log("Gabble Gobble Gobstoppers...")
})
