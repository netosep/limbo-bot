const { EmbedBuilder, ApplicationCommandType, Client, Interaction, ApplicationCommandOptionType } = require("discord.js");
const moment = require("moment");

module.exports = {

    name: "userinfo",
    description: "Mostra as suas informações do discord ou a de alguém mencionado.",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "user",
            description: "Usuário queira ver as informações.",
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
        const member = options.find((o) => o.name === 'user')?.member || interaction.member;
        const embed = new EmbedBuilder()
            .setColor("BLACK")
            .setThumbnail(member.displayAvatarURL({ size: 1024, dynamic: true }))
            .setAuthor({name: `Informações sobre ${member.user.username}`, iconURL: member.displayAvatarURL()})
            .setDescription(`
                > ▫ Nome: **${member.user.username}#${member.user.discriminator}**
                > ▫ Nick no servidor: **${member.nickname || member.user.username}**
                > ▫ Membro do servidor desde: **${moment(member.joinedTimestamp).format("DD/MM/YYYY")}**
                > ▫ Conta criada em: **${moment(member.user.createdTimestamp).format("DD/MM/YYYY")}**
                > ▫ ID único: \`${member.user.id}\`
            `)
            .setFooter({text: `© ${client.user.username} `, iconURL: client.user.displayAvatarURL()})
            .setTimestamp();

        return interaction.reply({ embeds: [embed] });
        
    }
}