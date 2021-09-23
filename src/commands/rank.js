const canvacord = require("canvacord");
const { MessageAttachment } = require("discord.js");
//const { convertTime } = require("../lib/time");
const Rank = require("../utils/rankQuery");

module.exports = { 

    help: {
        name: "rank",
        aliases: ["r"]
    },

    run: async (bot, message, args) => {

/*         var user = message.mentions.users.first() || message.author;

        if(user.bot) return;

        await Rank.findRankByIds(user.id, message.guild.id)
        .then((userRank) => {
            if(userRank.id) {
                var totalExp = userRank.xp;
                var totalExpForNxtLVL = userRank.nxt_lvl_xp;
                var levelExp = Math.round(totalExpForNxtLVL - (totalExpForNxtLVL / 2.5)); 
                var nowExp = Math.round(totalExp - (totalExpForNxtLVL / 2.5));
                //var time = convertTime(userRank.time_connected);

                const rank = new canvacord.Rank()
                    .setAvatar(user.displayAvatarURL({ size: 1024, format: "jpg" }))
                    .setUsername(user.username)
                    .setDiscriminator(user.discriminator)
                    .setStatus(user.presence.status, true)
                    .setRequiredXP(levelExp)
                    .setCurrentXP(nowExp)
                    .setLevel(userRank.level)
                    .setRank(0, "", false)
                    
                rank.build().then((data) => {
                    const attachment = new MessageAttachment(data, `rankcard-${user.username}.png`);
                    message.channel.send(attachment)
                });

            } else {
                message.channel.send("sem resultados")
            }
        })
        .catch((err) => {
            return console.error(err);
        }); */

    } 
    
}