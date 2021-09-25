
module.exports = { 

    help: {
        name: "resume",
        aliases: ["res", "unpause", "up"]
    },

    run: async (bot, message, args) => {

        if(!message.member.voice.channel) {
            message.react("❎");
            return message.channel.send(`> **Você precisa estar em um canal pra poder executar esse comando...  😕**`);
        }

        let queue = bot.distube.getQueue(message);

        if(queue) {
            let queueChannel = queue.connection.channel.id;
            let userChannel = message.member.voice.channel.id

            if(queueChannel != userChannel) {
                message.react("❎");
                return message.channel.send("> **Não é possivel usar esse comando de um canal diferente!  😠**");
            } 
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