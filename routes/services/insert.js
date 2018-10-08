

const db = require('../../config/database').connect()

module.exports = {


    
// ************************************************************************************ MAIN *******************************************************************

    newsletterUser: function(email){
        return new Promise ((resolve,reject)=>{
            let string = [email]
            // console.log('STRING==========',string)
            sql=`
            INSERT INTO
                tb_newsletter
            SET
                newsletter_mail    = ?
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
    contactForm: function(name,mail,topic,msg){
        return new Promise ((resolve,reject)=>{
            let string = [name,mail,topic,msg]
            console.log('STRING==========',string)
            sql=`
            INSERT INTO
                tb_contact_form
            SET
                contact_name    = ?,
                contact_mail    = ?,
                contact_topic   = ?,
                contact_message = ?
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
// ************************************************************************************ MAIN *******************************************************************

    author: function(name, email, category, img, text){
      return new Promise ((resolve,reject)=>{
          let prepare = [name, email, img, text, category];

          sql = `
            INSERT INTO
                tb_authors
            SET
                author_name             = ?,
                author_email            = ?,
                author_profile_img      = ?,
                author_profile_tekst    = ?,
                fk_category             = ?
          `
          db.query(sql,prepare,function(err,data){
              if(err){
                  reject(err)
              }else{
                  resolve(data)
              }
          })
      })  
    },

// ************************************************************************************ ADMIN SPONSER *******************************************************************

    sponser:function(sponser_name, sponser_category, sampleFile){
        return new Promise ((resolve,reject)=>{
            let prepare = [sponser_name, sampleFile.name, sponser_category]

            let sql = `
            INSERT INTO
                tb_sponsers
            SET
                sponsers_name   = ?,
                sponsers_img    = ?,
                fk_category     = ?
            `
            db.query(sql,prepare,function(err,data){
                if(err){
                    reject(err)
                }else{
                    resolve(data)
                }
            })
        });

    },

// ************************************************************************************ ADMIN ARTICLE *******************************************************************
    insertText: function(body){
        return new Promise ((resolve,reject)=>{

            var prepare = [body.headline,body.textbox,body.author, body.category]

            sql = `
            INSERT INTO
                tb_articles
            SET
                article_headline    = ?,
                article_text        = ?,
                fk_article_author   = ?,
                fk_article_category = ?
                
            `
            db.query(sql,prepare,function(err,data){
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

            var prepare = [body.headline,body.textbox,body.datetime,body.author, body.category]

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
            db.query(sql,prepare,function(err,data){
                if(err){
                    reject(err)
                }else{
                    resolve(data)
                }
            })
        })
    },
    updateComment: function(body, commentId){
        return new Promise ((resolve,reject)=>{

            var string = [body.commentHeadline, body.commentText]

            sql = `
            UPDATE
                tb_comments
            SET
                comment_name        = ?,
                comment_text        = ?
            WHERE 
                comment_id          = ${commentId}
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
    },


}
