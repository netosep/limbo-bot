const { MessageEmbed } = require("discord.js");
require("dotenv").config();

module.exports = { 

    help: {
        name: "alert",
        usage: ["alert <mensagem>", "alerta <mensagem>"],
        description: "Envia uma mensagem de alerta para todos os servidores.",
        accessableBy: "Somente o desenvolvedor.",
        aliases: ["alerta"]
    },

    run: async (bot, message, args) => {

        if(message.author.id != process.env.BOT_OWNER_ID) {
            return message.reply({
                content: `> **Negado! Esse comando só pode ser usado pelo desenvolvedor!  ⛔**`,
                allowedMentions: { repliedUser: false },
                failIfNotExists: false
            });
        }

        let alertMsg = args.join(" ");
        if(!alertMsg) {
            return message.reply({
                content: `> **É necessário informar uma menságem de alerta!  🙄**`,
                allowedMentions: { repliedUser: false },
                failIfNotExists: false
            });
        }

        let embed = new MessageEmbed()
            .setColor("BLACK")
            .setAuthor({name: "Se liga no aviso:", iconURL: bot.user.displayAvatarURL()})
            .setTitle(`> **${alertMsg}**`)
            .setTimestamp();

        bot.guilds.cache.each(guild => {
            let channel = guild.channels.cache.filter(channel => channel.type == "GUILD_TEXT").first();
             if(channel) {
                return channel.send({
                    embeds: [embed], 
                    allowedMentions: { repliedUser: false },
                    failIfNotExists: false
                });
            }
        });

        return message.reply({
            content: `> **O alerta foi enviado com sucesso para ${bot.guilds.cache.size} servidores!**  📩`,
            allowedMentions: { repliedUser: false },
            failIfNotExists: false
        });

    } 
    
}