const { bot } = require("../../index");
const { randomXP, levelUP } = require("../lib/experience");
const User = require("../utils/user");
const cooldownLvl = new Set();
const cooldownCmd = new Set();
const prefix = process.env.PREFIX;

bot.on("message", async (message) => {

    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    var targetUser = message.author;

    if(!cooldownLvl.has(targetUser.id)) {
        await User.findById(targetUser.id)
        .then(user => {
            if(user.id) {
                 var updatedUser = {
                    id          : targetUser.id,
                    name        : targetUser.username,
                    avatar_url  : targetUser.displayAvatarURL({ size: 1024 }),
                    xp          : randomXP(),
                    level       : levelUP(user) ? 1 : 0,
                    messages    : 1,
                }
                User.update(updatedUser);
                if(levelUP(user)) {
                    message.channel.send(`${message.author} upou para o level ${user.level+1}`)
                } 
            } else {
                 var insertUser = {
                    id          : targetUser.id,
                    guild_id    : message.guild.id,
                    name        : targetUser.username,
                    avatar_url  : targetUser.displayAvatarURL({ size: 1024 }),
                    xp          : randomXP(),
                    messages    : 1,
                }
                User.insert(insertUser);
            }
        })
        .catch((err) => {
            return console.error(err)
        });

        cooldownLvl.add(targetUser.id);
        setTimeout(() => {
            cooldownLvl.delete(targetUser.id);
        }, 60000);
    }

    /* if(message.content === `<@!${bot.user.id}>`){
        return message.channel.send("ola")
    } */

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