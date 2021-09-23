const discord = require('discord.js');
const DisTube = require("distube");
const env = require("dotenv");
const bot = new discord.Client();
const lib = require("./src/lib/functions");

env.config();

bot.commands = new discord.Collection();
bot.aliases  = new discord.Collection();
bot.distube  = new DisTube(bot, { searchSongs: false, emitNewSongOnly: true });
bot.database = require("./src/database/mongodb");

lib.setup(bot);

bot.login(process.env.BOT_TOKEN);

module.exports = { bot }