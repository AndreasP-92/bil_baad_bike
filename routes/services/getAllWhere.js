const db = require('../../config/database').connect()

module.exports = {

// ********************************************************************* ARTICLES **********************************************************************************

    category: function(category){
        return new Promise ((resolve,reject)=>{
            sql = `
            SELECT
                *
            FROM
                tb_category
            WHERE
                category_id = ?
            `
            db.query(sql,category,function(err,data){
                if(err){
                    reject(err)
                }else{
                    resolve(data)
                }
            })
        })
    },
    author: function(author){
        return new Promise ((resolve,reject)=>{
            sql = `
            SELECT
                *
            FROM
                tb_authors
            WHERE
                author_id = ?
            `
            db.query(sql,author,function(err,data){
                if(err){
                    reject(err)
                }else{
                    resolve(data)
                }
            })
        })
    },
    article: function(articleId){
        return new Promise ((resolve,reject)=>{
            sql = `
            SELECT
                *
            FROM
                tb_articles
            WHERE
                article_id = ?
            `
            db.query(sql,articleId,function(err,data){
                if(err){
                    reject(err)
                }else{
                    resolve(data)
                }
            })
        })
    },
    articleCategory: function(category){
        return new Promise ((resolve,reject)=>{
            sql = `
            SELECT
                *
            FROM(
                tb_articles
            INNER JOIN
                tb_category ON fk_article_category = category_id )
            WHERE
                fk_article_category = ?
            `
            db.query(sql,category,function(err,data){
                if(err){
                    reject(err)
                }else{
                    resolve(data)
                }
            })
        })
    },
    comments: function(article){
        return new Promise ((resolve,reject)=>{
            sql= `
            SELECT
                *
            FROM(
                tb_comments
            INNER JOIN 
                tb_articles ON fk_article = article_id)
            WHERE 
                fk_article = ?
            `
            db.query(sql,article,function(err,data){
                if(err){
                    reject(err)
                }else{
                    resolve(data)
                }
            })
        })
    },


}