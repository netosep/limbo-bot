
module.exports = { 

    help: {
        name: "avatar",
        aliases: ["a", "perfil"]
    },

    run: async (bot, message, args) => {

        var target = message.mentions.users.first() || message.author;


        message.channel.send(target.displayAvatarURL({ size: 4096, dynamic: true }))
    } 
    
}