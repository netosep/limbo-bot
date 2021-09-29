const { bot } = require("../../index");
const env = require("dotenv");

env.config();

bot.on("guildCreate", async (guild) => {

    let globalLogChannel = bot.channels.cache.get(process.env.LOG_CHANNEL_ID);
    let owner = guild.owner.user;
    if(globalLogChannel) globalLogChannel.send(`Entrei no servidor: **${guild.name}** - Dono: **${owner.username}#${owner.discriminator}**`);

    await bot.database.guildInfo.findOne({ 
        "guild_id": guild.id 
    })
    .then(async (result) => {
        if(!result) {
            new bot.database.guildInfo({
                guild_id       : guild.id,
                guild_name     : guild.name,
                guild_owner_id : guild.ownerID,
                guild_icon_url : guild.iconURL({ size: 1024 })
            })
            .save()
            .then(() => {
                return console.log(`Novo servidor adicionado ao banco de dados: ${guild.name}`);
            })
            .catch((err) => {
                console.log(`Ocorreu um erro ao adicionar o servidor ${guild.name} ao banco de dados...`);
                return console.error(err);
            });
        }
    })
    .catch((err) => {
        return console.error(err);
    });

});