const { Client, Collection } = require("discord.js");
const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");
const lib = require("./src/lib/functions");
const bot = new Client({ intents: ['GUILDS', 'GUILD_VOICE_STATES', 'GUILD_MESSAGES', 'GUILD_MEMBERS', 'GUILD_PRESENCES'] });
require("dotenv").config();

bot.commands = new Collection();
bot.aliases  = new Collection();
bot.database = require("./src/database/mongodb");
bot.distube  = new DisTube(bot, {
    searchSongs: 1, 
    emitNewSongOnly: true,
    emitAddSongWhenCreatingQueue: false,
    leaveOnFinish: true,
    leaveOnEmpty: true,
    plugins: [new SpotifyPlugin()]
});

lib.setup(bot);

bot.login(process.env.BOT_TOKEN);

module.exports = { bot };