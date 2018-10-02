const db = require('../../config/database').connect()

module.exports = {

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

}