const discord = require('discord.js');
const bot = new discord.Client();
const lib = require("./src/lib/functions");
const env = require("dotenv");
env.config();

const token = process.env.TOKEN_BOT;

bot.commands = new discord.Collection();
bot.aliases = new discord.Collection();
lib.setup(bot);

bot.login(token);

module.exports = { bot }