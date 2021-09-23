const env = require("dotenv");

env.config();

module.exports = { 

    help: {
        name: "levels",
        aliases: ["lvl"]
    },

    run: async (bot, message, args) => {

       /*  message.channel.send(`${process.env.LEVELS_URL}/guild/${message.guild.id}`) */

    } 
    
}