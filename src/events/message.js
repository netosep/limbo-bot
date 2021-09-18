const env = require("dotenv");
const { bot } = require("../../index");
const { randomXP } = require("../lib/experience");
const { MessageEmbed } = require("discord.js");
const levelCooldown = new Set();
// const commandCoodown = new Set();

env.config();

bot.on("message", async (message) => {

    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    //if(message.author.id != process.env.BOT_OWNER_ID) return;

    let guildData = await bot.database.guildInfo.findOne({ guild_id: message.guild.id });
    let prefix = guildData.guild_prefix || process.env.BOT_PREFIX;
    let targetUser = message.author;

    if(message.content === `<@!${bot.user.id}>`) {
        let embed = new MessageEmbed();
        return message.channel.send(message.author, embed
            .setAuthor(`Olá ${message.author.username}!`, message.author.displayAvatarURL({ dynamic: true }))
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .addField('**Precisa de ajuda?**',
                      `> O meu prefixo nesse servidor é: \`${prefix}\`
                       > Digite \`${prefix}help\` para ver os comandos disponíveis.`)
        ).catch(() => { return });
    }

    if(!message.content.startsWith(prefix)) return;
    // if(commandCoodown.has(message.author.id)) return;

    let args = message.content.slice(prefix.length).trim().split(" ");
    let commandTemp = args.shift().toLowerCase();
    let command;

    if(bot.commands.has(commandTemp)){
        command = bot.commands.get(commandTemp);
    } else {
        command = bot.commands.get(bot.aliases.get(commandTemp));
    }

    if(command) {
        command.run(bot, message, args);
    } else {
        // message.channel.send("esse comando não existe")
    }

    // commandCoodown.add(message.author.id);
    // setTimeout(() => {
    //     commandCoodown.delete(message.author.id);
    // }, 3000);

    // ******************************************************* //
    //                     rank system                         //
    // ******************************************************* //
    if(guildData.enable_rank) {
        
        if(levelCooldown.has(targetUser.id)) return;

        await bot.database.userInfo.findOne({ user_id: targetUser.id })
        .then(async (user) => {
            if(user) {
                await bot.database.rankInfo.findOne(
                    { 
                        user_id : targetUser.id, 
                        guild_id : message.guild.id 
                    }
                )
                .then(async (userRank) => {
                    let xpToAdd = randomXP();
                    if(userRank) {
                        await bot.database.rankInfo.updateOne(
                            {   // filter
                                user_id  : targetUser.id,
                                guild_id : message.guild.id 
                            },
                            {   // values
                                experience  : userRank.experience + xpToAdd,
                                messages : userRank.messages + 1
                            }
                        );

                        if((userRank.experience + xpToAdd) >= userRank.next_level_exp) {
                            await bot.database.rankInfo.updateOne(
                                {
                                    user_id  : targetUser.id,
                                    guild_id : message.guild.id 
                                },
                                {
                                    level          : userRank.level + 1,
                                    next_level_exp : Math.round(userRank.next_level_exp * 2.5)
                                }
                            );
                            message.channel.send(`${targetUser} upou para o level ${userRank.level+1}`);
                        }

                    } else {
                        await new bot.database.rankInfo({
                            user_id    : targetUser.id,
                            guild_id   : message.guild.id,
                            experience : xpToAdd,
                            messages   : 1
                        }).save();
                    }

                })
                .catch((err) => {
                    return console.error(err)
                });

            } else {
                await new bot.database.userInfo({
                    user_id         : targetUser.id,
                    user_name       : targetUser.username,
                    user_avatar_url : targetUser.displayAvatarURL({ size: 1024 })
                }).save();

                await new bot.database.rankInfo({
                    user_id    : targetUser.id,
                    guild_id   : message.guild.id,
                    experience : randomXP(),
                    messages   : 1
                }).save();
            }
        })
        .catch((err) => {
            return console.error(err);
        });

        levelCooldown.add(targetUser.id);
        setTimeout(() => {
            levelCooldown.delete(targetUser.id);
        }, 60000);

    }

});
