const { MessageEmbed } = require("discord.js");

module.exports = { 

    help: {
        name: "avatar",
        usage: ["avatar", "avatar <@user>"],
        description: "Mostra o seu avatar ou o de alguém mencionado.",
        accessableBy: "Todos os membros.",
        aliases: ["a", "perfil"]
    },

    run: async (bot, message, args) => {

        let target = message.mentions.users.first() || message.author;
        let time = new Date();
        let embed = new MessageEmbed()
            .setColor("BLACK")
            .setImage(target.displayAvatarURL({ size: 4096, dynamic: true }))
            .setDescription(`
                > **Avatar de ${target}**
                > [Clique aqui](${target.displayAvatarURL({ size: 4096, dynamic: true })}) para baixar
            `)
            .setFooter({text: `© ${bot.user.username} - ${time.getFullYear()}`, iconURL: bot.user.displayAvatarURL()})
            .setTimestamp();
        
        return message.reply({ 
            embeds: [embed], 
            allowedMentions: { repliedUser: false },
            failIfNotExists: false
        });

    } 
    
}