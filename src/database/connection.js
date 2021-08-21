const mysql = require("mysql");

var pool = mysql.createPool({
    //connectionLimit: 1000,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    port: process.env.PORT
});

const execute = function(query, params=[]) {
    return new Promise((resolve, reject) => {
        pool.query(query, params, (err, result, fields) => {
            if(err) {
                reject(err);
            } else {
                resolve(result)
            }
        });
    });
}

const testConnection = function() {
    execute("SHOW databases")
    .then((result) => {
        if(result.length > 0){
            return console.log("Conectado com sucesso com o banco de dados")
        } else {
            return console.log("Não existe banco de dados configurado")
        }
    })
    .catch((err) => {
        console.log(err)
    });
}

module.exports = { 
    execute, 
    testConnection
}