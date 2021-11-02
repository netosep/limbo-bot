
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

            let mode = bot.distube.toggleAutoplay(queue);
            message.reply({
                content: `> **🔄 Autoplay: \`${mode ? "ATIVADO" : "DESATIVADO"}\`**`,
                allowedMentions: { repliedUser: false } 
            });

        } else {
            return message.reply({
                content: "> **Que eu saiba, não estou tocando nada nesse servidor...  🙄**",
                allowedMentions: { repliedUser: false } 
            });
        }

    } 
    
}