const mysql = require('mysql2')

module.exports = {
    'connect': () => {
        return mysql.createConnection({
            'host': 'localhost',
            'user': 'root',
            'password': '',
            'database': 'bil_baad_bike'
        });
        doMultipleQueries(function(err){
            connect.end();
       })
    },
}