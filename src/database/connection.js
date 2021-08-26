const mysql = require("mysql");
const { database } = require("../../config.json");
//const { database } = require("../../config.example.json");

var pool = mysql.createPool({
    connectionLimit: 1000,
    user: database.user,
    password: database.password,
    database: database.db,
    host: database.host,
    port: database.port
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
    
    execute("SHOW TABLES")
    .then((result) => {
        if(result.length > 0) {
            return console.log("Database connected!\n")
        }
    })
    .catch((err) => {
        var errMsg = err.sqlMessage ? err.sqlMessage : "Review the config.json file!"
        return console.error(`Failed to connect to database!\n${errMsg}`);
    });
}

module.exports = { 
    execute, 
    testConnection
}