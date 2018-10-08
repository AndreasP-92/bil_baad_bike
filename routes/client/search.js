const getAll        = require('../services/getAll');
const insert        = require('../services/insert');
const deleteItem    = require('../services/delete');
const getAllWhere   = require('../services/getAllWhere');

module.exports = (server) => {

    server.get('/search',async function(req,res){

        var contact_info    = await getAll.contactInfo();
        var nav             = await getAll.nav();
        var artcles         = await getAll.articlesLimit();
        var mostRead        = await getAll.mostRead();
        var ads             = await getAll.sponsers();

        console.log('articles=================',artcles)
        try{

            res.render('pages/index/saerch',{
                'page'          : {'title' : 'Bil Båd og Bike Søgning'},
                'contact_info'  : contact_info,
                'nav'           : nav,
                'articles'      : artcles,
                'mostRead'      : mostRead,
                'ads'           : ads


            })
        }catch(e){
            console.log(e)
        }
    })
    server.post('/search',async function(req,res){

        bodySearch = req.body.search

        console.log('body Search ========', bodySearch)

        var search          = await getAllWhere.search(bodySearch);
        var contact_info    = await getAll.contactInfo();
        var nav             = await getAll.nav();
        // var artcles         = await getAllWhere.search(search);
        var mostRead        = await getAll.mostRead();
        var ads             = await getAll.sponsers();

        console.log('articles=================',search)
        try{

            res.render('pages/index/saerch',{
                'page'          : {'title' : 'Bil Båd og Bike Forside'},
                'contact_info'  : contact_info,
                'nav'           : nav,
                'articles'      : search,
                'mostRead'      : mostRead,
                'ads'           : ads


            })
        }catch(e){
            console.log(e)
        }
    })
}