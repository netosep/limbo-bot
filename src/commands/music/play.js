const { EmbedBuilder, ApplicationCommandType, Client, Interaction, ApplicationCommandOptionType } = require("discord.js");

module.exports = {

    name: "play",
    description: "Procura e reproduz a música pedida pelo nome ou por URL.",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "musica",
            description: "Nome da música ou URL do youtube/spotify/soundcloud.",
            type: ApplicationCommandOptionType.String,
            required: true,
            minLength: 3,
            maxLength: 100
        }
    ],
    /**
     *  @param {Client} client
     *  @param {Interaction} interaction
     */
    run: async (client, interaction) => {

        const voiceChannel = interaction.member?.voice?.channel;
        const option = interaction.options._hoistedOptions.pop();
        const song = option.value;

        if(!voiceChannel) return;

        try {
            client.distube.play(voiceChannel, song, {
                member: interaction.member,
                textChannel: interaction.channel,
                message: interaction.message
            })

            //console.log(client.distube);
        } catch (err) {
            console.error(err)
        }
        
    }
}