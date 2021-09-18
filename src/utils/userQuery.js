const mysql = require("../database/connection");

const findById = function(userId) {

    return new Promise((resolve, reject) => {
        mysql.execute("SELECT * FROM user WHERE user_id = ?", [ userId ])
        .then((result) => {
            if(result.length > 0) {
                const user = {
                    id         : result[0].user_id,
                    name       : result[0].user_name,
                    avatar_url : result[0].user_avatar_url,
                    created_at : result[0].created_at
                }
                resolve(user);
            } else {
                resolve(result)
            }
        })
        .catch((err) => {
            reject(err);
        });
    });

}

const findAll = function() {

    return new Promise((resolve, reject) => {
        mysql.execute("SELECT * FROM user")
        .then((results) => {
            if(results.length > 0) {
                const users = [];
                for (let i = 0; i < results.length; i++) {
                    users[i] = {
                        id         : results[i].user_id,
                        name       : results[i].user_name,
                        avatar_url : results[i].user_avatar_url,
                        created_at : results[i].created_at
                    }
                }
                resolve(users);
            }
        })
        .catch((err) => {
            reject(err);
        });
    });
}

const insert = function(user) {

    mysql.execute(`
        INSERT INTO user ( user_id, user_name, user_avatar_url )
        VALUES( ?, ?, ? ) `, 
        [ 
            user.id, user.name, user.avatar_url 
        ]
    )
    .catch((err) => {
        return console.error(err);
    });

}

const update = function(user) {

    mysql.execute(`
        UPDATE user
        SET user_name       = ?,
            user_avatar_url = ?
        WHERE user_id       = ?`,
        [ 
            user.name, user.avatar_url,
            user.id
        ]
    )
    .catch((err) => {
        return console.error(err);
    });

}

module.exports = { 
    findById,
    findAll,
    insert,
    update
}