const db = require('../../config/database').connect()

module.exports = {

// ****************************************************************************** LOGIN ***********************************************************************

    userCount: function (user) {
        return new Promise((resolve, reject) => {
            var sql = `
            SELECT COUNT(username) as username 
            FROM 
                users 
            WHERE 
                username = ?`;
            db.query(sql,user, function (err, data){
                if (err){
                    reject(err)
                }else{
                    resolve(data);
                }
            });
        })
    },
    user: function (userId) {
        return new Promise((resolve, reject) => {
            var sql = `            
            SELECT
                *
            FROM
                users
            WHERE
                id = ?`;
                console.log(userId)
            // console.log(sql)
            db.query(sql,userId, function (err, data){
                if (err){
                    reject(err)
                }else{
                    resolve(data);
                }
            });
        })
    },  
}