const { EmbedBuilder, ApplicationCommandType, Client, Interaction, ApplicationCommandOptionType, ChannelType } = require("discord.js");

module.exports = {

    name: "alert",
    description: "Envia uma mensagem de alerta para todos os servidores.",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "mensagem",
            description: "Mensagem de alerta que queira anunciar.",
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],

    /**
     *  @param {Client} client
     *  @param {Interaction} interaction
     */
    run: async (client, interaction) => {

        if (interaction.user.id != process.env.BOT_OWNER_ID) {
            return interaction.reply({
                content: `> **Negado! Esse comando só pode ser usado pelo desenvolvedor!  ⛔**`,
                ephemeral: true
            });
        }

        const option = interaction.options._hoistedOptions.pop();
        const alertMsg = option.value;
        const embed = new EmbedBuilder()
            .setColor("BLACK")
            .setAuthor({name: "Se liga no aviso:", iconURL: client.user.displayAvatarURL()})
            .setTitle(`> **${alertMsg}**`)
            .setTimestamp();

        client.guilds.cache.each(guild => {
            const channel = guild.channels.cache.filter((c) => c.type === ChannelType.GuildText).first();
            if (channel) return channel.send({ embeds: [embed] });
        });

        return interaction.reply({
            content: `> **O alerta foi enviado com sucesso para \`${client.guilds.cache.size}\` servidores!**  📩`,
            ephemeral: true
        });
        
    }
}