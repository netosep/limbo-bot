const { MessageEmbed } = require("discord.js")
const moment = require("moment");

module.exports = { 

    help: {
        name: "userinfo",
        usage: ["userinfo", "ui <@user>"],
        description: "Mostra as suas informações do discord ou a de alguém mencionado.",
        accessableBy: "Todos os membros.",
        aliases: ["ui"]
    },

    run: async (bot, message, args) => {

        let target = message.guild.member(message.mentions.users.first() || message.author);
        
        let embed = new MessageEmbed()
            .setThumbnail(target.user.displayAvatarURL({ size: 1024 }))
            .setAuthor(`Informações sobre ${target.user.username}`, target.user.displayAvatarURL())
            .setDescription(`
                > ▫ Nome: **${target.user.username}#${target.user.discriminator}**
                > ▫ Nick no servidor: **${target.nickname || target.user.username}**
                > ▫ Entrou no servidor em: **${moment(target.joinedTimestamp).format("DD/MM/YYYY")}**
                > ▫ Conta criada em: **${moment(target.user.createdTimestamp).format("DD/MM/YYYY")}**
                > ▫ ID único: \`${target.id}\``)
            .setFooter(`© ${bot.user.username} `, bot.user.displayAvatarURL())
            .setTimestamp();

        message.channel.send(embed);

    } 
    
}