
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
            return message.reply({
                content: "> **Você precisa estar em um canal pra poder executar esse comando...  😕**",
                allowedMentions: { repliedUser: false },
                failIfNotExists: false 
            });
        }

        let queue = bot.distube.getQueue(message);

        if(queue) {
            let queueChannel = queue.voiceChannel.id;
            let userChannel = message.member.voice.channel.id;

            if(queueChannel != userChannel) {
                return message.reply({
                    content: "> **Não é possivel usar esse comando de um canal diferente!  😠**",
                    allowedMentions: { repliedUser: false },
                    failIfNotExists: false 
                });
            } 
            if(queue.playing) {
                message.reply({
                    content: `> **Reprodução em pausa ⏸**`,
                    allowedMentions: { repliedUser: false },
                    failIfNotExists: false 
                })
                return bot.distube.pause(message);
            }
            if(queue.paused) {
                message.reply({
                    content: "> **Retornando a reprodução ⏯**",
                    allowedMentions: { repliedUser: false },
                    failIfNotExists: false 
                });
                return bot.distube.resume(message);
            }
        } else {
            return message.reply({
                content: "> **Que eu saiba, não estou tocando nada nesse servidor...  🙄**",
                allowedMentions: { repliedUser: false },
                failIfNotExists: false 
            });
        }

    } 
    
}