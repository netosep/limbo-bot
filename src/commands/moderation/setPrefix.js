
module.exports = { 

    help: {
        name: "setprefix",
        usage: ["setprefix ?", "sp !"],
        description: "altera o prefixo do servidor.",
        accessableBy: "administrador",
        aliases: ["sp"]
    },

    run: async (bot, message, args) => {

        if(message.member.hasPermission('ADMINISTRATOR')) {
            let prefix = args[0];
            if(!prefix) return;

            if(prefix.length > 4) {
                return message.channel.send("> **O prefixo é muito grande! Tamanho minimo: \`4\`**")
            }

            await bot.database.guildInfo.updateOne({ guild_id: message.guild.id },
                { guild_prefix: prefix }
            );

            return message.channel.send(`> **O meu prefixo foi alterado! Novo prefixo: \`${prefix}\`**`)

        } else {
            return message.channel.send("> **Você não tem permissão para acessar esse comando!**")
        }

        
    } 
    
}