const discord = require('discord.js');
const bot = new discord.Client();
const lib = require("./src/lib/functions");
const { token } = require('./config.json');

bot.commands = new discord.Collection();
bot.aliases = new discord.Collection();
bot.afk = new Map();
lib.setup(bot);

bot.login(token);

module.exports = { bot }