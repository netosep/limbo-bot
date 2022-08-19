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

            let gameList = elements.filter((e) => e.game.promotions.promotionalOffers[0] ?? e.promotions.upcomingPromotionalOffers[0]);
            let promotionalDate = null;

            /* "promotions": {
                "promotionalOffers": [],
                "upcomingPromotionalOffers": []
            } */

            console.log(gameList.length);

            gameList.forEach((game, i = 0) => {

                promotionalDate = game.promotions.promotionalOffers[0] ?? game.promotions.upcomingPromotionalOffers[0];

                //console.log(promotionalDate);
                console.log(promotionalDate ? promotionalDate.promotionalOffers : 'undefined');

                /* embed.setAuthor({
                    name: `${1 + i++ + ' - ' + game.title}`,
                    iconURL: "https://i.imgur.com/vd4huus.jpg",
                    url: `https://store.epicgames.com/pt-BR/free-games`
                })
                .setDescription(`
                    > 📆 Inicio da promoção: **${moment(promotionalDate.promotionalOffers[0].startDate).format('DD/MM/YYYY')}**
                    > 📆 Fim da promoção: **${moment(promotionalDate.promotionalOffers[0].endDate).format('DD/MM/YYYY')}**
                    > 💰 Preço: **Grátis** 🤑
                    > 📝 Descrição: **${game.description}**
                    > 🔗 Link: **https://store.epicgames.com/pt-BR/free-games**
                `)
                .setImage(game.keyImages.pop().url.replaceAll(' ', '%20'));

                message.channel.send({ 
                    embeds: [embed],
                    failIfNotExists: false 
                }); */
            });
        })
        /* .catch((err) => {
            return message.reply({ 
                content: "> **Aconteceu algum erro e eu não consegui realizar essa operação...  😵**", 
                allowedMentions: { repliedUser: false },
                failIfNotExists: false 
            });
        }); */
        
    }
}