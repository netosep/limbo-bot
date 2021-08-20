const { bot } = require("../../index")
const { prefix } = require("../../config.json")

bot.on("message", (message) => {

    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    /* if(message.content === `<@!${bot.user.id}>`){
        return message.channel.send("ola")
    } */

    var args = message.content.slice(prefix.length).trim().split(" ");
    var commandTemp = args.shift().toLowerCase();
    var command;

    if(!message.content.startsWith(prefix)) return;

    if(bot.commands.has(commandTemp)){
        command = bot.commands.get(commandTemp);
    } else {
        command = bot.commands.get(bot.aliases.get(commandTemp));
    }

    if(command) {
        command.run(bot, message, args);
    } else {
        message.channel.send("esse comando não existe")
    }

});