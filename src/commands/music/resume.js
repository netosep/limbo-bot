
module.exports = { 

    help: {
        name: "resume",
        usage: ["resume", "unpause"],
        description: "Resume a reprodução da música que estava pausada.",
        accessableBy: "Todos os membros.",
        aliases: ["res", "unpause", "unp"]
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
            let userChannel = message.member.voice.channel.id;

            if(queueChannel != userChannel) {
                return message.reply({
                    content: "> **Não é possivel usar esse comando de um canal diferente!  😠**",
                    allowedMentions: { repliedUser: false } 
                });
            } 
            if(queue.paused) {
                message.reply({
                    content: "> **Retornando a reprodução ⏯**",
                    allowedMentions: { repliedUser: false } 
                });
                return bot.distube.resume(message);
            } else {
                return message.reply({
                    content: "> **Já estou tocando ✌**",
                    allowedMentions: { repliedUser: false } 
                });
            }
        } else {
            return message.reply({
                content: "> **Que eu saiba, não estou tocando nada nesse servidor...  🙄**",
                allowedMentions: { repliedUser: false } 
            });
        }

    } 
    
}