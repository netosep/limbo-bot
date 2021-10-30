
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
            return message.reply(`> **Você precisa estar em um canal pra poder executar esse comando...  😕**`);
        }

        let queue = bot.distube.getQueue(message);

        if(queue) {
            let queueChannel = queue.voiceChannel.id;
            let userChannel = message.member.voice.channel.id;

            if(queueChannel != userChannel) {
                return message.reply("> **Não é possivel usar esse comando de um canal diferente!  😠**");
            } 

            return bot.distube.skip(message)
            .then(() => { 
                return message.reply(`> **Próxima música... ⏭**`);
            })
            .catch(() => {
                queue.voice.leave();
                return message.reply(`> **Não há próxima música! Parando reprodução... ⏹**`);
            });

        } else {
            return message.reply("> **Que eu saiba, não estou tocando nada nesse servidor...  🙄**");
        }

    } 
    
}