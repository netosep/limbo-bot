const { bot } = require("../../index");

bot.on("guildCreate", async (guild) => {

    await bot.database.guildInfo.findOne({ 
        "guild_id": guild.id 
    })
    .then(async (result) => {
        if(!result) {
            new bot.database.guildInfo({
                guild_id       : guild.id,
                guild_name     : guild.name,
                guild_owner_id : guild.ownerId,
                guild_icon_url : guild.iconURL({ size: 1024 }),
                created_at     : Date.now()
            })
            .save()
            .then(() => {
                return console.log(`Novo servidor adicionado ao banco de dados: ${guild.name}`);
            })
            .catch((err) => {
                console.log(`Ocorreu um erro ao adicionar o servidor ${guild.name} ao banco de dados...`);
                return console.error(err);
            });
        } else {
            await bot.database.guildInfo.updateOne({ guild_id: guild.id }, { active : true });
            return console.log(`Estou de volta ao servidor: ${guild.name}`);
        }
    })
    .catch((err) => {
        return console.error(err);
    });

});