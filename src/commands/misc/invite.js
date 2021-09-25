const { MessageEmbed } = require('discord.js');

module.exports = {

    help: {
        name: "invite",
        usage: ["invite"],
        description: "Te envia o link de convite do bot.",
        accessableBy: "Todos os membros.",
        aliases: ["convite", "link"]
    },
    
    run: async (bot, message, args) => {
        
        let embed = new MessageEmbed().setColor("BLACK");
        let time = new Date();
        // link de convite do bot
        let link = `https://discord.com/oauth2/authorize?=&client_id=${bot.user.id}&scope=bot&permissions=8`

        message.react('🤙🏿').catch(() => { return });
        
        message.author.send(embed
            .setAuthor(`Olá ${message.author.username}!`, message.author.displayAvatarURL())
            .setDescription(`> **[Clique aqui](${link}) para poder me adicionar ao seu servidor!**`)
            .setFooter(`© ${bot.user.username} - ${time.getFullYear()} | Todos os direitos reservados.`, bot.user.displayAvatarURL())
        ).catch(() => { return });
    }
}
