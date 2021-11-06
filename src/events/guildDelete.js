const { bot } = require("../../index");

bot.on("guildDelete", (guild) => {
    return console.log(`Fui removido do servidor: ${guild.name}`);
});