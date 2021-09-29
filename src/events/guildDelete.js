const { bot } = require("../../index");
const env = require("dotenv");

env.config();

bot.on("guildDelete", (guild) => {

    let globalLogChannel = bot.channels.cache.get(process.env.LOG_CHANNEL_ID);
    let owner = guild.owner.user;
    if(globalLogChannel) globalLogChannel.send(`Saí do servidor: **${guild.name}** - Dono: **${owner.username}#${owner.discriminator}**`);

});