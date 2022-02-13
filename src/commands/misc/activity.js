const { DiscordTogether } = require('discord-together');
const { MessageEmbed } = require("discord.js");

module.exports = { 

    help: {
        name: "activity",
        usage: ["activity <atividade>", "activity"],
        description: "Iniciar uma atividade em seu canal de voz.",
        accessableBy: "Todos os membros.",
        aliases: ["act", "atividade", "atv"]
    },

    run: async (bot, message, args) => {

        let activities = [
            "youtube", "poker", "betrayal", "fishing", 
            "chess", "lettertile", "wordsnack", 
            "doodlecrew", "awkword", "spellcast", "checkers",
            "puttparty", "sketchheads", "ocho"
        ];
        let discordTogether = new DiscordTogether(bot);
        let activity = args[0];
        let voiceChannel = message.member.voice.channel;
        let guildData = await bot.database.guildInfo.findOne({ guild_id: message.guild.id });
        let prefix = guildData.guild_prefix;

        let embed = new MessageEmbed()
            .setAuthor("Essas são as atividades disponíveis:", bot.user.displayAvatarURL())
            .setColor("BLACK")
            .setDescription(`
                > ▫ **Use \`${prefix}activity <atividade>\` para iniciar uma atividade!**\n
                > **\`Youtube\`**: assista vídeos no YouTube.
                > **\`Poker\`**: Jogue poker (Discord Boost Level 1).
                > **\`Betrayal\`**: Jogue um jogo de Trama estilo Among Us.
                > **\`Fishing\`**: Jogue um jogo de Pesca 🐟.
                > **\`Chess\`**: Jogue um jogo de Xadrez (Discord Boost Level 1).
                > **\`Lettertile\`**: Jogue um jogo de Letras (Discord Boost Level 1).
                > **\`Wordsnack\`**: Jogue um jogo de Palavras.
                > **\`Doodlecrew\`**: Jogue um jogo de Doodle.
                > **\`Awkword\`**: Jogue um jogo de Awkword (Beta).
                > **\`Spellcast\`**: Jogue um jogo de Castelo (Discord Boost Level 1).
                > **\`Checkers\`**: Jogue um jogo de Xadrez (Discord Boost Level 1).
                > **\`Puttparty\`**: Jogue um jogo de Putt (Beta).
                > **\`Sketchheads\`**: Jogue um jogo de Sketch.
                > **\`Ocho\`**: Jogue um jogo de Ocho (Discord Boost Level 1).
            `)
            .setFooter(`Discord Activities - © ${bot.user.username}`, "https://i.imgur.com/bF7ruPV.png");

        if(!activity) {
            return message.reply({
                embeds: [embed], 
                allowedMentions: { repliedUser: false },
                failIfNotExists: false
            });
        }

        if(!voiceChannel) {
            return message.reply({
                content: "> **Você precisa estar em um canal pra poder executar esse comando...  😕**",
                allowedMentions: { repliedUser: false },
                failIfNotExists: false 
            });
        }

        if(!activities.includes(activity.toLowerCase())) {
            return message.reply({
                content: "> **Você precisa escolher uma atividade válida...  😕**",
                allowedMentions: { repliedUser: false },
                failIfNotExists: false 
            });
        }

        discordTogether.createTogetherCode(voiceChannel.id, activity.toLowerCase()).then(invite => {
            return message.reply({
                content: `> **\`Sucesso! Use o link abaixo para iniciar a atividade:\`**\n> ▫ ${invite.code}`,
                allowedMentions: { repliedUser: false },
                failIfNotExists: false
            });
        });

    }
    
}