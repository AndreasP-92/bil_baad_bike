const getAll        = require('../services/getAll');
const getAllWhere   = require('../services/getAllWhere');
const insert        = require('../services/insert');
const update        = require('../services/update');

module.exports = (server) => {

// MAIN =========================================

    server.get('/arkivet/:page',async function(req,res){

        let page = req.params.page

        var contact_info    = await getAll.contactInfo();
        var nav             = await getAll.nav();
        var articles        = await getAll.allArticlesOffset(page);
        var mostRead        = await getAll.mostRead();
        var articleCount    = await getAll.articles()
        var ads             = await getAll.sponsers();

        console.log(articles)
        try{

            res.render('pages/index/arkivet',{
                'page'          : {'title' : 'Bil Båd og Bike Arkivet'},
                'contact_info'  : contact_info,
                'nav'           : nav,
                'articles'      : articles,
                'articleCount'  : articleCount,
                'mostRead'      : mostRead,
                'ads'           : ads
                
            })
        }catch(e){
         console.log(e)   
        }
    });

// SHOW SPECIFIC ARTICLE ==============================

    server.get('/arkivet/artikel/:id',async function(req,res){

        var articleId       = req.params.id;
        
        var contact_info    = await getAll.contactInfo();
        var nav             = await getAll.nav();
        var article         = await getAllWhere.article(articleId);
        var comment         = await getAllWhere.comments(articleId);
        var views = 1 + article[0].article_views;
        var insertView      = await update.views(views, articleId);
        var mostRead        = await getAll.mostRead();
        var ads             = await getAll.sponsers();


        console.log(article)
        try{

            res.render('pages/index/article',{
                'page'          : {'title' : 'Artikkel : '+article[0].article_headline},
                'contact_info'  : contact_info,
                'nav'           : nav,
                'article'       : article,
                'comment'       : comment,
                'mostRead'      : mostRead,
                'ads'           : ads
                
            })
        }catch(e){
            console.log(e)   
        }
    });

// POST COMMENT -------------------------------------
    server.post('/JSON/post/comment/:id', async function(req,res){
        console.log('PARAMS=============',req.params)
        console.log('BODY=============',req.body)
        articleId       = req.params.id
        commentName     = req.body.name;
        commentEmail    = req.body.email;
        comment         = req.body.comment; 
        // insertComment   = parseInt(1) 
        console.log('insertComment===',insertComment)
        try {
            var postComment     = await insert.comment(articleId, commentName, commentEmail, comment);
            var article         = await getAllWhere.article(articleId);
            var insertComment   = article[0].article_comment_count + 1;
            console.log(article)
            var commentCount    = await update.commentCount(insertComment, articleId);
            res.redirect('/arkivet/artikel/'+articleId)
        } catch (error) {
            console.log(error)
        }
    })
}