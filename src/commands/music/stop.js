
module.exports = { 

    help: {
        name: "stop",
        usage: ["stop", "leave"],
        description: "Para a reprodução da música e sai do canal.",
        accessableBy: "Todos os membros.",
        aliases: ["st", "parar", "leave"]
    },

    run: async (bot, message, args) => {

        if(!message.member.voice.channel) {
            return message.reply({
                content: "> **Você precisa estar em um canal pra poder executar esse comando...  😕**",
                allowedMentions: { repliedUser: false } 
            });
        }

        let queue = bot.distube.getQueue(message);

        if(queue) {
            let queueChannel = queue.voiceChannel.id;
            let userChannel = message.member.voice.channel.id

            if(queueChannel != userChannel) {
                return message.reply({
                    content: "> **Não é possivel usar esse comando de um canal diferente!  😠**",
                    allowedMentions: { repliedUser: false } 
                });
            } 
            if(queue.playing || queue.paused) {
                message.reply({
                    content: "> **Parando reprodução... ⏹**",
                    allowedMentions: { repliedUser: false } 
                });
                return bot.distube.stop(message);
            }
        } else {
            return message.reply({
                content: "> **Que eu saiba, não estou tocando nada nesse servidor...  🙄**",
                allowedMentions: { repliedUser: false } 
            });
        }

    } 
    
}