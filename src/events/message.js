const { bot } = require("../../index");
const { randomXP } = require("../lib/experience");
const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const User = require("../utils/userQuery");
const Rank = require("../utils/rankQuery");
const Guild = require("../utils/guildQuery");
const cooldownLvl = new Set();
const cooldownCmd = new Set();

bot.on("message", async (message) => {

    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    var targetUser = message.author;
    var prefix;

    await Guild.findById(message.guild.id)
    .then((guild) => {
        if(guild.id) {
            prefix = guild.prefix;
        } else {
            prefix = config.prefix;
        }
    })
    .catch((err) => {
        console.error(err);
    });

    if(!cooldownLvl.has(targetUser.id)) {
        await User.findById(targetUser.id)
        .then(async (user) => {
            if(user.id) {
                var updateUser = {
                    id          : targetUser.id,
                    name        : targetUser.username,
                    avatar_url  : targetUser.displayAvatarURL({ size: 1024 }),
                    rank : {
                        guild_id : message.guild.id,
                        xp       : randomXP()
                    }
                }
                User.update(updateUser);
                Rank.updateXP(updateUser);

                await Rank.findByIds(user.id, message.guild.id)
                .then((rank) => {
                    if(rank.xp >= rank.nxt_lvl_xp) {
                        Rank.updateLevel(updateUser)
                        //message.channel.send(`${targetUser} upou para o level ${rank.level+1}`);
                    }
                })
                .catch((err) => {
                    return console.error(err);
                });

            } else {
                var insertUser = {
                    id         : targetUser.id,
                    name       : targetUser.username,
                    avatar_url : targetUser.displayAvatarURL({ size: 1024 }),
                    guild_id   : message.guild.id,
                    rank : {
                        xp         : randomXP(),
                        nxt_lvl_xp : 100,
                        messages   : 1
                    }
                }
                User.insert(insertUser);
                Rank.insert(insertUser);
            }
        })
        .catch((err) => {
            return console.error(err);
        });

        cooldownLvl.add(targetUser.id);
        setTimeout(() => {
            cooldownLvl.delete(targetUser.id);
        }, 60000);
    }

    if(message.content === `<@!${bot.user.id}>`) {
        var embed = new MessageEmbed();
        return message.channel.send(message.author, embed
            .setAuthor(`Olá ${message.author.username}!`, message.author.displayAvatarURL({ dynamic: true }))
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .addField('**Precisa de ajuda?**',
                      `> O meu prefixo nesse servidor é: \`${prefix}\`
                       > Digite \`${prefix}help\` para ver os comandos disponíveis.`)
        ).catch(() => { return });
    }

    if(cooldownCmd.has(message.author.id)) {
        return;
    } else{
        cooldownCmd.add(message.author.id);
        setTimeout(() => {
            cooldownCmd.delete(message.author.id);
        }, 5000);
    }

    var args = message.content.slice(prefix.length).trim().split(" ");
    var commandTemp = args.shift().toLowerCase();
    var command;

    if(!message.content.startsWith(prefix)) return;

    if(bot.commands.has(commandTemp)){
        command = bot.commands.get(commandTemp);
    } else {
        command = bot.commands.get(bot.aliases.get(commandTemp));
    }

    if(command) {
        command.run(bot, message, args);
    } else {
        /* message.channel.send("esse comando não existe") */
    }

});