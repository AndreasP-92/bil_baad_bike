const db = require('../../config/database').connect()

module.exports = {

// ********************************************************************* SPONSER **********************************************************************************

    sponser: function(sponser){
        return new Promise ((resolve,reject)=>{
            sql = `
            SELECT
                *
            FROM
                tb_sponsers
            WHERE
                sponsers_id = ?
            `
            db.query(sql,sponser,function(err,data){
                if(err){
                    reject(err)
                }else{
                    resolve(data)
                }
            })
        })
    },

// ********************************************************************* LOGIN **********************************************************************************


    user: function(username){
        return new Promise ((resolve,reject)=>{
            sql = `
            SELECT
                *
            FROM
                users
            WHERE
                username = ?
            `
            db.query(sql,username,function(err,data){
                if(err){
                    reject(err)
                }else{
                    resolve(data)
                }
            })
        })
    },
// ********************************************************************* ARTICLES **********************************************************************************

    search: function (search) {
        if(search == ""){
            search = "_"
        }
        console.log('searvice search ==========',search)

        // console.log('service: ', 'txt=', txt, 'category=', category, 'price=', price)
        let prepare = ['%' + search + '%', '%' + search + '%', '%' + search + '%', '%' + search + '%']
        return new Promise((resolve, reject) => {
            console.log(search)
            // category
            console.log(prepare)
            var sql = `
                SELECT 
                    article_id,
                    article_headline,
                    article_date,
                    article_views,
                    article_comment_count,
                    SUBSTRING(article_text, 1, 500) AS article_text,
                    fk_article_author,
                    fk_article_category
                FROM
                    tb_articles 

                WHERE
                article_headline    LIKE ? OR
                article_text        LIKE ? OR
                fk_article_author   LIKE ? OR
                fk_article_category LIKE ? 
                LIMIT
                    3
            `;
            console.log('sql====================',sql)
            db.query(sql,prepare, function (err, result) {
                if (err) reject(err);
                // console.log('result==========',result[0])
                else{
                    resolve(result);
                }
            })
        })
    //     Inner JOIN 
    //     tb_products_author ON fk_author = author_id)
    // INNER JOIN 
    //     tb_producent ON fk_producent = producent_id)
                    // fk_category in (?) and
    },

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
                article_id,
                article_headline,
                DATE_FORMAT(article_date, '%d. %M %Y KL. %k:%i:%S') AS article_date,
                article_views,
                article_text,
                fk_article_author,
                fk_article_category,
                article_comment_count
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
            FROM
                tb_articles
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