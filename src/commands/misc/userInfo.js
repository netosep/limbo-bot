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

        let target = message.mentions.users.first() ||  message.author;
        
        let embed = new MessageEmbed()
            .setColor("BLACK")
            .setThumbnail(target.displayAvatarURL({ size: 1024 }))
            .setAuthor(`Informações sobre ${target.username}`, target.displayAvatarURL())
            .setDescription(`
                > ▫ Nome: **${target.username}#${target.discriminator}**
                > ▫ Nick no servidor: **${target.nickname || target.username}**
                > ▫ Entrou no servidor em: **${moment(target.joinedTimestamp).format("DD/MM/YYYY")}**
                > ▫ Conta criada em: **${moment(target.createdTimestamp).format("DD/MM/YYYY")}**
                > ▫ ID único: \`${target.id}\`
            `)
            .setFooter(`© ${bot.user.username} `, bot.user.displayAvatarURL())
            .setTimestamp();

        return message.reply({ embeds: [embed] }).catch(() => { return });

    } 
    
}