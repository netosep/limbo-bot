const { MessageEmbed } = require('discord.js');

module.exports = {

    help: {
        name: "ping",
        usage: ["ping"],
        description: "Mostra o tempo de resposta do bot.",
        accessableBy: "Todos os membros.",
        aliases: ["pingar"]
    },
    
    run: async (bot, message, args) => {

        let embed = new MessageEmbed()
            .setColor("BLACK")
            .setDescription("> **Pingando... ⏳**");
        
        return message.reply({ 
            embeds: [embed], 
            allowedMentions: { repliedUser: false },
            failIfNotExists: false 
        })
        .then((msg) => {
            let ping = msg.createdTimestamp - message.createdTimestamp;
            embed.setDescription(`> **BOT Ping: \`${ping}ms\` ⏳ | API Ping: \`${bot.ws.ping}ms\` ⏱**`);
            return msg.edit({ embeds: [embed] }).catch(() => { return });
        });
    }
}