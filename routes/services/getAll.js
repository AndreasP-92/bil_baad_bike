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
}

