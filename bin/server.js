const express             = require('express');
const server              = express();
const path                = require('path');
const bodyParser          = require('body-parser');
const session             = require('express-session');
const passport            = require('passport');
const cookieParser        = require('cookie-parser');
const expressValidator    = require('express-validator');
const fileUpload          = require('express-fileupload');




// PORT ================================

const port          = 1337;
const url           = "http://localhost:"
const name          = "Bil Båd og Bike";

// File upload ===========================================
server.use(fileUpload({
    limits          : { fileSize: 50 * 268 * 210 },
    abortOnLimit    : true

  }));

// ENGINE ==============================

server.set('views', 'views');
server.set('view engine', 'ejs');

server.use(express.static('./public'));

// GETTING FORM DATA VIA BODY PARSER 
    
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(expressValidator());
// server.use(session({secret: 'max', saveUninitialized : false, reserve: false}))
server.use(cookieParser());

// SESSION ===============================

server.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    reserve:false,
    cookie: { maxAge: 20 * 60 * 1000 } // 30 minutter
}));

// PASSPORT ============================

server.use(passport.initialize());
server.use(passport.session());

// RENDER ==============================

require('.././routes/helper')(server)

// SITE NOT FOUND ----------------------

server.use(function(req,res){
    res.render('pages/404.ejs');
});

// SERVER LISTEN =======================

server.listen(port,function(){
    console.log('Enter the world at: ' + url + port, '\n' + 'server name : ' + name)
})