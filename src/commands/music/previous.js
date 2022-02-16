
module.exports = { 

    help: {
        name: "previous",
        usage: ["previous", "anterior"],
        description: "Volta para a música anterior da fila.",
        accessableBy: "Todos os membros.",
        aliases: ["anteriror", "voltar", "ant"]
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

            return bot.distube.previous(message)
            .then(() => { 
                return message.reply({
                    content: "> **Voltando... ⏮**",
                    allowedMentions: { repliedUser: false },
                    failIfNotExists: false 
                });
            })
            .catch(() => {
                return message.reply({
                    content: "> **Não há nunhuma música antes dessa!**",
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