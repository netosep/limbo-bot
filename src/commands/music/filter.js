
module.exports = { 

    help: {
        name: "filter",
        aliases: ["fill", "effect"]
    },

    run: async (bot, message, args) => {

        if(message.author.id != process.env.BOT_OWNER_ID) return;

        if(!message.member.voice.channel) {
            message.react("❎");
            return message.channel.send(`> **${message.author}, você precisa estar em um canal pra poder executar esse comando...  😕**`);
        }

        if(bot.distube.isPlaying(message)) {
            let filter = args[0];

            if(!filter) {
                return message.channel.send("filtros: \`3d\`, \`bassboost\`, \`echo\`, \`karaoke\`, \`nightcore\`, \`vaporwave\`, \`flanger\`, \`gate\`, \`haas\`, \`reverse\`, \`surround\`, \`mcompand\`, \`phaser\`, \`tremolo\`, \`earwax\`")
            }
            
            bot.distube.setFilter(message, filter);
        } else {
            message.react("❎");
            return message.channel.send("> **Que eu saiba, não estou tocando nada nesse servidor...  🙄**");
        }
    
    } 
    
}