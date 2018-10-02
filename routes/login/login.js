const User 						= require('../services/users');
const passport 					= require('../../middleware/passport');
const {validationErrors}		= require('express-validator');
const getOne					= require('../services/getOne');


module.exports = function (server) {
	server.get('/login', (req, res) => {
		res.render('pages/login/login', { 'page': { 'title': 'Login' } });
	});

	server.get('/login/find/:user',async function(req,res){
		let User = req.params.user
		try{
			const user = await getOne.userCount(User);
			res.send(user)
		}catch(e){
			console.log(e)
		}

	})

	server.post('/login', passport.authenticate('local', {
		'successRedirect': '/profile',
		'failureRedirect': '/login',
		'failureFlash': true
	}));

	// server.post('/login',function(req,res){

	// 	req.checkBody('username', 'Username is required').notEmpty();
	// 	req.checkBody('password', 'Password is required').notEmpty();
	// 	console.log(req.checkBody())
	// 	//validate 
	// 	var errors = req.validationErrors();
	
	// 	if (errors) {
	// 		// console.log('error')
	// 		// req.session.loginFailed = 'Invalid user or '
	// 		// console.log()
	// 		res.render('pages/login/login',{user:null,frm_messages:errors});
	
	// 	}
	// 	else{
	// 		console.log('success')
	// 		passport.authenticate('local',{
	// 			successRedirect:'/profile',
	// 			failureRedirect: '/login',
	// 			failureFlash : true  
	// 		})(req,res); // <---- ADDD THIS
	// 	}
	// });


	// server.post('/login/initialized',function(req,res){
	// 	var errors = req.validationErrors();
	// 	if(errors){
	// 		res.render('pages/login/login',{
	// 			user : null,frm_messages:errors
	// 		})
	// 	}else{

	// 		passport.authenticate('local', {
	// 			'successRedirect': '/profiles',
	// 			'failureRedirect': '/loginss',
	// 			'failureFlash': false
	// 		})(req,res);
	// 	}	
	// }); 

	server.get('/logout', (req, res) => {
		req.session.destroy((err) => {
			res.redirect('/');
		});
	});
};
