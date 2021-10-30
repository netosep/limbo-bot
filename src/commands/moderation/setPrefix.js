
module.exports = { 

    help: {
        name: "setprefix",
        usage: ["setprefix <prefixo>", "sp !"],
        description: "Altera o prefixo do servidor.",
        accessableBy: "Administrador",
        aliases: ["sp"]
    },

    run: async (bot, message, args) => {

        if(message.member.permissions.has('ADMINISTRATOR')) {

            let prefix = args[0];
            if(!prefix) return;

            if(prefix.length > 4) {
                return message.reply("> **O prefixo é muito grande! Tamanho minimo: \`4\`**")
            }

            await bot.database.guildInfo.updateOne({ guild_id: message.guild.id },
                { guild_prefix: prefix }
            );

            return message.reply(`> **O meu prefixo foi alterado! Novo prefixo: \`${prefix}\`**`)

        } else {
            return message.reply("> **Você não tem permissão para acessar esse comando!**")
        }

    } 
    
}