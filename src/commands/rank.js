const mysql = require("../database/connection");

module.exports = { 

    help: {
        name: "rank",
        aliases: ["r"]
    },

    run: async (bot, message, args) => {

        var user = message.mentions.users.first() || message.author;

        //console.log(user)

        if(user.bot) return;

        mysql.execute(`SELECT * FROM user WHERE user_id = ?`, [ user.id ])
        .then((result) => {

            if(result.length === 0) {
                return message.channel.send('sem resultados')
            }

            return message.channel.send(`\`\`\`fix\n`+
                `ID: ${result[0].user_id}\n`+
                `Nome: ${result[0].user_name}\n`+
                `XP: ${result[0].experience}\n`+
                `Level: ${result[0].level}\n`+
            `\`\`\``);

        })
        .catch((err) => {
            console.error(err)
        });

        //message.channel.send(message.author.id)
    } 
    
}