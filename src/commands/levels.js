const { convertTime } = require("../lib/time");
const Rank = require("../utils/rankQuery");

module.exports = { 

    help: {
        name: "levels",
        aliases: ["lvl"]
    },

    run: async (bot, message, args) => {

        if(message.author.id != "232310431174230026") return;

        var string = "```fix\nNOME - NIVEL - XP - MENSAGENS - TEMPO CONECTADO\n";

        await Rank.findAllRanks()
        .then((ranks) => {
            //console.log(ranks)

            ranks.forEach(rank => {
                string += `${rank.name} - ${rank.level} - ${rank.xp} - ${rank.messages} - ${convertTime(rank.time_connected)}\n`
            });

            string += "```"

            message.channel.send(string)
 
        })
        .catch((err) => {
            return console.error(err);
        });

    } 
    
}