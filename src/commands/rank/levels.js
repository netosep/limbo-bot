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

       /*  message.channel.send(`${process.env.LEVELS_URL}/guild/${message.guild.id}`) */

    } 
    
}