const getAll    = require('../services/getAll');
const insert    = require('../services/insert');


module.exports = (server) => {

// MAIN ==========================================

    server.get('/kontakt',async function(req,res){

        let contact_info    = await getAll.contactInfo();
        let nav             = await getAll.nav();
        let mostRead        = await getAll.mostRead();
        var ads             = await getAll.sponsers();


        try{
        res.render('pages/index/kontakt',{
            'page'          : {'title' : 'Bil Båd og Bike Kontakt'},
            'contact_info'  : contact_info,
            'nav'           : nav,
            'mostRead'      : mostRead,
            'ads'           : ads



        })
        }catch(e){
            console.log(e)
        }
    })

// POST CONTACT FORM =============================

    server.post('/JSON/post/contactform', async function (req,res){

        let name    = req.body.name;
        let mail    = req.body.email;
        let topic   = req.body.topic;
        let msg     = req.body.msg;

        try {

            let inerstContactForm   = await insert.contactForm(name,mail,topic,msg)
            res.redirect('/')
        } catch (error) {
            console.log(error)
        }
    })

}