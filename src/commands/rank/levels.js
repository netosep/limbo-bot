require("dotenv").config();

module.exports = { 

    help: {
        name: "levels",
        usage: ["levels"],
        description: "Te manda o link do ranking de níveis do servidor.",
        accessableBy: "Todos os membros.",
        aliases: ["lvl"]
    },

    run: async (bot, message, args) => {

        return message.reply({
            content: "> **Em desenvolvimento...  🛠**",
            allowedMentions: { repliedUser: false },
            failIfNotExists: false
        });

        // message.channel.send(`${process.env.LEVELS_URL}/guild/${message.guild.id}`) */

    } 
    
}