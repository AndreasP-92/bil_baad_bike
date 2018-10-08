const authenticate 	        = require('../../middleware/authenticate');
const authenticateAuthor 	= require('../../middleware/authenticateAuthor');

module.exports = (server) => {


    server.get('/admin',authenticateAuthor,function(req,res){
        userRole = req.session.userRole;
        userName = req.session.userName;
        console.log(userRole)
        res.render('pages/admin/adminDashboard',{
            'page'      : {'title' : 'Admin Dashboard'},
            'userRole'  : userRole,
            'userName'  : userName
        })
    })

}