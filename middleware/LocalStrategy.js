const LocalStrategy 	= require('passport-local').Strategy;
const User 				= require('../routes/services/users');
const getAll			= require('../routes/services/getAll');
const getAllWhere		= require('../routes/services/getAllWhere');

module.exports = function () {
	return new LocalStrategy({
		'usernameField': 'username',
		'passwordField': 'passphrase',
		'passReqToCallback': true
	}, async function (req, username, passphrase, done) {
		try {
			const checkUser		= await getAllWhere.user(username);
			const valid 		= await User.valid(username, passphrase);
			
			if (!valid)
			return res.redirect('/login');

			console.log(checkUser)

			req.session.isLoggedIn 		= { 'id': valid };
			req.session.userRole 		= checkUser[0].user_role;
			req.session.userCategory 	= checkUser[0].fk_author_category;
			req.session.userName		= username;

			return done (null, req.session.isLoggedIn);
		} catch (error) {
			return done(error);
		}
	});
};
