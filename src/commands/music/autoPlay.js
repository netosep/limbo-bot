
module.exports = { 

    help: {
        name: "autoplay",
        usage: ["autoplay"],
        description: "define a reprodução automatica para \`on/off\`.",
        accessableBy: "Todos os membros.",
        aliases: ["ap", "ra"]
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

            let mode = bot.distube.toggleAutoplay(queue);
            message.reply(`> **Autoplay: \`${mode ? "ATIVADO" : "DESATIVADO"}\`**`);

        } else {
            return message.reply("> **Que eu saiba, não estou tocando nada nesse servidor...  🙄**");
        }

    } 
    
}