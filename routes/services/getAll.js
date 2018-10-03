const db = require('../../config/database').connect()

module.exports = {

    contactInfo: function(){
        return new Promise ((resolve,reject)=>{
            sql = `
            SELECT
                *
            FROM
                tb_contact
            `
            db.query(sql,function(err,data){
                if(err){
                    reject(err)
                }else{
                    resolve(data)
                }
            })
        })
    },
    nav: function(){
        return new Promise ((resolve,reject)=>{
            sql = `
            SELECT
                *
            FROM
                tb_nav
            `
            db.query(sql,function(err,data){
                if(err){
                    reject(err)
                }else{
                    resolve(data)
                }
            })
        })
    },

// ********************************************************************* LOGIN *********************************************************************

    users: function () {
        return new Promise((resolve, reject) => {
            var sql = `SELECT * FROM users`;
            db.query(sql, function (err, data){
                if (err){
                    reject(err)
                }else{
                    resolve(data);
                }
            });
        })
    },


// ********************************************************************* ADMIN *********************************************************************

// ********************************************************************* ARTICLES *********************************************************************

    category: function () {
        return new Promise((resolve, reject) => {
            var sql = `
            SELECT
                *
            FROM 
                tb_category`;
            db.query(sql, function (err, data){
                if (err){
                    reject(err)
                }else{
                    resolve(data);
                }
            });
        })
    },
    author: function () {
        return new Promise((resolve, reject) => {
            var sql = `
            SELECT
                *
            FROM 
                tb_authors`;
            db.query(sql, function (err, data){
                if (err){
                    reject(err)
                }else{
                    resolve(data);
                }
            });
        })
    },
    articles: function () {
        return new Promise((resolve, reject) => {
            var sql = `
            SELECT
                *
            FROM 
                tb_articles`;
            db.query(sql, function (err, data){
                if (err){
                    reject(err)
                }else{
                    resolve(data);
                }
            });
        })
    },
    // SUBSTRING(article_text, 1, 100) AS article_text
    articlesLimit: function () {
        return new Promise((resolve, reject) => {
            var sql = `
            SELECT
                article_id,
                article_headline,
                article_date,
                article_views,
                SUBSTRING(article_text, 1, 500) AS article_text,
                fk_article_author,
                fk_article_category
            FROM 
                tb_articles
            ORDER BY 
                article_id DESC
            LIMIT
                6
                `;
            db.query(sql, function (err, data){
                if (err){
                    reject(err)
                }else{
                    resolve(data);
                }
            });
        })
    },
    articleOffset: function (page, category) {
        return new Promise((resolve, reject) => {
            // console.log('SERIVCE===========',page)
            
            // console.log('category======',category)
            if (category == 0 || category == undefined) {
                category = []
                for (i = 0; i < 10; i++)category.push(i);
            }
            
            var sql = `
            SELECT 
                article_id,
                article_headline,
                article_date,
                article_views,
                SUBSTRING(article_text, 1, 500) AS article_text,
                fk_article_author,
                fk_article_category
            FROM((
                tb_articles 
            INNER JOIN 
                tb_authors ON fk_article_author = author_id)
            INNER 
                JOIN tb_category ON fk_article_category = category_id) 
            WHERE
                fk_article_category IN (${category}) 
            LIMIT
                5
            OFFSET
                ${page}
            `;
            db.query(sql, function (err, data){
                if (err){
                    reject(err)
                }else{
                    resolve(data);
                }
            });
        })
    },
    allArticlesOffset: function (page) {
        return new Promise((resolve, reject) => {
            // console.log('SERIVCE===========',page)
            
            
            var sql = `
            SELECT 
                article_id,
                article_headline,
                article_date,
                article_views,
                SUBSTRING(article_text, 1, 500) AS article_text,
                fk_article_author,
                fk_article_category
            FROM(
                tb_articles 
            INNER JOIN 
                tb_authors ON fk_article_author = author_id)
            LIMIT
                5
            OFFSET
                ${page}
            `;
            db.query(sql, function (err, data){
                if (err){
                    reject(err)
                }else{
                    resolve(data);
                }
            });
        })
    },
    articleCount:function(category){
        return new Promise((resolve,reject)=>{
            var sql = `
                SELECT 
                    COUNT(article_id) as article_id
                FROM(
                    tb_articles
                INNER JOIN
                    tb_category ON fk_article_category = category_id )
                WHERE
                    fk_article_category = ?
            `
            db.query(sql,category, function(err,data){
                if(err){
                    reject(err)
                }else{
                    resolve(data)
                }
            })
        })
    },
}

