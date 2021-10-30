const cooldown = new Set();

const randomXP = function() {
    var maxXP = 50; var minXP = 15;
    var xp = Math.random() * (maxXP - minXP) + minXP;
    return Math.round(parseInt(xp)) ;
}

/**
 *  @param {Discord.Client} bot bot client
 *  @param {Discord.Message} message messagem enviada
 *  @param {Discord.User} user usuario que enviou a mensagem
 */
 const rankSystem = async function(bot, user, message) {

    if (cooldown.has(user.id)) return;

    await bot.database.userInfo.findOne({ user_id: user.id })
        .then(async (userInDB) => {
            if (userInDB) {
                await bot.database.rankInfo.findOne(
                    {
                        user_id: user.id,
                        guild_id: message.guild.id
                    }
                )
                .then(async (userRank) => {
                    let xpToAdd = randomXP();
                    if (userRank) {
                        await bot.database.rankInfo.updateOne(
                            {
                                user_id: user.id,
                                guild_id: message.guild.id
                            },
                            {
                                experience: userRank.experience + xpToAdd,
                                messages: userRank.messages + 1
                            }
                        );

                        if ((userRank.experience + xpToAdd) >= userRank.next_level_exp) {
                            await bot.database.rankInfo.updateOne(
                                {
                                    user_id: user.id,
                                    guild_id: message.guild.id
                                },
                                {
                                    level: userRank.level + 1,
                                    next_level_exp: Math.round(userRank.next_level_exp * 2.5)
                                }
                            );
                            message.channel.send(`> **${user} upou para o level ${userRank.level + 1}**`);
                        }

                    } else {
                        await new bot.database.rankInfo({
                            user_id: user.id,
                            guild_id: message.guild.id,
                            experience: xpToAdd,
                            messages: 1
                        }).save();
                    }

                })
                .catch((err) => {
                    return console.error(err);
                });

            } else {
                await new bot.database.userInfo({
                    user_id: user.id,
                    user_name: user.username,
                    user_avatar_url: user.displayAvatarURL({ size: 1024 })
                }).save();

                await new bot.database.rankInfo({
                    user_id: user.id,
                    guild_id: message.guild.id,
                    experience: randomXP(),
                    messages: 1
                }).save();
            }
        })
        .catch((err) => {
            return console.error(err);
        });

    cooldown.add(user.id);
    setTimeout(() => { cooldown.delete(user.id) }, 60000);

}

module.exports = { 
    rankSystem,
    randomXP
}