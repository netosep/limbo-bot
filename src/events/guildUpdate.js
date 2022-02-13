const { bot } = require("../../index");

bot.on("guildUpdate", async (oldGuild, newGuild) => {

    await bot.database.guildInfo.updateOne({ guild_id: newGuild.id },
        {
            guild_name     : newGuild.name,
            guild_owner_id : newGuild.ownerId,
            guild_icon_url : newGuild.iconURL(),
            updated_at     : Date.now()
        }
    );

});