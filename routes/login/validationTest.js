
var express = require('express');
var router = express.Router();
var {check, validationResult}  = require('express-validator/check')
// var User    = [{
//     username : String,
//     password : String
// }]
module.exports = function(server){



    server.get('/test',function(req,res){
        var y = req.params.x
    res.render('pages/test',{title : 'Form Validation', success: false, errors: req.session.errors})
    req.session.error = null;    
    
    // res.send(check('username').isEmpty())
    })

    // server.post('/submit',function(req,res){
    //     res.redirect('/')
    // })

	server.post('/submit',[
        check('email', 'invalid email adress').isEmail(),
        check('password', 'invalid password').isLength({min: 3})
    ], function (req, res) {
        console.log(check)
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(442).json({errors: errors.array()});
        };
        User.create({
            username: req.body.email,
            password: req.body.password
        }).then(user => {res.send(user)})

        // console.log(user)
        res.send()
    })

//     server.post('/submit', function(req, res, next) {
//         req.check('email', 'Invalid email address').isEmail();
//         req.check('password', 'Password is invalid').isLength({min: 4}).equals(req.body.confirmPassword);
      
//         var errors = req.validationErrors();
//         if (errors) {
//           req.session.errors = errors;
//           req.session.success = false;
//         } else {
//           req.session.success = true;
//         }
//         res.redirect('/');
//       });
}

// https://github.com/chriso/validator.js#validators