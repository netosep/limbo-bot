
module.exports = { 

    help: {
        name: "volume",
        aliases: ["v", "vol"]
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
            let volume = args[0];
            
            if(parseInt(volume)) {
                if(volume < 1) message.react("😶");
                if(volume > 0 && volume < 100) message.react("🌀");
                if(volume >= 100 && volume < 200) message.react("😁");
                if(volume >= 300 && volume < 400) message.react("😅");
                if(volume >= 400 && volume < 500) message.react("🤪");
                if(volume >= 500 && volume < 1000) message.react("🤑");
                if(volume >= 1000 && volume < 5000) message.react("🥵");
                if(volume >= 5000 && volume < 10000) message.react("🥴");
                if(volume >= 10000 && volume < 50000) message.react("😵");
                if(volume >= 50000) message.react("🤯");
                if(!volume) return message.react("🤨");

                message.channel.send(`> **Novo volume: \`${volume}\` 🔊**`);
                return bot.distube.setVolume(message, volume);
            } else {
                return message.react("❎");
            }
        } else {
            message.react("❎");
            return message.channel.send("> **Que eu saiba, não estou tocando nada nesse servidor...  🙄**");
        }
    
    } 
    
}