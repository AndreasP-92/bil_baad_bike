const getAll = require('../services/getAll');


module.exports = (server) => {


    server.get('/kontakt',async function(req,res){

        var contact_info    = await getAll.contactInfo();
        var nav             = await getAll.nav();


        try{
        res.render('pages/index/kontakt',{
            'page'  : {'title' : 'Bil Båd og Bike Kontakt'},
            'contact_info'  : contact_info,
            'nav'           : nav



        })
        }catch(e){
            console.log(e)
        }
    })

}