
module.exports = { 

    help: {
        name: "eval",
        usage: ["eval"],
        description: "executa um comando em javascript",
        accessableBy: "Dono do bot",
        aliases: ["js", "run"]
    },

    run: async (bot, message, args) => {

        if(message.author.id != "232310431174230026") return;
        
/*          var input = args.join(" ");
        var output;

        console.log(message.author)

        try {
            output = eval(input)
        } catch (err) {
            console.error(err)
        }

        return message.channel.send(`\`\`\`js\n${output}\`\`\`` ) */

    } 
    
}