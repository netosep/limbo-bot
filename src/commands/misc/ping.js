const { EmbedBuilder, ApplicationCommandType, Client, Interaction } = require("discord.js");

module.exports = {

    name: "ping",
    description: "Mostra o tempo de resposta do bot.",
    type: ApplicationCommandType.ChatInput,

    /**
     *  @param {Client} client
     *  @param {Interaction} interaction
     */
    run: async (client, interaction) => {

        const embed = new EmbedBuilder()
            .setColor("BLACK")
            .setDescription("> **Pingando... ⏳**");

        return interaction.reply({ 
            embeds: [embed],
            failIfNotExists: false
        })
        .then((message) => {
            embed.setDescription(`> **Ping: \`${client.ws.ping}ms\` ⏱**`);
            return message.interaction.editReply({ embeds: [embed] });
        });
    }
}