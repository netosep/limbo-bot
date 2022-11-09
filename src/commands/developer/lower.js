const { EmbedBuilder, ApplicationCommandType, Client, Interaction, ApplicationCommandOptionType } = require("discord.js");

module.exports = {

    name: "lower",
    description: "Coloca a frase em letras minúsculas.",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "frase",
            description: "Frase/Texto que queira converter para minúsculo.",
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],

    /**
     *  @param {Client} client
     *  @param {Interaction} interaction
     */
    run: async (client, interaction) => {

        const option = interaction.options._hoistedOptions.pop();
        const phrase = option.value.toLowerCase();
        const embed = new EmbedBuilder()
            .setAuthor({ name: "Converterno para minúsculo", iconURL: client.user.displayAvatarURL() })
            .setColor("BLACK")
            .setDescription(`
                > Prontinho ${interaction.user}! 😊 Aqui está 👇🏿
                \`\`\`${phrase}\`\`\`
            `);
        
        return interaction.reply({
            embeds: [embed],
            failIfNotExists: false
        });
        
    }
}