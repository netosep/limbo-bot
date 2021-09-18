
module.exports = { 

    help: {
        name: "resume",
        aliases: ["res", "unpause", "up"]
    },

    run: async (bot, message, args) => {

        if(!message.member.voice.channel) {
            message.react("❎");
            return message.channel.send(`
                > **Foi mal ai ${message.author} 😞
                > Você precisa estar em um canal pra poder executar esse comando...  😕**
            `);
        }

        if(bot.distube.isPaused(message)) {
            message.react("⏯");
            message.channel.send(`> **Retornando a reprodução ⏯**`);
            return bot.distube.resume(message);
        } 
        
        if(bot.distube.isPlaying(message)){
            message.react("⏯");
            return message.channel.send("> **Já estou tocando ✌**")
        } else {
            return message.channel.send("> **Que eu saiba, não estou tocando nada nesse servidor...  🙄**");
        }

    } 
    
}