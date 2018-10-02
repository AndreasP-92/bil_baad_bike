
module.exports = function (server) {
	app.get('/', (req, res) => {
		res.render('login/page', { 'page': { 'title': 'Hello, World!' } });
	});
};
