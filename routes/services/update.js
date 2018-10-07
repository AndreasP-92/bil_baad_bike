

const db = require('../../config/database').connect()

module.exports = {

// ************************************************************************************ ADMIN SPONSER *******************************************************************


// ************************************************************************************ ADMIN AUTHOR *******************************************************************

author: function(authorId, name, userRole, email, sampleFile, textBox, category){
    return new Promise ((resolve,reject)=>{
        // let prepare = [name, email, textBox, sampleFile, category, userRole];
        console.log('service læst!!')
        sql = `
        UPDATE
            tb_authors
        SET
            author_name             = '${name}',
            author_email            = '${email}',
            author_profile_tekst    = '${textBox}',
            author_profile_img      = '${sampleFile.name}',
            fk_category             = '${category}',
            fk_user_role            = ${userRole}
        WHERE
            author_id               = ${authorId}
        `
        console.log('sql=============',sql)
        db.query(sql, function(err,data){
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        })
    })
},

// ************************************************************************************ ADMIN SPONSER *******************************************************************
   
sponser: function(sponser_id, sponser_name, sponser_category, sampleFile){
    return new Promise ((resolve,reject)=>{
        let prepare = [sponser_name, sponser_category];
        console.log('service læst!!')
        sql = `
        UPDATE
            tb_sponsers
        SET
            sponsers_name           = '${sponser_name}',
            fk_category             = ${sponser_category},
            sponsers_img            = '${sampleFile.name}'
        WHERE
            sponsers_id = ${sponser_id}
        `
        console.log('sql=============',sql)
        db.query(sql,prepare, function(err,data){
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        })
    })
},

// ************************************************************************************ ARTICLE *****************************************************************

    views: function(view, articleId){
        return new Promise ((resolve,reject)=>{
            let string = [view];

            sql= `
            INSERT INTO
                tb_authors
            SET
                author_name             = ?,
                author_email            = ?,
                author_profile_img      = ?,
                author_profile_tekst    = ?,
                fk_category             = ?
            WHERE
                article_id = ${articleId}
            `
            db.query(sql,string, function(err,data){
                if(err){
                    reject(err)
                }else{
                    resolve(data)
                }
            })
        })
    },
    commentCount: function(insertComment, articleId){
        return new Promise ((resolve,reject)=>{
            let string = [insertComment];
            console.log('STRING==========',string, articleId)


            sql= `
            UPDATE
                tb_articles
            SET
                article_comment_count = ?
            WHERE
                article_id = ${articleId}
            `
            db.query(sql,string, function(err,data){
                if(err){
                    reject(err)
                }else{
                    resolve(data)
                }
            })
        })
    },


}
