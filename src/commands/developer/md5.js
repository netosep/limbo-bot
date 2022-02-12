const { MessageEmbed } = require("discord.js");
const md5 = require("md5");

module.exports = { 

    help: {
        name: "md5",
        usage: ["md5 <expressão qualquer>"],
        description: "Codifica uma expressão em char md5.",
        accessableBy: "Todos os membros.",
        aliases: ["codmd5"]
    },

    run: async (bot, message, args) => {

        let phrase = args.join(" ");

        if (!phrase) {
            return message.reply({
                content: "> **É necessário passar um parâmetro!  🤨**",
                allowedMentions: { repliedUser: false },
                failIfNotExists: false
            });
        }

        if (phrase.length > 50) {
            return message.reply({
                content: "> **Oops! Limite de 50 caracteres!  📄**",
                allowedMentions: { repliedUser: false },
                failIfNotExists: false
            });
        }

        let embed = new MessageEmbed()
            .setAuthor("Codificando para MD5", bot.user.displayAvatarURL())
            .setColor("BLACK")
            .setDescription(`
                > Prontinho ${message.author}! 🤐 Aqui está 👇🏿
                \`\`\`${md5(phrase)}\`\`\`
            `);

        return message.reply({
            embeds: [embed], 
            allowedMentions: { repliedUser: false },
            failIfNotExists: false
        });

    } 
    
}