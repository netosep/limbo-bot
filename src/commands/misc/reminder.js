const { MessageEmbed } = require("discord.js");
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
        
        if(!time) {
            return message.reply("> **Você se esqueceu de colocar o tempo... 🙄**");
        }
        if(isNaN(ms(time))) {
            return message.reply("> **Esse tempo aí ta errado! 😬**");
        }
        if(!reminder) {
            return message.reply("> **Ta faltando o que devo te lembrar... 😒**");
        }

        message.reply(`> **Pode deixar que eu te lembro ${target.username}! 🤘🏿**`);

        let embed = new MessageEmbed()
            .setColor("BLACK")
            .setAuthor({name: `Opa ${target.username}! ✌`, iconURL: target.displayAvatarURL()})
            .setDescription(`
                > Há ${time} atrás você me pediu pra eu te lembrar disso aqui:
                > **👉  ${reminder}**
            `)
            .setFooter({text: `© ${bot.user.username} - Lembretes`, iconURL: bot.user.displayAvatarURL()})
            .setTimestamp()

        setTimeout(() => {
            return target.send({ content: `${target}`, embeds: [embed] });
        }, ms(time));

    }
    
}