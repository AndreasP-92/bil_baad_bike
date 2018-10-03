const getAll        = require('../services/getAll');
const getAllWhere   = require('../services/getAllWhere');
const insert        = require('../services/insert');

module.exports = (server) => {


    server.get('/arkivet/:page',async function(req,res){

        let page = req.params.page

        var contact_info    = await getAll.contactInfo();
        var nav             = await getAll.nav();
        var articles        = await getAll.allArticlesOffset(page);
        try{

            res.render('pages/index/arkivet',{
                'page'          : {'title' : 'Bil Båd og Bike Arkivet'},
                'contact_info'  : contact_info,
                'nav'           : nav,
                'articles'      : articles
                
            })
        }catch(e){
         console.log(e)   
        }
    });
// SHOW SPECIFIC ARTICLE ------------------------------
    server.get('/arkivet/artikel/:id',async function(req,res){

        var articleId       = req.params.id;

        var contact_info    = await getAll.contactInfo();
        var nav             = await getAll.nav();
        var article         = await getAllWhere.article(articleId);
        var comment         = await getAllWhere.comments(articleId)
        try{

            res.render('pages/index/article',{
                'page'          : {'title' : 'Artikkel : '+article[0].article_headline},
                'contact_info'  : contact_info,
                'nav'           : nav,
                'article'       : article,
                'comment'       : comment
                
            })
        }catch(e){
            console.log(e)   
        }
    });

// POST COMMENT -------------------------------------
    server.post('/JSON/post/comment/:id', async function(req,res){
        console.log('PARAMS=============',req.params)
        console.log('BODY=============',req.body)
        articleId = req.params.id
        commentName     = req.body.name;
        commentEmail    = req.body.email;
        comment         = req.body.comment; 
        try {
            var postComment = await insert.comment(articleId, commentName, commentEmail, comment)
            res.redirect('/arkivet/'+articleId)
        } catch (error) {
            console.log(error)
        }
    })
}