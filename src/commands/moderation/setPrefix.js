
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
                return message.reply({
                    content: "> **O prefixo é muito grande! Tamanho minimo: \`4\`**",
                    allowedMentions: { repliedUser: false } 
                });
            }

            await bot.database.guildInfo.updateOne(
                { guild_id: message.guild.id },
                { guild_prefix: prefix }
            );

            return message.reply({
                content: `> **O meu prefixo foi alterado! Novo prefixo: \`${prefix}\`**`,
                allowedMentions: { repliedUser: false } 
            });

        } else {
            return message.reply({
                content: "> **Você não tem permissão para acessar esse comando!**",
                allowedMentions: { repliedUser: false }
            });
        }

    } 
    
}