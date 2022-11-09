const { EmbedBuilder, ApplicationCommandType, Client, Interaction } = require("discord.js");
const moment = require("moment");

module.exports = {

    name: "serverinfo",
    description: "Mostra as informações do servidor do discord.",
    type: ApplicationCommandType.ChatInput,

    /**
     *  @param {Client} client
     *  @param {Interaction} interaction
     */
    run: async (client, interaction) => {

        const guild = interaction.guild;
        const embed = new EmbedBuilder()
            .setThumbnail(guild.iconURL())
            .setAuthor({name: `Informações sobre o servidor ${guild.name}`, iconURL: guild.iconURL()})
            .setDescription(`
                > ▫ Nome: **${guild.name}**
                > ▫ Dono: **<@!${guild.ownerId}>**
                > ▫ Membros: **${guild.memberCount}**
                > ▫ Cargos: **${guild.roles.cache.size}**
                > ▫ Canais: **${guild.channels.cache.size}**
                > ▫ Criado em: **${moment(guild.createdAt).format("DD/MM/YYYY")}**
                > ▫ ID único: \`${guild.id}\`
            `)
            .setFooter({text: `© ${client.user.username} `, iconURL: client.user.displayAvatarURL()})
            .setColor("BLACK")
            .setTimestamp();

        return interaction.reply({ embeds: [embed] }); 
        
    }
}