const { MessageEmbed } = require("discord.js");

module.exports = { 

    help: {
        name: "lower",
        usage: ["lower <frase qualquer>"],
        description: "Coloca a frase em letras minúsculas.",
        accessableBy: "Todos os membros.",
        aliases: ["low", "lowercase"]
    },

    run: async (bot, message, args) => {

        let phrase = args.join(" ").toLowerCase();

        if (!phrase) {
            return message.reply({
                content: "> **Você precisa de uma frase para que eu possa fazer isso...  🤨**",
                allowedMentions: { repliedUser: false },
                failIfNotExists: false
            });
        }

        if (phrase.length > 1500) {
            return message.reply({
                content: "> **A frase que você enviou é muito grande! Limite 1500 caracteres!  📄**",
                allowedMentions: { repliedUser: false },
                failIfNotExists: false
            });
        }

        let embed = new MessageEmbed()
            .setAuthor("Colocando frases em caixa baixa", bot.user.displayAvatarURL())
            .setColor("BLACK")
            .setDescription(`
                > Prontinho ${message.author}! 😊 Aqui está 👇🏿
                \`\`\`${phrase}\`\`\`
            `);

        return message.reply({
            embeds: [embed], 
            allowedMentions: { repliedUser: false },
            failIfNotExists: false
        });

    } 
    
}