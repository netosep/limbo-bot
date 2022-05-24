
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
            return message.reply({
                content: "> **Você precisa estar em um canal pra poder executar esse comando...  😕**",
                allowedMentions: { repliedUser: false },
                failIfNotExists: false 
            });
        }

        let queue = bot.distube.getQueue(message);

        if(queue) {
            let queueChannel = queue.voiceChannel.id;
            let userChannel = message.member.voice.channel.id;

            if(queueChannel != userChannel) {
                return message.reply({
                    content: "> **Não é possivel usar esse comando de um canal diferente!  😠**",
                    allowedMentions: { repliedUser: false },
                    failIfNotExists: false 
                });
            } 
            if(queue.playing) {
                if(!args[0]) {
                    let command = message.content.split(" ")[0];
                    let embed = new MessageEmbed()
                        .setColor("BLACK")
                        .setAuthor({name: "Filtros disponiveis:", iconURL: bot.user.displayAvatarURL()})
                        .setDescription(`
                            > **\`3d\` - \`bassboost\` - \`echo\` - \`karaoke\`
                            > \`nightcore\` - \`vaporwave\` - \`flanger\` 
                            > \`haas\` - \`reverse\` - \`surround\` - \`mcompand\`
                            > \`phaser\` - \`tremolo\` - \`earwax\` - \`gate\`**\n
                            > **• Dicas:** 
                            > Use **\`${command} 3d\`** para aplicar o efeito 3D.
                            > Use **\`${command} off\`** para desligar o efeito.
                        `);

                    return message.reply({ 
                        embeds: [embed],
                        allowedMentions: { repliedUser: false },
                        failIfNotExists: false 
                    });

                } else {
                    let filter = args[0].toLowerCase();
                    let filterList = [
                        "3d", "bassboost", "echo", "karaoke", "nightcore", 
                        "vaporwave", "flanger", "haas", "reverse", "surround", 
                        "mcompand", "phaser", "tremolo", "earwax", "gate", "off"
                    ];

                    if(!filterList.includes(filter)) {
                        return message.reply({
                            content: "> **Este filtro não existe!  😕**",
                            allowedMentions: { repliedUser: false },
                            failIfNotExists: false 
                        });
                    }
                    if(filter === "off") {
                        bot.distube.setFilter(queue, false, true);
                        return message.reply({
                            content: "> **Efeito desligado!  😉**",
                            allowedMentions: { repliedUser: false },
                            failIfNotExists: false 
                        });
                    }

                    bot.distube.setFilter(queue, filter, true);
                    return message.reply({
                        content: `> **Filtro aplicado: \`${filter.toUpperCase()}\`  ✅**`,
                        allowedMentions: { repliedUser: false },
                        failIfNotExists: false 
                    });
                }
            }
        } else {
            return message.reply({
                content: "> **Que eu saiba, não estou tocando nada nesse servidor...  🙄**",
                allowedMentions: { repliedUser: false },
                failIfNotExists: false 
            });
        }

    } 
    
}