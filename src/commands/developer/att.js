const { randomXP } = require("../../lib/experience");
const env = require("dotenv");

env.config();

module.exports = { 

    help: {
        name: "att",
        aliases: ["a"]
    },

    run: async (bot, message, args) => {

        if(message.author.id != process.env.BOT_OWNER_ID) return;

        var numMsgs = parseInt(args[1]);
        var target = message.mentions.users.first();

        var level = 0, xp = 0, checkXP = 100;
        
        for (let i = 0; i < numMsgs; i++) {

            xp += randomXP();
            if(xp >= checkXP) {
                checkXP = Math.round(checkXP * 2);
                level += 1;
            }
            
        }

        message.channel.send(`usuário: ${target}\nmensagens: ${numMsgs}\nlevel: ${level}\nxp: ${xp}\nxp prox lvl: ${checkXP}`);

    } 
    
}