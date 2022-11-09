const { EmbedBuilder, ApplicationCommandType, Client, Interaction, ApplicationCommandOptionType } = require("discord.js");

module.exports = { 

    name: "avatar",
    description: "Mostra o seu avatar ou o de alguém mencionado.",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "user",
            description: "Usuário queira ver o avatar.",
            type: ApplicationCommandOptionType.User,
            required: false
        }
    ],

    /**
     *  @param {Client} client
     *  @param {Interaction} interaction
     */
    run: async (client, interaction) => {

        const options = interaction.options._hoistedOptions;
        const target = options.find((o) => o.name === 'user')?.user || interaction.user;
        const time = new Date();
        const embed = new EmbedBuilder()
            .setColor(process.env.EMBED_THEME_COLOR)
            .setImage(target.displayAvatarURL({ size: 4096, dynamic: true }))
            .setDescription(`
                > **Avatar de ${target}**
                > [Clique aqui](${target.displayAvatarURL({ size: 4096, dynamic: true })}) para baixar
            `)
            .setFooter({text: `© ${client.user.username} - ${time.getFullYear()}`, iconURL: client.user.displayAvatarURL()})
            .setTimestamp();
        
        return interaction.reply({ 
            embeds: [embed],
            failIfNotExists: false
        });

    } 
    
}