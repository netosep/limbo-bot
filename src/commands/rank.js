const { convertTime } = require("../lib/time");
const Rank = require("../utils/rankQuery");

module.exports = { 

    help: {
        name: "rank",
        aliases: ["r"]
    },

    run: async (bot, message, args) => {

        var user = message.mentions.users.first() || message.author;

        if(user.bot) return;

        await Rank.findRankByIds(user.id, message.guild.id)
        .then((userRank) => {
            if(userRank.id) {
                var totalExp = userRank.xp;
                var totalExpForNxtLVL = userRank.nxt_lvl_xp;
                var levelExp = Math.round(totalExpForNxtLVL - (totalExpForNxtLVL / 2.5)); 
                var nowExp = Math.round(totalExp - (totalExpForNxtLVL / 2.5));

                message.channel.send(`\`\`\`fix\n`+
                    `Nome: ${userRank.name}\n`+
                    `Nível: ${userRank.level}\n`+
                    `XP total: ${totalExp}/${totalExpForNxtLVL}\n`+
                    `XP nível: ${nowExp}/${levelExp}\n`+
                    `Msgs enviadas: ${userRank.messages}\n`+
                    `Tempo em call: ${convertTime(userRank.time_connected)}`+
                `\`\`\``);
            } else {
                message.channel.send("sem resultados")
            }
        })
        .catch((err) => {
            return console.error(err);
        });

    } 
    
}