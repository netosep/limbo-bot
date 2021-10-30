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
                return message.reply("> **Não é possivel reproduzir texto enquanto estou tocando uma música!  🙄**");
            }
        }
        
        let string = args.join(" ");
        let voiceChannel = message.member.voice.channel;

        if(string.length < 1) {
            return message.reply("> **Mensagem inválida!**");
        }

        if(string.length > 550) {
            return message.reply("> **A mensagem contém muitos caracteres! Limite: \`550\` 😶**");
        }

        if(!voiceChannel) {
            return message.reply("> **Você precisa estar em um canal de voz para executar esse comando!**");
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
                message.reply("> **Ocorreu um erro ao reproduzir o texto... 🤕**");
            }
        })
        .catch((err) => {
            console.error(err);
            return message.reply("> **Ocorreu um erro ao executar o comando... 🤕**");
        });

    } 
    
}