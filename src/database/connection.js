const mysql = require("mysql");
const env = require("dotenv");

env.config();

var pool = mysql.createPool({
    host            : process.env.DB_HOST,
    database        : process.env.DB_NAME,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASS,
    port            : process.env.DB_PORT,
    connectionLimit : 1000,
    charset         : "utf8mb4"
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