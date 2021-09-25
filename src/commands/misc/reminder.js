const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const ms = require("ms");

module.exports = { 

    help: {
        name: "lembrar",
        usage: ["lembrar <2h> <beber agua>", "ml <tempo> <lembrete>"],
        description: "Te manda uma mensagem no privado de lembrete.",
        accessableBy: "Todos os membros.",
        aliases: ["remind", "melembre", "ml"]
    },

    run: async (bot, message, args) => {

        let time = args[0];
        let reminder = args.slice(1).join(" ");
        let target = message.author;
        let embed = new MessageEmbed().setColor("BLACK");

        if(!time) {
            message.react("❎");
            return message.channel.send("> **Você se esqueceu de colocar o tempo... 🙄**");
        }
        if(isNaN(ms(time))) {
            message.react("❎");
            return message.channel.send("> **Esse tempo aí ta errado! 😬**");
        }
        if(!reminder) {
            message.react("❎");
            return message.channel.send("> **Ta faltando o que devo te lembrar... 😒**");
        }

        message.react("👍🏿");
        message.channel.send(`> **Pode deixar que eu te lembro ${target.username}! 🤘🏿**`);

        setTimeout(() => {
            target.send(target, embed
                .setAuthor(`Opa ${target.username}! ✌`, target.displayAvatarURL())
                .setDescription(`> Você me pediu lembrar disso aqui:
                                 > **👉  ${reminder}**`)
                .setFooter(`© ${bot.user.username} - Lembretes`, bot.user.displayAvatarURL())
                .setTimestamp()
            );
        }, ms(time)); 

    }
    
}