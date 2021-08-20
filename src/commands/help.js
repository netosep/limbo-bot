

module.exports = { 

    help: {
        name: "help",
        aliases: ["ajuda", "h"]
    },

    run: async (bot, message, args) => {
        message.channel.send("comando help ok")
    } 
    
}