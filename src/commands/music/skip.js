
module.exports = { 

    help: {
        name: "skip",
        usage: ["skip", "s"],
        description: "Pula para a próxima música da fila.",
        accessableBy: "Todos os membros.",
        aliases: ["s", "next", "fs"]
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

            return bot.distube.skip(message)
            .then(() => { 
                return message.reply({
                    content: "> **Próxima música... ⏭**",
                    allowedMentions: { repliedUser: false },
                    failIfNotExists: false 
                });
            })
            .catch(() => {
                queue.voice.leave();
                return message.reply({
                    content: "> **Não há próxima música! Parando reprodução... ⏹**",
                    allowedMentions: { repliedUser: false },
                    failIfNotExists: false 
                });
            });

        } else {
            return message.reply({
                content: "> **Que eu saiba, não estou tocando nada nesse servidor...  🙄**",
                allowedMentions: { repliedUser: false },
                failIfNotExists: false 
            });
        }

    } 
    
}