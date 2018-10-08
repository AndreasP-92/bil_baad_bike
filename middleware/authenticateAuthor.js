module.exports = function (req, res, next) {
	if (req.session && req.session.isLoggedIn && req.session.userRole == 2 || req.session.userRole == 1 ) {
		return next();
	} else {
		res.redirect('/login');
	}
};