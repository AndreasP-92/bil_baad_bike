const getAll        = require('../services/getAll');
const insert        = require('../services/insert');
const deleteItem    = require('../services/delete');

module.exports = (server) => {

// MAIN =======================

    server.get('/sponser',async function(req,res){

        
        try{
            var contact_info    = await getAll.contactInfo();
            var nav             = await getAll.nav();
            var mostRead        = await getAll.mostRead();
            var ads             = await getAll.sponsers();
            var sponserText     = await getAll.sponserText();
            var sponserSale     = await getAll.sponserSale();

            res.render('pages/index/sponser',{
                'page'          : {'title' : 'Bil Båd og Bike Forside'},
                'contact_info'  : contact_info,
                'nav'           : nav,
                'mostRead'      : mostRead,
                'ads'           : ads,
                'sponserText'   : sponserText,
                'sponserSale'   : sponserSale

            })
        }catch(e){
            console.log(e)
        }
    })
}