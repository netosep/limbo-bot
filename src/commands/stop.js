
module.exports = { 

    help: {
        name: "stop",
        aliases: ["st", "parar"]
    },

    run: async (bot, message, args) => {

        if(!message.member.voice.channel) {
            message.react("❎");
            return message.channel.send(`
                > **Foi mal ai ${message.author} 😞
                > Você precisa estar em um canal pra poder executar esse comando...  😕**
            `);
        }

        if(bot.distube.isPlaying(message)) {
            message.react("⏹");
            message.channel.send(`> **Parando reprodução... ⏹**`);
            bot.distube.stop(message);
        } else {
            message.channel.send("> **Que eu saiba, não estou tocando nada nesse servidor...  🙄**");
        }

    } 
    
}