const { client } = require("../../index");
const { EmbedBuilder } = require("discord.js");

client.on("messageCreate", async (message) => {

    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    if (message.content === `<@${client.user.id}>`) {
        const embed = new EmbedBuilder()
            .setColor("BLACK")
            .setAuthor({
                name: `Salve ${message.author.username} ✌🏿`, 
                iconURL: message.author.displayAvatarURL({ dynamic: true })
            })
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setDescription(`
                > ▫ **Me chamo ${client.user}! Precisa de ajuda?**
                > ▫ Digite \`/help\` para ver os comandos disponíveis.
            `);

        return message.reply({ 
            embeds: [embed],
            failIfNotExists: false
        });
    }

});