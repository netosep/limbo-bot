const { getAudioUrl } = require("google-tts-api")

module.exports = { 

    help: {
        name: "tts",
        aliases: ["falar", "talk"]
    },

    run: (bot, message, args) => {

        if(bot.distube.isPaused(message) || bot.distube.isPlaying(message)) {
            return message.channel.send("> **Não é uma boa hora pra usar esse comando...**")
        }
        
        var string = args.join(" ");
        var voiceChannel = message.member.voice.channel;

        if(string.length < 1) {
            message.react("🔇");
            return message.channel.send("mensagem inválida!")
        }

        if(string.length > 200) {
            message.react("🔇");
            return message.channel.send("mensagem inválida! (muito grande)")
        }

        if(!voiceChannel) {
            message.react("🔇");
            return message.channel.send("você precisa estar em um canal de voz!")
        }

        var audioURL = getAudioUrl(`${message.author.username} disse: ${string}`, {
            lang: "pt",
            host: "https://translate.google.com"
        });

        try {
            voiceChannel.join().then(connection => {
                message.react("🔊")
                var dispacher = connection.play(audioURL);
                dispacher.on("finish", () => {
                    voiceChannel.leave()
                })
            })
        } catch (error) {
            message.channel.send("erro")
        }

    } 
    
}