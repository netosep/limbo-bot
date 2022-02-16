const { MessageEmbed } = require("discord.js")
const moment = require("moment");

module.exports = { 

    help: {
        name: "serverinfo",
        usage: ["serverinfo"],
        description: "Mostra as informações do servidor do discord.",
        accessableBy: "Todos os membros.",
        aliases: ["si"]
    },

    run: async (bot, message, args) => {

        let guild = message.guild;
        
        let embed = new MessageEmbed()
            .setThumbnail(guild.iconURL())
            .setAuthor({name: `Informações sobre o servidor ${guild.name}`, iconURL: guild.iconURL()})
            .setDescription(`
                > ▫ Nome: **${guild.name}**
                > ▫ Dono: **<@!${guild.ownerId}>**
                > ▫ Membros: **${guild.memberCount}**
                > ▫ Cargos: **${guild.roles.cache.size}**
                > ▫ Canais: **${guild.channels.cache.size}**
                > ▫ Criado em: **${moment(guild.createdAt).format("DD/MM/YYYY")}**
                > ▫ ID único: \`${guild.id}\`
            `)
            .setFooter({text: `© ${bot.user.username} `, iconURL: bot.user.displayAvatarURL()})
            .setColor("BLACK")
            .setTimestamp();

        return message.reply({ 
            embeds: [embed], 
            allowedMentions: { repliedUser: false },
            failIfNotExists: false
        }); 

    } 
    
}