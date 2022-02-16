
module.exports = { 

    help: {
        name: "play",
        usage: ["play", "p <nome/link>"],
        description: "Procura e reproduz a música pedida.",
        accessableBy: "Todos os membros.",
        aliases: ["p"]
    },

    run: async (bot, message, args) => {

        let voiceChannel = message.member.voice.channel;
        if(!voiceChannel) {
            return message.reply({
                content: "> **Você precisa estar em um canal pra poder executar esse comando...  😕**",
                allowedMentions: { repliedUser: false },
                failIfNotExists: false 
            });
        }

        let queue = bot.distube.getQueue(message);

        if(queue) {
            let queueChannel = queue.voiceChannel.id;
            let userChannel = voiceChannel.id

            if(queueChannel != userChannel) {
                return message.reply({
                    content: "> **Não é possivel usar esse comando de um canal diferente!  😠**",
                    allowedMentions: { repliedUser: false },
                    failIfNotExists: false 
                });
            } 
        }

        let musicParams = args.join(" ").trim();
        if(!musicParams) return message.react("🤨");
        let string = "Procurando por";
        if(musicParams.startsWith("http")) string = "Acessando url";

        message.reply({
            content: `> **${string}: \`${musicParams}\` 🔍**`,
            allowedMentions: { repliedUser: false },
            failIfNotExists: false 
        });

        return bot.distube.play(voiceChannel, musicParams , {
            member: message.member,
            textChannel: message.channel,
            message: message
        });
        
    } 
    
}