
module.exports = { 

    help: {
        name: "stop",
        aliases: ["st", "parar"]
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

        if(bot.distube.isPlaying(message)) {
            message.react("⏹");
            message.channel.send(`> **Parando reprodução... ⏹**`);
            bot.distube.stop(message);
        } else {
            message.channel.send("> **Que eu saiba, não estou tocando nada nesse servidor...  🙄**");
        }

    } 
    
}