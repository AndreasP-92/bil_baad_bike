const KEY ="463305728831-n60asnmordeg70uh2s6velka1n6dil9c.apps.googleusercontent.com";
const SECRET = "yC10LMLmvhHJJPUhX9MPPEka";
const User = require('../routes/services/users');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function () {
	return new GoogleStrategy({
		'clientID': KEY,
		'clientSecret': SECRET,
		'callbackURL': "http://localhost:1337/google/callback"
	},
	async function(accessToken, refreshToken, profile, done) {
		try {
			const user = await User.google.findOrCreate(profile.id);
			done(null, { 'id': user });
		} catch (error) {
			done(error);
		}
	});
};