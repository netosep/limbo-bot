const { getAudioUrl } = require("google-tts-api")

module.exports = { 

    help: {
        name: "tts",
        aliases: ["falar", "talk"]
    },

    run: async (bot, message, args) => {
        
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

        var audioURL = await getAudioUrl(string, {
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