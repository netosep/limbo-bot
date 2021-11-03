const axios = require("axios");
const { joinVoiceChannel, createAudioResource, createAudioPlayer } = require("@discordjs/voice");

module.exports = { 

    help: {
        name: "tts",
        usage: ["tts <frase para falar>"],
        description: "Fala no canal o texto digitado. 9?",
        accessableBy: "Todos os membros.",
        aliases: ["falar", "talk"]
    },

    run: async (bot, message, args) => {

        let queue = bot.distube.getQueue(message);

        if(queue) {
            if(queue.playing || queue.paused) {
                return message.reply({
                    content: "> **Não é possivel reproduzir texto enquanto estou tocando uma música!  🙄**",
                    allowedMentions: { repliedUser: false },
                    failIfNotExists: false
                });
            }
        }
        
        let string = args.join(" ");
        let voiceChannel = message.member.voice.channel;

        if(string.length < 1) {
            return message.reply({
                content: "> **Mensagem inválida!**",
                allowedMentions: { repliedUser: false },
                failIfNotExists: false
            });
        }

        if(string.length > 550) {
            return message.reply({
                content: "> **A mensagem contém muitos caracteres! Limite: \`550\` 😶**",
                allowedMentions: { repliedUser: false },
                failIfNotExists: false
            });
        }

        if(!voiceChannel) {
            return message.reply({
                content: "> **Você precisa estar em um canal de voz para executar esse comando!**",
                allowedMentions: { repliedUser: false },
                failIfNotExists: false
            });
        }

        await axios({
            method: "post",
            url: "https://streamlabs.com/polly/speak",
            data: {
                text: string,
                voice: "Ricardo"
            }
        })
        .then(({ data }) => {
            try {
                let connection = joinVoiceChannel({
                    channelId: voiceChannel.id,
                    guildId: message.guild.id,
                    adapterCreator: message.guild.voiceAdapterCreator
                });

                let player = createAudioPlayer();
                let resource = createAudioResource(data.speak_url, { inlineVolume: true });

                resource.volume.setVolume(1.5);
                connection.subscribe(player);

                message.react("🔊");
                player.play(resource);

                player.on("idle", () => {
                    setTimeout(() => {
                        connection.destroy();
                    }, 3000);
                });

            } catch(err) {
                console.error(err);
                message.reply({
                    content: "> **Ocorreu um erro ao reproduzir o texto... 🤕**",
                    allowedMentions: { repliedUser: false },
                    failIfNotExists: false
                });
            }
        })
        .catch((err) => {
            console.error(err);
            return message.reply({
                content: "> **Ocorreu um erro ao executar o comando... 🤕**",
                allowedMentions: { repliedUser: false },
                failIfNotExists: false
            });
        });

    } 
    
}