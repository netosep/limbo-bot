const { MessageEmbed } = require("discord.js");
require("dotenv").config();

module.exports = { 

    help: {
        name: "eval",
        usage: ["eval <code>", "run <code>"],
        description: "Executa um comando em javascript.",
        accessableBy: "Somente o desenvolvedor.",
        aliases: ["js", "run"]
    },

    run: async (bot, message, args) => {

        if(message.author.id != process.env.BOT_OWNER_ID) return;
        
        let input = args.join(" ");
        let output;

        try {
            output = eval(input);
        } catch(err) {
            output = err;
        }

        let embed = new MessageEmbed()
            .setColor("BLACK")
            .setAuthor("Rodando um código em JavaScript", bot.user.displayAvatarURL())
            .setDescription(`
                ▫ **Entrada:**
                \`\`\`js\n${input}\`\`\`
                ▫ **Saída:**
                \`\`\`js\n${output}\`\`\`
            `)

        return message.reply({ 
            embeds: [embed], 
            allowedMentions: { repliedUser: false },
            failIfNotExists: false
        });

    } 
    
}