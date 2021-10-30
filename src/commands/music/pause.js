
module.exports = { 

    help: {
        name: "pause",
        usage: ["pause"],
        description: "Pausa/Resume uma música em reprodução.",
        accessableBy: "Todos os membros.",
        aliases: ["pausar"]
    },

    run: async (bot, message, args) => {

        if(!message.member.voice.channel) {
            return message.reply(`> **Você precisa estar em um canal pra poder executar esse comando...  😕**`);
        }

        let queue = bot.distube.getQueue(message);

        if(queue) {
            let queueChannel = queue.voiceChannel.id;
            let userChannel = message.member.voice.channel.id;

            if(queueChannel != userChannel) {
                return message.reply("> **Não é possivel usar esse comando de um canal diferente!  😠**");
            } 
            if(queue.playing) {
                message.reply(`> **Pausei ⏸**`);
                return bot.distube.pause(message);
            }
            if(queue.paused) {
                message.reply(`> **Retornando a reprodução ⏯**`);
                return bot.distube.resume(message);
            }
        } else {
            return message.reply("> **Que eu saiba, não estou tocando nada nesse servidor...  🙄**");
        }

    } 
    
}