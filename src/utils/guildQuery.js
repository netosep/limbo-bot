const mysql = require("../database/connection");

const findById = function(guildId) {

    return new Promise((resolve, reject) => {
        mysql.execute("SELECT * FROM guild WHERE guild_id = ?", [ guildId ])
        .then((result) => {
            if(result.length > 0) {
                const guild = {
                    id         : result[0].guild_id,
                    owner_id   : result[0].guild_owner_id,
                    name       : result[0].guild_name,
                    icon_url   : result[0].guild_icon_url,
                    prefix     : result[0].guild_prefix,
                    created_at : result[0].created_at
                }
                resolve(guild);
            } else {
                resolve(result);
            }
        })
        .catch((err) => {
            reject(err);
        });
    });

}

const insert = function(guild) {

    mysql.execute(`
        INSERT INTO guild (
            guild_id, guild_owner_id, guild_name, guild_icon_url
        )
        VALUES ( ?, ?, ?, ? )`,
        [ guild.id, guild.owner_id, guild.name, guild.icon_url ]
    )
    .catch((err) => {
        return console.error(err);
    });

}

const update = function(guild) {

    mysql.execute(`
        UPDATE guild
        SET guild_name     = ?,
            guild_owner_id = ?,
            guild_icon_url = ?
        WHERE guild_id     = ?`,
        [
            guild.name, guild.owner_id,
            guild.icon_url, guild.id
        ]
    )
    .catch((err) => {
        return console.error(err);
    });

}

module.exports = {
    findById,
    insert,
    update
}