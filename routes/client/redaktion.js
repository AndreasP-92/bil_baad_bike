const getAll = require('../services/getAll');

module.exports = (server) => {


    server.get('/redaktion', async function(req,res){

        var contact_info    = await getAll.contactInfo();
        var mostRead        = await getAll.mostRead();
        var nav             = await getAll.nav();


        try{
        res.render('pages/index/redaktion',{
            'page'  : {'title' : 'Bil Båd og Bike Redaktionen'},
            'contact_info'  : contact_info,
            'nav'           : nav,
            'mostRead'      : mostRead

        })
        }catch(e){
            console.log(e)
        }
    })

}