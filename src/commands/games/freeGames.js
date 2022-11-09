const { EmbedBuilder, ApplicationCommandType, Client, Interaction } = require("discord.js");
const axios = require("axios");
const moment = require("moment");

module.exports = {

    name: "freegames",
    description: "Lista os jogos gratis da semana na EpicGames Store.",
    type: ApplicationCommandType.ChatInput,

    /**
     *  @param {Client} client
     *  @param {Interaction} interaction
     */
    run: async (client, interaction) => {

        await axios('https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions?country=BR')
        .then(async ({ data }) => {

            const elements = data.data.Catalog.searchStore.elements;
            const embed = new EmbedBuilder().setColor("BLACK");

            if (elements.length === 0) {
                return interaction.reply({ content: "> **Não há nenhum jogo gratis para essa semana  😢**" });
            }

            await interaction.reply({ content: "> **Lista de jogos gratuitos da semana na EpicGames:**" });

            const gameList = elements.filter((e) => e.promotions?.promotionalOffers.length > 0 || e.promotions?.upcomingPromotionalOffers.length > 0);

            gameList.forEach((game, i = 1) => {

                let promotionalDate = game.promotions.promotionalOffers[0] ?? game.promotions.upcomingPromotionalOffers[0];
                let image = game.keyImages.filter((img) => img.type == "OfferImageWide")[0];

                embed.setAuthor({
                    name: `${++i + ' - ' + game.title}`,
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
                .setImage(encodeURI(image.url));

                interaction.channel.send({ embeds: [embed] });
            });

        })
        .catch((err) => {
            return interaction.reply({ content: "> **Aconteceu algum erro e eu não consegui realizar essa operação...  😵**" });
        });

    }
}