const { bot } = require("../../index");
const { rankSystem } = require("../lib/rankSystem");
const { MessageEmbed } = require("discord.js");
require("dotenv").config();
// const cooldown = new Set();

bot.on("messageCreate", async (message) => {

    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    //if(message.author.id != process.env.BOT_OWNER_ID) return;

    let guildData = await bot.database.guildInfo.findOne({ guild_id: message.guild.id });

    if(!guildData) {
        await new bot.database.guildInfo({
            guild_id       : message.guild.id,
            guild_name     : message.guild.name,
            guild_owner_id : message.guild.ownerID,
            guild_icon_url : message.guild.iconURL({ size: 1024 })
        })
        .save()
        .then((guild) => { guildData = guild });
    }

    let prefix = guildData.guild_prefix || process.env.BOT_PREFIX;
    let user = message.author;

    // sistema de level
    if(guildData.enable_rank) rankSystem(bot, user, message);

    if(message.content === `<@!${bot.user.id}>`) {
        let embed = new MessageEmbed()
            .setColor("BLACK")
            .setAuthor(`Olá ${message.author.username}!`, message.author.displayAvatarURL({ dynamic: true }))
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .addField(`**Precisa de ajuda?**`, `
                > O meu prefixo nesse servidor é: \`${prefix}\`
                > Digite \`${prefix}help\` para ver os comandos disponíveis.
            `);

        return message.reply({ 
            embeds: [embed],
            failIfNotExists: false
        });
    }

    if(!message.content.startsWith(prefix)) return;
    // if(cooldown.has(message.author.id)) return;

    let args = message.content.slice(prefix.length).trim().split(" ");
    let commandTemp = args.shift().toLowerCase();
    let command;

    if(bot.commands.has(commandTemp)){
        command = bot.commands.get(commandTemp);
    } else {
        command = bot.commands.get(bot.aliases.get(commandTemp));
    }

    if(command) {
        cmdToRun = command.help.name;
        await bot.database.disabledCmds.findOne(
            { guild_id: message.guild.id, channel_id: message.channel.id }
        )
        .then((result) => {
            if(result) {
                if(result.commands.indexOf(cmdToRun) >= 0){
                    setTimeout(() => { message.delete().catch(() => { return }) }, 10000);
                    return message.reply("> **Esse comando foi desabilitado nesse canal!  🥱**")
                    .then((msg) => {
                        setTimeout(() => { msg.delete().catch(() => { return }) }, 10000);
                    });
                }
            }
            command.run(bot, message, args);
        });
    } else {
        // message.reply("> **Esse comando não existe!**");
    }

    // cooldown.add(message.author.id);
    // setTimeout(() => {
    //     cooldown.delete(message.author.id);
    // }, 3000);

});