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

        var target = message.mentions.users.first() || message.author;
        var embed = new MessageEmbed();
        var time = new Date();

        message.channel.send(
            embed.setColor("BLACK")
            .setDescription(`> **Avatar de ${target}**
                             > [Clique aqui](${target.displayAvatarURL({ size: 4096, dynamic: true })}) para baixar`)
            .setImage(target.displayAvatarURL({ size: 4096, dynamic: true }))
            .setFooter(`© ${bot.user.username} - ${time.getFullYear()}`, bot.user.displayAvatarURL())
            .setTimestamp()
        );

    } 
    
}