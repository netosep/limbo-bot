const mysql = require("../database/connection");
const { randomXP } = require("../lib/experience");

const findById = function(userId) {

    return new Promise((resolve, reject) => {
        mysql.execute("SELECT * FROM user WHERE user_id = ?", [ userId ])
        .then((result) => {
            if(result.length > 0) {
                const user = {
                    id         : result[0].user_id,
                    guild_id   : result[0].guild_id,
                    name       : result[0].user_name,
                    avatar_url : result[0].user_avatar_url,
                    xp         : result[0].experience,
                    level      : result[0].level,
                    messagens  : result[0].messages,
                    isActive   : result[0].active
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
                        guild_id   : results[i].guild_id,
                        name       : results[i].user_name,
                        avatar_url : results[i].user_avatar_url,
                        xp         : results[i].experience,
                        level      : results[i].level,
                        messagens  : results[i].messages,
                        isActive   : results[i].active
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
        INSERT INTO user (
            user_id, guild_id, user_name,
            user_avatar_url, experience, messages
        )
        VALUES( ?, ?, ?, ?, ?, ? )
    `, 
    [
        user.id, user.guild_id, user.name,
        user.avatar_url, user.xp, user.messages
    ])
    .catch((err) => {
        return console.error(err);
    });

}

const update = function(user) {

    mysql.execute(`
        UPDATE user
        SET user_name       = ?,
            user_avatar_url = ?,
            experience      = experience + ?,
            level           = level + ?,
            messages        = messages + ?
        WHERE user_id       = ?`,
        [
            user.name, user.avatar_url, user.xp, 
            user.level, user.messages, user.id
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