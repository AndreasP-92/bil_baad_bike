const getAll        = require('../services/getAll');
const insert        = require('../services/insert');
const deleteItem    = require('../services/delete');

module.exports = (server) => {

// MAIN =======================

    server.get('/',async function(req,res){

        var contact_info    = await getAll.contactInfo();
        var nav             = await getAll.nav();
        var articles        = await getAll.articlesLimit();
        var mostRead        = await getAll.mostRead();
        var ads             = await getAll.sponsers();

        console.log('articles=================',articles)
        try{

            res.render('pages/index/index',{
                'page'          : {'title' : 'Bil Båd og Bike Forside'},
                'contact_info'  : contact_info,
                'nav'           : nav,
                'articles'      : articles,
                'mostRead'      : mostRead,
                'ads'           : ads

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
}