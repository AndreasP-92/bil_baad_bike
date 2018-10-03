const getAll = require('../services/getAll');
const getAllWhere   = require('../services/getAllWhere');


module.exports = (server) => {


    server.get('/bikes/:page',async function(req,res){

        var category = 3

        var contact_info    = await getAll.contactInfo();
        var nav             = await getAll.nav();
        var articles        = await getAll.articleOffset(req.params.page, category);
        var articleCategory = await getAllWhere.articleCategory(category);

        try{
        res.render('pages/index/bikes',{
            'page'              : {'title' : 'Bil Båd og Bike Artikler'},
            'contact_info'      : contact_info,
            'nav'               : nav,
            'articles'          : articles,
            'articleCategory'   : articleCategory

        })
        }catch(e){
            console.log(e)
        }
    })

}