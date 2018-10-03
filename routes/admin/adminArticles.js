const getAll = require('../services/getAll');
const insert = require('../services/insert');
const getAllWhere = require('../services/getAllWhere');


module.exports = (server) => {

// ARTICLE MAIN =============================================

    server.get('/admin/articles',async function(req,res){

        try{
            const allArticles   = await getAll.articles();
            console.log(allArticles)
            res.render('pages/admin/adminArticles',{
                'page'      : {'title' : 'Admin Dashboard'},
                'articles'  : allArticles
                
            })
        }catch(e){
            console.log(e)
        }
    });
    
// CREATE ARTICLE =============================================

    server.get('/admin/articles/create',async function(req,res){

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

    server.post('/JSON/create/article',async function(req,res){
        try{
            const newArticle    = await insert.insertText(req.body) 
            
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
        res.render('pages/admin/adminExtensions/editArticle',{
            'page'      : {'title' : 'Admin Dashboard'},
            'cat'       : category,
            'author'    : author,
            'article'   : article
        })
    }catch(e){
        console.log(e)
    }
});
// POST -----
server.post('/JSON/edit/article/:id',async function(req,res){
    try{
        const newArticle    = await insert.updateText(req.body, req.params) 
        
        res.redirect('/admin/articles')
    }catch(e){
        console.log(e)
    }
});

}
