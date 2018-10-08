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
		'successRedirect': '/admin',
		'failureRedirect': '/login',
		'failureFlash': true
	}));


	server.get('/logout', (req, res) => {
		req.session.destroy((err) => {
			res.redirect('/');
		});
	});
};
