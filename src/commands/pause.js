
module.exports = { 

    help: {
        name: "pause",
        aliases: ["pausar"]
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
            message.react("⏸");
            message.channel.send(`> **Pausei ⏸**`);
            return bot.distube.pause(message);
        } 

        if(bot.distube.isPaused(message)) {
            message.react("⏸");
            return message.channel.send(`> **Já estou pausado 😒**`);
        } 

        if(!bot.distube.isPlaying(message)){
            return message.channel.send("> **Que eu saiba, não estou tocando nada nesse servidor...  🙄**");
        }

    } 
    
}