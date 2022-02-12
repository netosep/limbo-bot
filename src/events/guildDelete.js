const { bot } = require("../../index");

bot.on("guildDelete", async (guild) => {

    await bot.database.guildInfo.updateOne({ guild_id: guild.id }, { active : false });
    return console.log(`Fui removido do servidor: ${guild.name}`);

});