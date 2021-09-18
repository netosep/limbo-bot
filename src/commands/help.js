

module.exports = { 

    help: {
        name: "help",
        aliases: ["ajuda", "h"]
    },

    run: async (bot, message, args) => {

        console.log(bot.commands)
        message.channel.send("comando help ok")
    } 
    
}