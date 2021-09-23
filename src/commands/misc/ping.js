const { MessageEmbed } = require('discord.js');

module.exports = {

    help: {
        name: "ping",
        usage: ["ping"],
        description: "Mostra o tempo de resposta do bot.",
        accessableBy: "Todos os membros.",
        aliases: ["pingar", "p"]
    },
    
    run: async (bot, message, args) => {

        let embed = new MessageEmbed({
            color: "BLACK",
            description: "**Pingando... ⏳**"
        });
        
        message.channel.send(embed)
        .then(msg => {
            var ping = msg.createdTimestamp - message.createdTimestamp
            msg.edit(embed
                .setDescription(`**Ping: \`${ping}ms\` ⏳| Ping API: \`${bot.ws.ping}ms\` ⏱**`)
            ).catch(() => { 
                return;
            });
        })
        .catch(() => { 
            return;
        });
    }
}