const mysql = require("../database/connection");

/**
 * @param userId id do usuário de consulta
 * @param guildId id do servidor para consulta  
*/
const findByIds = function(userId, guildId) {

    return new Promise((resolve, reject) => {
        mysql.execute(`
            SELECT * FROM ranking 
            WHERE user_id = ?
            AND guild_id  = ?`,
            [ userId, guildId ]
        )
        .then((result) => {
            if(result.length > 0) {
                const rank = {
                    id             : result[0].rank_id,
                    user_id        : result[0].user_id,
                    guild_id       : result[0].guild_id,
                    level          : result[0].level,
                    xp             : result[0].experience,
                    nxt_lvl_xp     : result[0].exp_for_next_level,
                    messages       : result[0].messages,
                    time_connected : result[0].time_connected_in_ms
                }
                resolve(rank);
            } else {
                resolve(result);
            }
        })
        .catch((err) => {
            reject(err);
        });
    });

}

const findAll = function() {

}

const findRankByIds = function(userId, guildId) {

    return new Promise((resolve, reject) => {
        mysql.execute(`
            SELECT u.user_id, u.user_name, u.user_avatar_url, r.level, r.experience,
                   r.exp_for_next_level, r.messages, r.time_connected_in_ms
            FROM user AS u, ranking AS r
            WHERE u.user_id = r.user_id
            AND u.user_id = ?
            AND r.guild_id = ?`, [ userId, guildId ]
        )
        .then((result) => {
            if(result.length > 0) {
                const userRank = {
                    id             : result[0].user_id,
                    name           : result[0].user_name,
                    avatar_url     : result[0].user_avatar_url,
                    level          : result[0].level,
                    xp             : result[0].experience,
                    nxt_lvl_xp     : result[0].exp_for_next_level,
                    messages       : result[0].messages,
                    time_connected : result[0].time_connected_in_ms
                }
                resolve(userRank);
            } else {
                resolve(result);
            }
        })
        .catch((err) => {
            reject(err);
        });
    });

}

const findAllRanks = function() {

    return new Promise((resolve, reject) => {
        mysql.execute(`
            SELECT u.user_id, u.user_name, u.user_avatar_url, r.level, r.experience,
                   r.exp_for_next_level, r.messages, r.time_connected_in_ms
            FROM user AS u, ranking AS r
            WHERE u.user_id = r.user_id
            ORDER BY r.experience DESC`
        )
        .then((results) => {
            if(results.length > 0) {
                const ranks = [];
                for (let i = 0; i < results.length; i++) {
                    ranks[i] = {
                        id             : results[i].user_id,
                        name           : results[i].user_name,
                        avatar_url     : results[i].user_avatar_url,
                        level          : results[i].level,
                        xp             : results[i].experience,
                        nxt_lvl_xp     : results[i].exp_for_next_level,
                        messages       : results[i].messages,
                        time_connected : results[i].time_connected_in_ms
                    }
                }
                resolve(ranks);
            } else {
                resolve(result);
            }
        })
        .catch((err) => {
            reject(err);
        });
    });

}

const insert = function(user) {

    mysql.execute(`
        INSERT INTO ranking ( 
            user_id, guild_id, experience, exp_for_next_level, messages
        )
        VALUES( ?, ?, ?, ?, ? ) `, 
        [ 
            user.id, user.guild_id, user.rank.xp, 
            user.rank.nxt_lvl_xp, user.rank.messages
        ]
    )
    .catch((err) => {
        return console.error(err);
    });

}

const updateXP = function(user) {

    mysql.execute(`
        UPDATE ranking
        SET experience = experience + ?,
            messages   = messages + 1
        WHERE user_id  = ?
        AND guild_id   = ?`,
        [
            user.rank.xp, user.id,
            user.rank.guild_id
        ]
    )
    .catch((err) => {
        console.error(err);
    });

}

const updateTimeConected = function(user) {

    mysql.execute(`
        UPDATE ranking
        SET time_connected_in_ms = time_connected_in_ms + ?
        WHERE user_id = ?`,
        [
            user.time_connected, user.id
        ]
    )
    .catch((err) => {
        console.error(err);
    });

}

const updateLevel = function(user) {

    /***************************************
    *  utilizando função CEIL() do mysql
    *  para arredondar para o maior valor
    ****************************************/

    mysql.execute(`
        UPDATE ranking
        SET level = level + 1,
            exp_for_next_level = CEIL(exp_for_next_level * 2.5)
        WHERE user_id = ?
        AND guild_id  = ?`,
        [ 
            user.id, user.rank.guild_id  
        ]
    )
    .catch((err) => {
        console.error(err);
    });

}

module.exports = { 
    findByIds,
    findAll,
    findRankByIds,
    findAllRanks,
    insert,
    updateXP,
    updateTimeConected,
    updateLevel
}