//const debug = require('debug')('server:register');
const User 			= require('../services/users');
const getAll 		= require('../services/getAll');
const { body } 		= require('express-validator/check');
const getOne		= require('../services/getOne');


module.exports = function (server) {
	server.get('/register', (req, res) => {
		res.render('pages/login/register', { 'page': { 'title': 'Register' } });
	});

	// server.get('/test/:email', body('email').custom(value => {
	// 	return User.findUserByEmail(value).then(user => {
	// 	  if (user) {
	// 		  console.log('user =================',user)
	// 		return Promise.reject('E-mail already in use');
	// 	  }
	// 	});
	//   }), (req, res) => {
	// 	res.send('asdfghjk')
	//   });
	  



	// [
	// 	check('username').custom(value=>{
	// 		return User.findByEmail
	// 	})
	// 	]


	server.get('/register/find/:user',async function(req,res){
		let User = req.params.user
		try{
			const user = await getOne.userCount(User);
			res.send(user)
		}catch(e){
			console.log(e)
		}

	})

	server.post('/user/post', async (req, res) => {
		console.log(req.body)
		const result = await User(req.body.username, req.body.passphrase);
		if (result === true) {
			res.redirect('/')
			// res.send('hooray!');
		} else {
			res.send('poop');
		}
	});
	// server.get('/register/getAll/users', async function(req,res){
	// 	try{
	// 		const allUsers	= await getAll.users();
	// 		res.send(allUsers)
	// 	}catch(e){
	// 		console.log(e)
	// 	}
	// 	// res.send(allUsers)
		
	// })
};
