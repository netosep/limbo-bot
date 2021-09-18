module.exports = { 

    help: {
        name: "setavatar",
        aliases: ["sa"]
    },

    run: async (bot, message, args) => {
        var link = args.join(" ");

        if(message.author.id != "232310431174230026") return;

        if(link.startsWith("https://")){
            //message.channel.send(link)
            console.log(bot)
            bot.user.setAvatar(link)
            .then(() => {
                console.log("avatar redefinido")
            })
            .catch((err) => {
                console.error(errr)
            })
        } else {
            message.channel.send("erro")
        }

        
    } 
    
}