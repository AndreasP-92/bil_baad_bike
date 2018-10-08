

const db = require('../../config/database').connect()

module.exports = {

// ************************************************************************************ ADMIN SPONSER *******************************************************************
sponserText: function(sponserText, sponserSiteId){
    return new Promise ((resolve,reject)=>{
        console.log('service læst!!')
        sql = `
        UPDATE
            tb_sponser_site
        SET
            site_text   = '${sponserText}'
        WHERE
            site_id     = '${sponserSiteId}'
        `
        db.query(sql, function(err,data){
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        })
    })
},
sponserPrice: function(sponserPrice, sponserPriceViews, sponserPriceId){
    return new Promise ((resolve,reject)=>{
        console.log('service price læst!!')
        sql = `
        UPDATE
            tb_sponser_price
        SET
            price_views     = '${sponserPrice}',
            price_per_view  = '${sponserPriceViews}'
        WHERE
            price_id        = '${sponserPriceId}'
        `
        db.query(sql, function(err,data){
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        })
    })
},

// ************************************************************************************ ADMIN AUTHOR *******************************************************************

author: function(authorId, name, userRole, email, sampleFile, textBox, category){
    return new Promise ((resolve,reject)=>{
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
user: function(userRole, email){
    return new Promise ((resolve,reject)=>{
        // let prepare = [name, email, textBox, sampleFile, category, userRole];
        console.log('service læst!!')
        sql = `
        UPDATE
            users
        SET
            user_role   = ${userRole}
        WHERE
            email       = '${email}'
        `
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
            let prepare = [view];

            console.log(view)

            sql= `
            UPDATE
                tb_articles
            SET
                article_views    = ?
            WHERE
                article_id = ${articleId}
            `
            db.query(sql,prepare, function(err,data){
                console.log(data)
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
