const getAll        = require('../services/getAll');
const insert        = require('../services/insert');
const deleteItem    = require('../services/delete');

module.exports = (server) => {


    server.get('/',async function(req,res){

        var contact_info    = await getAll.contactInfo();
        var nav             = await getAll.nav();
        var artcles         = await getAll.articlesLimit();
        var mostRead        = await getAll.mostRead();
        console.log('articles=================',artcles)
        try{

            res.render('pages/index/index',{
                'page'          : {'title' : 'Bil Båd og Bike Forside'},
                'contact_info'  : contact_info,
                'nav'           : nav,
                'articles'       : artcles,
                'mostRead'      : mostRead

            })
        }catch(e){
            console.log(e)
        }
    })
// NEWSLETTER =======================
    server.post('/JSON/update/newsletter/user', async function (req,res){
        var email   = req.body.mail;
        var sub     = req.body.sub;
        console.log(req.body)
        
        try {
            if(sub=="TILMELD"){
                let subscribe = await insert.newsletterUser(email)
            }
            if(sub=="FRAMELD"){
                let unsubscribe = await deleteItem.newsletterUser(email)
            }
            res.redirect('/')
        } catch (error) {
            console.log(error)
        }
    })
// SEARCH =======================================

    server.post('/search', async function (req,res){

        let search = req.body

        try {
            let search        = await getAll.search(search)
            let contact_info    = await getAll.contactInfo();
            let nav             = await getAll.nav();
            let articles        = await getAll.allArticlesOffset(page);
            let mostRead        = await getAll.mostRead();
            let articleCount    = await getAll.articles()
            res.render('/pages/index/search',{
                'contact_info'  : contact_info,
                'nav'           : nav,
                'articles'      : articles,
                'mostRead'      : mostRead,
                'articleCount'  : articleCount


            })
        } catch (error) {
            console.log(error)
        }
    })

}