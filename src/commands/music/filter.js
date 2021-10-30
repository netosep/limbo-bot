
const { MessageEmbed } = require("discord.js");
require("dotenv").config();

module.exports = { 

    help: {
        name: "filter",
        usage: ["filter", "fill <filter>"],
        description: "Aplica um efeito na música em reprodução",
        accessableBy: "Somente do desenvolvedor.",
        aliases: ["fill", "effect"]
    },

    run: async (bot, message, args) => {

        if(message.author.id != process.env.BOT_OWNER_ID) return;

        if(!message.member.voice.channel) {
            return message.reply("> **Você precisa estar em um canal pra poder executar esse comando...  😕**");
        }

        let queue = bot.distube.getQueue(message);

        if(queue) {
            let queueChannel = queue.voiceChannel.id;
            let userChannel = message.member.voice.channel.id;

            if(queueChannel != userChannel) {
                return message.reply("> **Não é possivel usar esse comando de um canal diferente!  😠**");
            } 
            if(queue.playing) {
                if(!args[0]) {
                    let command = message.content.split(" ")[0];
                    let embed = new MessageEmbed()
                        .setColor("BLACK")
                        .setAuthor("Filtros disponiveis:", bot.user.displayAvatarURL())
                        .setDescription(`
                            > **\`3d\` - \`bassboost\` - \`echo\` - \`karaoke\`
                            > \`nightcore\` - \`vaporwave\` - \`flanger\` 
                            > \`haas\` - \`reverse\` - \`surround\` - \`mcompand\`
                            > \`phaser\` - \`tremolo\` - \`earwax\` - \`gate\`**\n
                            > **• Dicas:** 
                            > Use **\`${command} 3d\`** para aplicar o efeito 3D.
                            > Use **\`${command} off\`** para desligar o efeito.
                        `);
                    return message.reply({ embeds: [embed] });
                } else {
                    let filter = args[0].toLowerCase();
                    let filterList = [
                        "3d", "bassboost", "echo", "karaoke", "nightcore", 
                        "vaporwave", "flanger", "haas", "reverse", "surround", 
                        "mcompand", "phaser", "tremolo", "earwax", "gate", "off"
                    ];

                    if(!filterList.includes(filter)) {
                        return message.reply("> **Este filtro não existe!  😕**");
                    }
                    if(filter === "off") filter = false;
                    
                    return bot.distube.setFilter(queue, filter, true);
                }
            }
        } else {
            return message.reply("> **Que eu saiba, não estou tocando nada nesse servidor...  🙄**");
        }

    } 
    
}