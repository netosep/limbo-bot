
module.exports = { 

    help: {
        name: "play",
        usage: ["play", "p <nome/link>"],
        description: "Procura e reproduz a música pedida.",
        accessableBy: "Todos os membros.",
        aliases: ["p"]
    },

    run: async (bot, message, args) => {

        if(!message.member.voice.channel) {
            return message.reply("> **Você precisa estar em um canal pra poder executar esse comando...  😕**");
        }

        let queue = bot.distube.getQueue(message);

        if(queue) {
            let queueChannel = queue.voiceChannel.id;
            let userChannel = message.member.voice.channel.id

            if(queueChannel != userChannel) {
                return message.reply("> **> **Não é possivel usar esse comando de um canal diferente!  😠**");
            } 
        }

        let song = args.join(" ").trim();
        if(!song) return message.react("🤨");
        let string = "Procurando por";
        if(song.startsWith("http")) string = "Acessando url";

        message.reply(`> **${string}: \`${song}\` 🔍**`);
        return bot.distube.play(message, song);
        
    } 
    
}