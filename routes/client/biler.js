const getAll        = require('../services/getAll');
const getAllWhere   = require('../services/getAllWhere');


module.exports = (server) => {


    server.get('/biler/:page',async function(req,res){

        var category = 1

        var contact_info    = await getAll.contactInfo();
        var nav             = await getAll.nav();
        var articles        = await getAll.articleOffset(req.params.page, category);
        var articleCategory = await getAllWhere.articleCategory(category);
        var mostRead        = await getAll.mostRead();
        var ads             = await getAll.sponsers();

        // console.log('ARTICLE COUNT=========',articleCategory)


        try{
        res.render('pages/index/biler',{
            'page'              : {'title' : 'Bil Båd og Bike Artikler'},
            'contact_info'      : contact_info,
            'nav'               : nav,
            'articles'          : articles,
            'articleCategory'   : articleCategory,
            'mostRead'          : mostRead,
            'ads'               : ads

        })
        }catch(e){
            console.log(e)
        }
    })

}