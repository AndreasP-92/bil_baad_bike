//const debug = require('debug')('server:register');
const User 			= require('../services/users');
const getAll 		= require('../services/getAll');
const { body } 		= require('express-validator/check');
const getOne		= require('../services/getOne');
const insert		= require('../services/insert');


module.exports = function (server) {
	server.get('/register', async (req, res) => {

		try {

			let category = await getAll.category(); 
			console.log(category)
			res.render('pages/login/register', { 
			'page'		: { 'title': 'Register' },
			'category'	: category
			
			
			});
			
		} catch (error) {
			console.log(error)	
		}
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
		let name		= req.body.name;
		let email 		= req.body.email;
		let category	= req.body.category;
		let text		= req.body.text;
		// console.log(req.files)
		let sampleFile	= req.files.sampleFile;

            // console.log('FILES=================',req.files.sampleFile)


		if (!req.files)
		return res.status(400).send('No files were uploaded.');

		sampleFiles = sampleFile.name

		// console.log(sampleFiles)
		sampleFile.mv(`public/resources/media/redaktion/${sampleFile.name}`, async function(err) {


			try {
				const result 		= await User(req.body.username, req.body.passphrase);
				const insertAuthor	= await insert.author(name, email, category, sampleFile.name, text);
				if (result === true) {
					res.redirect('/admin')
					// res.send('hooray!');
				} else {
					res.send('poop');
				}
				
			} catch (error) {
				console.log(error)
			}
		});

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
