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

        let user = message.mentions.users.first() || message.author;
        let member = message.guild.members.cache.get(user.id);
        
        let embed = new MessageEmbed()
            .setColor("BLACK")
            .setThumbnail(user.displayAvatarURL({ size: 1024 }))
            .setAuthor({name: `Informações sobre ${user.username}`, iconURL: user.displayAvatarURL()})
            .setDescription(`
                > ▫ Nome: **${user.username}#${user.discriminator}**
                > ▫ Nick no servidor: **${member.nickname || user.username}**
                > ▫ Membro do servidor desde: **${moment(member.joinedTimestamp).format("DD/MM/YYYY")}**
                > ▫ Conta criada em: **${moment(user.createdTimestamp).format("DD/MM/YYYY")}**
                > ▫ ID único: \`${user.id}\`
            `)
            .setFooter({text: `© ${bot.user.username} `, iconURL: bot.user.displayAvatarURL()})
            .setTimestamp();

        return message.reply({ 
            embeds: [embed],
            allowedMentions: { repliedUser: false },
            failIfNotExists: false
        });

    } 
    
}