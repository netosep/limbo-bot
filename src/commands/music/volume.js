
module.exports = { 

    help: {
        name: "volume",
        usage: ["vol <0-100~>"],
        description: "Altera o volume da música em reprodução.",
        accessableBy: "Todos os membros.",
        aliases: ["v", "vol"]
    },

    run: async (bot, message, args) => {

        if(!message.member.voice.channel) {
            return message.reply(`> **Você precisa estar em um canal pra poder executar esse comando...  😕**`);
        }

        let queue = bot.distube.getQueue(message);

        if(queue) {
            let queueChannel = queue.voiceChannel.id;
            let userChannel = message.member.voice.channel.id

            if(queueChannel != userChannel) {
                return message.reply("> **Não é possivel usar esse comando de um canal diferente!  😠**");
            } 
            
            if(queue.playing || queue.paused) {
                let volume = args[0];

                if(!volume) {
                    return message.reply("> **Você precisa especificar um volume!  😕**");
                }
                if(parseInt(volume)) {
                    if(volume < 0) return message.react("😶");
                    if(volume > 0 && volume < 100) message.react("🌀");
                    if(volume >= 100 && volume < 200) message.react("😁");
                    if(volume >= 300 && volume < 400) message.react("😅");
                    if(volume >= 400 && volume < 500) message.react("🤪");
                    if(volume >= 500 && volume < 1000) message.react("🤑");
                    if(volume >= 1000 && volume < 5000) message.react("🥵");
                    if(volume >= 5000 && volume < 10000) message.react("🥴");
                    if(volume >= 10000 && volume < 50000) message.react("😵");
                    if(volume >= 50000) message.react("🤯");
    
                    message.reply(`> **Novo volume: \`${volume}\` 🔊**`);
                    return bot.distube.setVolume(queue, Number(volume));
                }
            }
        } else {
            return message.reply("> **Que eu saiba, não estou tocando nada nesse servidor...  🙄**");
        }
    
    } 
    
}