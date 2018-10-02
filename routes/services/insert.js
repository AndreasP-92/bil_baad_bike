

const db = require('../../config/database').connect()

module.exports = {

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
                    console.log(err)
                }else{
                    resolve(data)
                }
            })
        })
    }

}