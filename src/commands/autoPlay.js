
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
            message.react("❎");
            return message.channel.send(`> **${message.author}, você precisa estar em um canal pra poder executar esse comando...  😕**`);
        }

        if(bot.distube.isPlaying(message)) {
            let mode = bot.distube.toggleAutoplay(message);
            message.react("✅");
            message.channel.send(`> **Autoplay: \`${mode ? "ON" : "OFF"}\`**`);
        } else {
            message.channel.send("> **Que eu saiba, não estou tocando nada nesse servidor...  🙄**");
        }

    } 
    
}