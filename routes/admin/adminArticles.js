const getAll                = require('../services/getAll');
const insert                = require('../services/insert');
const deleteItem            = require('../services/delete');
const getAllWhere           = require('../services/getAllWhere');
const authenticateAuthor 	= require('../../middleware/authenticateAuthor');


module.exports = (server) => {

// ARTICLE MAIN =============================================

    server.get('/admin/articles',authenticateAuthor,async function(req,res){
        console.log(req.session.userCategory)
        
        try{
            if(req.session.userCategory != 0){
                const allArticles   = await getAllWhere.articleCategory(req.session.userCategory);
                res.render('pages/admin/adminArticles',{
                    'page'      : {'title' : 'Admin Dashboard'},
                    'articles'  : allArticles
                    
                })

            }else{
                const allArticles   = await getAll.articles();
                res.render('pages/admin/adminArticles',{
                    'page'      : {'title' : 'Admin Dashboard'},
                    'articles'  : allArticles
                    
                })
            }

        }catch(e){
            console.log(e)
        }
    });
    
// CREATE ARTICLE =============================================

    server.get('/admin/articles/create',authenticateAuthor,async function(req,res){

        try{
            const category      = await getAll.category()
            const author        = await getAll.author()
            res.render('pages/admin/adminExtensions/createNewArticle',{
                'page'  : {'title' : 'Admin Dashboard'},
                'cat'   : category,
                'author': author
            })
        }catch(e){
            console.log(e)
        }
    });

// POST -------

    server.post('/JSON/create/article',authenticateAuthor,async function(req,res){
        try{
            await insert.insertText(req.body) 
            
            res.redirect('/admin/articles')
        }catch(e){
            console.log(e)
        }
    });


// EDIT ARTICLE =============================================

    server.get('/admin/articles/edit/:id',async function(req,res){
        
        try{
            
            const article       = await getAllWhere.article(req.params.id)
            const category      = await getAll.category()
            const author        = await getAll.author()
            const comment       = await getAllWhere.comments(req.params.id);


            console.log(article[0].article_id)

            res.render('pages/admin/adminExtensions/editArticle',{
                'page'      : {'title' : 'Admin Dashboard'},
                'cat'       : category,
                'author'    : author,
                'article'   : article,
                'comment'   : comment
            })
        }catch(e){
            console.log(e)
        }
    });
// POST (ARTICLE) -----
    server.post('/JSON/edit/article/:id',authenticateAuthor, async function(req,res){
        console.log('submit====',req.body.submit)
        var articleId   = req.params.id;
        var submit      = req.body.submit
        try{
            if(submit == "SLET"){
                console.log('deleting')
                await deleteItem.article(articleId);
            }
            if(submit == "INDSÆT")
                console.log('inserting')
            newArticle    = await insert.updateText(req.body, req.params) 
            
            res.redirect('/admin/articles')
        }catch(e){
            console.log(e)
        }
    });
// POST (COMMENT) -----
    server.post('/JSON/edit/comment/:id',authenticateAuthor, async function(req,res){
        console.log('submit====',req.body.submit)
        var commentId   = req.params.id;
        var submit      = req.body.submit
        try{
            if(submit == "Slet"){
                console.log('deleting')
                await deleteItem.comment(commentId);
                
            }
            if(submit == "Opdater")
                console.log('inserting')
                console.log(req.params.id)
                insert.updateComment(req.body, commentId) 
            
            res.redirect('/admin/articles')
        }catch(e){
            console.log(e)
        }
    });

}
