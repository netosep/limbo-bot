const { MessageEmbed } = require("discord.js")
const moment = require("moment");
const { loading_engre, arrow_raimbow } = require("../../database/emojiIDs.json");
const { getEmoji } = require("../../lib/getEmoji");

module.exports = { 

    help: {
        name: "info",
        aliases: ["i"]
    },

    run: async (bot, message, args) => {

        let target = message.guild.member(message.mentions.users.first() || message.author);
        let rainbowEmj = getEmoji(arrow_raimbow);
        let loadingEmj = getEmoji(loading_engre)
        
        let embed = new MessageEmbed()
            .setThumbnail(target.user.displayAvatarURL({ size: 1024 }))
            .setTitle(`${loadingEmj} Informações sobre ${target.user.username}`)
            .setDescription(`
                > ${rainbowEmj} Nome: **${target.user.username}#${target.user.discriminator}**
                > ${rainbowEmj} Nick no servidor: **${target.nickname || target.user.username}**
                > ${rainbowEmj} Entrou no servidor em: **${moment(target.joinedTimestamp).format("DD/MM/YYYY")}**
                > ${rainbowEmj} Conta criada em: **${moment(target.user.createdTimestamp).format("DD/MM/YYYY")}**
                > ${rainbowEmj} ID único: \`${target.id}\``)
            .setFooter(`© ${bot.user.username} `, bot.user.displayAvatarURL())
            .setTimestamp();

        message.channel.send(embed);

    } 
    
}