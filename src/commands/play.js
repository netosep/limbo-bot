
module.exports = { 

    help: {
        name: "play",
        aliases: ["p"]
    },

    run: async (bot, message, args) => {

        if(!message.member.voice.channel) {
            message.react("❎");
            return message.channel.send(`> **${message.author}, você precisa estar em um canal pra poder executar esse comando...  😕**`);
        }

        let music = args.join(" ");

        if(music.trim() == "") {
            return message.react("🤨");
        }

        message.channel.send(`> **🔍 Procurando por: \`${music}\`**`);
        return bot.distube.play(message, music);

    } 
    
}