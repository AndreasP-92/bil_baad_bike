const passport = require('../../middleware/passport');

module.exports = function (server) {

	server.get('/google/login',
		passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

	server.get('/google/callback', 
		passport.authenticate('google', { failureRedirect: '/login' }),
		function(req, res) {
			console.log(req.body);
			req.session.isLoggedIn = { 'id': 'smellyhobo' }
			res.redirect('/login/profile');
		});
};
