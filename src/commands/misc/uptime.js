const { MessageEmbed } = require("discord.js");
const ms = require("ms");

module.exports = {

    help: {
        name: "uptime",
        usage: ["uptime"],
        description: "Mostra o tempo online do bot.",
        accessableBy: "Todos os membros.",
        aliases: ["upt"]
    },
    
    run: async (bot, message, args) => {

        let embed = new MessageEmbed().setColor("BLACK")
        message.channel.send(embed
            .setDescription(`**> Estou online a \`${ms(bot.uptime, {long: true})}\`**`)
        ).catch(() => { return });

    }
}
