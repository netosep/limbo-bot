const { EmbedBuilder, ApplicationCommandType, Client, Interaction } = require("discord.js");

module.exports = {

    name: "invite",
    description: "Te envia o link de convite do bot.",
    type: ApplicationCommandType.ChatInput,

    /**
     *  @param {Client} client
     *  @param {Interaction} interaction
     */
    run: async (client, interaction) => {

        const PERMISSIONS_INTEGER = 8;
        const time = new Date();
        const inviteUrl = `https://discord.com/oauth2/authorize?=&client_id=${client.user.id}&scope=bot&permissions=${PERMISSIONS_INTEGER}`;
        const embed = new EmbedBuilder()
            .setColor("BLACK")
            .setAuthor({name: `Olá ${interaction.user.username}!`, iconURL: interaction.user.displayAvatarURL()})
            .setDescription(`> **[Clique aqui](${inviteUrl}) para poder me adicionar ao seu servidor!**`)
            .setFooter({
                text: `© ${client.user.username} - ${time.getFullYear()} | Todos os direitos reservados.`, 
                iconURL: client.user.displayAvatarURL()
            });

        interaction.user.send({ embeds: [embed] }).catch(() => { return });
        return interaction.reply({
            content: "> **Te mandei no privado  🤙🏿**",
            ephemeral: true
        });
        
    }
}