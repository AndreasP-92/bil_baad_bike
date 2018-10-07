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

// ********************************************************************* ARTICLES **********************************************************************************

    search: function (search) {
        if(txt == ""){
            txt = "_"
        }
        if(headline == ""){
            txt = "_"
        }
        console.log('category ========',category)

        if (category == 0 || category == undefined) {
            category = []
            for (i = 0; i < 10; i++)category.push(i);
        }

        if (author == 0 || author == undefined) {
            author = []
            for (i = 0; i < 10; i++)author.push(i);
        }

        // console.log('service: ', 'txt=', txt, 'category=', category, 'price=', price)
        let prepare = [category , price]
        return new Promise((resolve, reject) => {
            console.log(txt)
            // category
            console.log(prepare)
            var sql = `
                SELECT 
                    *
                FROM((
                    tb_articles 
                INNER JOIN 
                    tb_author ON fk_article_author = author_id)
                Inner JOIN 
                    tb_category ON fk_article_category = category_id)
                WHERE
                article_name like '%${txt}%' and
                article_healine like '%${headline}%' and
                fk_article_author in (?) and
                fk_article_category in (?) and                    
                LIMIT
                    6
            `;
            console.log('sql====================',sql)
            db.query(sql, prepare, function (err, result) {
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