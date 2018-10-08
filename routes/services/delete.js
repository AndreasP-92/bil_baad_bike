const db = require('../../config/database').connect()

module.exports = {

// ****************************************************************************** MAIN ***********************************************************************

    newsletterUser: function(email){
        return new Promise ((resolve,reject)=>{
            sql = `
                DELETE FROM
                    tb_newsletter
                WHERE
                    newsletter_mail = ?
            `
            console.log(email)
            db.execute(sql,[email],function(err,data){
                if(err){
                    reject(err)
                }else{
                    resolve(data)
                }
            })
        })
    },

// ****************************************************************************** ADMIN ***********************************************************************

    article: function(id){
        return new Promise ((resolve,reject)=>{
            sql = `
                DELETE FROM
                    tb_articles
                WHERE
                    article_id = ?
            `
            console.log(id)
            db.execute(sql,[id],function(err,data){
                if(err){
                    reject(err)
                }else{
                    resolve(data)
                }
            })
        })
    },
    comment: function(id){
        return new Promise ((resolve,reject)=>{
            sql = `
                DELETE FROM
                    tb_comments
                WHERE
                    comment_id = ?
            `
            console.log(id)
            db.execute(sql,[id],function(err,data){
                if(err){
                    reject(err)
                }else{
                    resolve(data)
                }
            })
        })
    },
    sponser: function(sponser_id){
        return new Promise ((resolve,reject)=>{
            sql = `
                DELETE FROM
                    tb_sponsers
                WHERE
                    sponsers_id = ?
            `
            db.execute(sql,[sponser_id],function(err,data){
                if(err){
                    reject(err)
                }else{
                    resolve(data)
                }
            })
        })
    },
    author: function(sponser_id){
        return new Promise ((resolve,reject)=>{
            sql = `
                DELETE FROM
                    tb_authors
                WHERE
                    author_id = ?
            `
            db.execute(sql,[sponser_id],function(err,data){
                if(err){
                    reject(err)
                }else{
                    resolve(data)
                }
            })
        })
    },
}