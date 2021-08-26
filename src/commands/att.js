const { randomXP } = require("../lib/experience");


module.exports = { 

    help: {
        name: "att",
        aliases: ["a"]
    },

    run: async (bot, message, args) => {

        if(message.author.id != "232310431174230026") return;

        var numMsgs = parseInt(args[1]);
        var target = message.mentions.users.first();

        var level = 0, xp = 0, checkXP = 100;
        
        for (let i = 0; i < numMsgs; i++) {

            xp += randomXP();
            if(xp >= checkXP) {
                checkXP = Math.round(checkXP * 2.5);
                level += 1;
            }
            
        }

        message.channel.send(`usuário: ${target}\nmensagens: ${numMsgs}\nlevel: ${level}\nxp: ${xp}\nxp prox lvl: ${checkXP}`);

    } 
    
}