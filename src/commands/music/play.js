
module.exports = { 

    help: {
        name: "play",
        aliases: ["p"]
    },

    run: async (bot, message, args) => {

        if(!message.member.voice.channel) {
            message.react("❎");
            return message.channel.send(`> **Você precisa estar em um canal pra poder executar esse comando...  😕**`);
        }

        let queue = bot.distube.getQueue(message);

        if(queue) {
            let queueChannel = queue.connection.channel.id;
            let userChannel = message.member.voice.channel.id

            if(queueChannel != userChannel) {
                message.react("❎");
                return message.channel.send("> **Não é possivel usar esse comando de um canal diferente!  😠**");
            } 
        }

        let music = args.join(" ");

        if(music.trim() == "") {
            return message.react("🤨");
        }

        message.channel.send(`> **Procurando por: \`${music}\` 🔍**`);
        return bot.distube.play(message, music);

    } 
    
}