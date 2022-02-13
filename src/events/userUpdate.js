const { bot } = require("../../index");

bot.on("userUpdate", async (oldUser, newUser) => {

    if(newUser.bot) return;

    await bot.database.userInfo.findOne({ user_id: newUser.id })
    .then(async (user) => {
        if(user) {
            await bot.database.userInfo.updateOne({ user_id: newUser.id }, 
                {
                    user_name       : newUser.username,
                    user_avatar_url : newUser.displayAvatarURL({ size: 1024 }),
                    updated_at      : Date.now()
                }
            );
        }
    }).catch((err) => {
        return console.error(err)
    });

});