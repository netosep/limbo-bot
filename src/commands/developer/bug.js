const { MessageEmbed } = require("discord.js");

module.exports = { 

    help: {
        name: "bug",
        usage: ["bug <descrição>"],
        description: "Reportar algum bug relacionado ao bot.",
        accessableBy: "Todos os membros.",
        aliases: ["reportbug", "rb"]
    },

    run: async (bot, message, args) => {

        let description = args.join(" ");

        if (!description) {
            return message.reply({
                content: `> **É necessário informar uma descrição para o bug!  🙄**`,
                allowedMentions: { repliedUser: false },
                failIfNotExists: false
            });
        }

        if (description.length > 1000) {
            return message.reply({
                content: `> **A descrição não pode ser maior que 1000 caracteres!  🙄**`,
                allowedMentions: { repliedUser: false },
                failIfNotExists: false
            });
        }

        await new bot.database.bugReports({
            user_id            : message.author.id,
            user_name          : message.author.username,
            user_discriminator : message.author.discriminator,
            bug_description    : description,
            report_date        : Date.now(),
        })
        .save()
        .then(() => {
            return message.reply({
                content: `> **O bug foi reportado com sucesso! Obrigado pela sua contribuição.  🥰**`,
                allowedMentions: { repliedUser: false },
                failIfNotExists: false
            });
        });

    } 
    
}