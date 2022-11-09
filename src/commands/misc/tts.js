const { ApplicationCommandOptionType, ApplicationCommandType, Client, Interaction } = require("discord.js");
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require("@discordjs/voice");
const axios = require("axios");

module.exports = {

    name: "tts",
    description: "Fala no canal o texto digitado. 9?",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "mensagem",
            description: "Frase que deve ser falada.",
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
        const message = option.value;
        const voiceChannel = interaction.member.voice.channel;
        
        await axios({
            method: "POST",
            url: "https://streamlabs.com/polly/speak",
            data: {
                text: message,
                voice: "Ricardo"
            }
        })
        .then(({ data }) => {
            try {
                const connection = joinVoiceChannel({
                    channelId: voiceChannel.id,
                    guildId: interaction.guildId,
                    adapterCreator: interaction.guild.voiceAdapterCreator
                });

                const player = createAudioPlayer();
                const resource = createAudioResource(data.speak_url, { inlineVolume: true });

                resource.volume.setVolume(10);
                connection.subscribe(player);

                console.log(data.speak_url);

                player.play(resource);

                interaction.reply('XD')

                player.on("idle", () => {
                    setTimeout(() => {
                        connection.destroy();
                    }, 3000);
                });

            } catch(err) {
                console.error(err);
                // message.reply({
                //     content: "> **Ocorreu um erro ao reproduzir o texto... 🤕**",
                //     allowedMentions: { repliedUser: false },
                //     failIfNotExists: false
                // });
            }
        })
        // .catch((err) => {
        //     console.error(err);
        //     return message.reply({
        //         content: "> **Ocorreu um erro ao executar o comando... 🤕**",
        //         allowedMentions: { repliedUser: false },
        //         failIfNotExists: false
        //     });
        // });
    }
}