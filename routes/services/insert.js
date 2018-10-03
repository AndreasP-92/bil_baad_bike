

const db = require('../../config/database').connect()

module.exports = {

// ************************************************************************************ ADMIN ARTICLE *******************************************************************
    insertText: function(body){
        return new Promise ((resolve,reject)=>{
            console.log('body========',body)

            var string = [body.headline,body.textbox,body.datetime,body.author, body.category]
            console.log(string)
            sql = `
            INSERT INTO
                tb_articles
            SET
                article_headline    = ?,
                article_text        = ?,
                article_date        = ?,
                fk_article_author   = ?,
                fk_article_category = ?
                
            `
            db.query(sql,string,function(err,data){
                if(err){
                    reject(err)
                }else{
                    resolve(data)
                }
            })
        })
    },
    updateText: function(body, params){
        return new Promise ((resolve,reject)=>{

            var string = [body.headline,body.textbox,body.datetime,body.author, body.category]
            console.log(string)
            sql = `
            UPDATE
                tb_articles
            SET
                article_headline    = ?,
                article_text        = ?,
                article_date        = ?,
                fk_article_author   = ?,
                fk_article_category = ?
            WHERE 
                article_id          = ${params.id}
            `
            db.query(sql,string,function(err,data){
                if(err){
                    reject(err)
                }else{
                    resolve(data)
                }
            })
        })
    },

// ************************************************************************************ ARTICLE *****************************************************************

    comment: function(article, comment_name, comment_email, comment){
        return new Promise ((resolve,reject)=>{
            let string = [comment_name, comment_email, comment, article]
            console.log('STRING==========',string)
            sql=`
            INSERT INTO
                tb_comments
            SET
                comment_name    = ?,
                comment_text    = ?,
                comment_email   = ?,
                fk_article      = ?
            `
            db.query(sql,string,function(err,data){
                if(err){
                    reject(err)
                }else{
                    resolve(data)
                }
            })
        })
    }

}
