const { MessageEmbed } = require("discord.js")
const axios = require("axios");
const moment = require("moment");

module.exports = {

    help: {
        name: "rastrear",
        usage: ["rast <CODIGODERASTREIO>"],
        description: "Obtem os dados de rastreio de um encomenda dos correios.",
        accessableBy: "Todos os membros.",
        aliases: ["tracking", "rast"]
    },

    run: async (bot, message, args) => {

        let embed = new MessageEmbed().setColor("BLACK");
        let tracking = args.join(" ").toUpperCase();
        if (tracking.length < 1) return;
  
        await axios(`https://proxyapp.correios.com.br/v1/sro-rastro/${tracking}`)
        .then(({ data }) => {

            let objeto = data.objetos[0];
            let eventos = objeto.eventos;
            

            if(objeto.mensagem) {
                message.react("❎");
                return message.reply({
                    content: "> **Código de rastreio inválido!** 😕",
                    allowedMentions: { repliedUser: false },
                    failIfNotExists: false
                });
            }

            for (let i = (eventos.length -1); i >= 0; i--) {
                embed.addField(`• ${eventos[i].descricao}`,
                    `> 📆 Atualizado em: \`${moment(eventos[i].dtHrCriado).format("DD/MM/YYYY")}\`
                     > 📍 ${eventos[i].unidade.tipo} - ${eventos[i].unidade.endereco.cidade}-${eventos[i].unidade.endereco.uf}
                    ${eventos[i].unidadeDestino ? "> ✈ " + eventos[i].unidadeDestino.tipo + " - " +
                      eventos[i].unidadeDestino.endereco.cidade + "-" + eventos[i].unidadeDestino.endereco.uf : ""}`
                );
            }

            embed.setAuthor({name: "Rastreando objeto pela API dos CORREIOS", iconURL: "https://i.imgur.com/I18ZP2h.png"})
                .setThumbnail("https://i.imgur.com/unNhvOp.png")
                .setDescription(`> ▫ Código de rastreio: **\`${objeto.codObjeto}\`**`)
                .setFooter({
                    text: `Previsão de chegada: ${moment(objeto.dtPrevista).format("DD/MM/YYYY")} 📅`, 
                    iconURL: bot.user.displayAvatarURL()
                });

            return message.reply({ 
                embeds: [embed], 
                allowedMentions: { repliedUser: false },
                failIfNotExists: false 
            });

        })
        .catch((err) => {
            return console.error(err);
        });

    }
}