
module.exports = { 

    help: {
        name: "skip",
        aliases: ["s", "next", "fs"]
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
            message.react("⏭");
            message.channel.send(`> **Próxima música... ⏭**`);
            bot.distube.skip(message);
        } else {
            message.react("❎");
            message.channel.send("> **Que eu saiba, não estou tocando nada nesse servidor...  🙄**");
        }

    } 
    
}