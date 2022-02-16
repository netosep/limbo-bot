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
        
        let time = new Date();
        let link = `https://discord.com/oauth2/authorize?=&client_id=${bot.user.id}&scope=bot&permissions=8`; // link de convite do bot

        let embed = new MessageEmbed()
            .setColor("BLACK")
            .setAuthor({name: `Olá ${message.author.username}!`, iconURL: message.author.displayAvatarURL()})
            .setDescription(`> **[Clique aqui](${link}) para poder me adicionar ao seu servidor!**`)
            .setFooter({
                text: `© ${bot.user.username} - ${time.getFullYear()} | Todos os direitos reservados.`, 
                iconURL: bot.user.displayAvatarURL()
            });
        
        message.react('🤙🏿').catch(() => { return });
        return message.author.send({ embeds: [embed] }).catch(() => { return });
        
    }
}
