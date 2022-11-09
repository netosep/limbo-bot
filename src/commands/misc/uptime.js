const { EmbedBuilder, ApplicationCommandType, Client, Interaction } = require("discord.js");
const ms = require("ms-pt-br");

module.exports = {

    name: "uptime",
    description: "Mostra o tempo online do bot.",
    type: ApplicationCommandType.ChatInput,

    /**
     *  @param {Client} client
     *  @param {Interaction} interaction
     */
    run: async (client, interaction) => {
        
        return interaction.reply({ 
            embeds: [
                new EmbedBuilder()
                    .setColor("BLACK")
                    .setDescription(`**> Estou online a \`${ms(client.uptime, { long: true })}\` ⏳**`)
                ] 
        });
        
    }
}