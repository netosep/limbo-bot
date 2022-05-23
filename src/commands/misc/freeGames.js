const { MessageEmbed } = require('discord.js');
const axios = require('axios');
const moment = require('moment');

module.exports = {

    help: {
        name: "freegames",
        usage: ["freegames"],
        description: "Lista os jogos gratis da semana na EpicGames Store.",
        accessableBy: "Todos os membros.",
        aliases: ["fg", "epicgames"]
    },
    
    run: async (bot, message, args) => {
        
        await axios('https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions?country=BR')
        .then(({ data }) => {
            let elements = data.data.Catalog.searchStore.elements;
            let embed = new MessageEmbed().setColor("BLACK");

            if (elements.length == 0) {
                return message.reply({ 
                    content: "> **Não há nenhum jogo gratis para essa semana  😢**", 
                    allowedMentions: { repliedUser: false },
                    failIfNotExists: false 
                });
            }

            message.reply({ 
                content: "> **Lista de jogos gratuitos da semana na EpicGames:**", 
                allowedMentions: { repliedUser: false },
                failIfNotExists: false 
            });

            elements.forEach((game, i = 0) => {

                let promotionalStartDate = game.promotions.upcomingPromotionalOffers[0] ?? game.promotions.promotionalOffers[0];
                let promotionalEndDate = game.promotions.upcomingPromotionalOffers[0] ?? game.promotions.promotionalOffers[0];

                embed.setAuthor({
                    name: `${1 + i++ + ' - ' + game.title}`,
                    iconURL: "https://i.imgur.com/vd4huus.jpg",
                    url: `https://store.epicgames.com/pt-BR/p/${game.title.toLowerCase().replace(' ', '-')}`
                })
                .setDescription(`
                    > 📆 Inicio da promoção: **${moment(promotionalStartDate.promotionalOffers[0].startDate).format('DD/MM/YYYY')}**
                    > 📆 Fim da promoção: **${moment(promotionalEndDate.promotionalOffers[0].endDate).format('DD/MM/YYYY')}**
                    > 💰 Preço: **Grátis** 🤑
                    > 📝 Descrição: **${game.description}**
                    > 🔗 Link: **https://store.epicgames.com/pt-BR/p/${game.title.toLowerCase().replace(' ', '-')}**
                `)
                .setImage(game.keyImages.pop().url);

                message.channel.send({ 
                    embeds: [embed],
                    failIfNotExists: false 
                });
            });
        });
        
    }
}