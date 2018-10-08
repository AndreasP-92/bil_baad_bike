const getAll = require('../services/getAll');

module.exports = (server) => {


    server.get('/redaktion', async function(req,res){

        var contact_info    = await getAll.contactInfo();
        var mostRead        = await getAll.mostRead();
        var nav             = await getAll.nav();
        var authors         = await getAll.author();
        var ads             = await getAll.sponsers();


        try{
        res.render('pages/index/redaktion',{
            'page'  : {'title' : 'Bil Båd og Bike Redaktionen'},
            'contact_info'  : contact_info,
            'nav'           : nav,
            'mostRead'      : mostRead,
            'author'        : authors,
            'ads'           : ads


        })
        }catch(e){
            console.log(e)
        }
    })

}