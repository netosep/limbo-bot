const axios = require("axios");

module.exports = { 

    help: {
        name: "tts",
        usage: ["tts <frase para falar>"],
        description: "Fala no canal o texto digitado. 9?",
        accessableBy: "Todos os membros.",
        aliases: ["falar", "talk"]
    },

    run: async (bot, message, args) => {

        if(bot.distube.isPaused(message) || bot.distube.isPlaying(message)) {
            return message.channel.send("> **Não é uma boa hora pra usar esse comando...**")
        }
        
        var string = args.join(" ");
        var voiceChannel = message.member.voice.channel;

        if(string.length < 1) {
            message.react("🔇");
            return message.channel.send("mensagem inválida!")
        }

        if(string.length > 550) {
            message.react("🔇");
            return message.channel.send("> A mensagem contém muitos caracteres! Limite: \`550\` 😶");
        }

        if(!voiceChannel) {
            message.react("🔇");
            return message.channel.send("você precisa estar em um canal de voz!")
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
                voiceChannel.join().then(connection => {
                    message.react("🔊")
                    var dispacher = connection.play(data.speak_url);
                    dispacher.on("finish", () => {
                        setTimeout(() => {
                            voiceChannel.leave()
                        }, 3000)
                    })
                })
            } catch (error) {
                console.error(error);
                message.channel.send("> **Ocorreu um erro ao reproduzir o texto... 🤕**");
            }
        })
        .catch((err) => {
            console.error(err);
            return message.channel.send("> **Ocorreu um erro ao executar o comando... 🤕**");
        })

    } 
    
}