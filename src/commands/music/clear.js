
module.exports = { 

    help: {
        name: "clear",
        usage: ["clear", "limpar"],
        description: "Limpa a fila de músicas que está em reprodução.",
        accessableBy: "Todos os membros.",
        aliases: ["c", "limpar"]
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
            let queueLength = queue.songs.length;

            if(queueChannel != userChannel) {
                return message.reply({
                    content: "> **Não é possivel usar esse comando de um canal diferente!  😠**",
                    allowedMentions: { repliedUser: false },
                    failIfNotExists: false 
                });
            }
            if(queueLength > 1) {
                queue.songs = []; // limpando o array de músicas
                return message.reply({
                    content: `> **Todas as próximas \`${queueLength - 1}\` músicas foram removidas da fila...  🗑**`,
                    allowedMentions: { repliedUser: false },
                    failIfNotExists: false
                });
            } else {
                return message.reply({
                    content: "> **A fila está vazia...  🙁**",
                    allowedMentions: { repliedUser: false },
                    failIfNotExists: false
                });
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