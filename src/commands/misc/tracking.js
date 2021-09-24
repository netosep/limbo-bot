const { MessageEmbed } = require("discord.js")
const axios = require('axios');
const moment = require('moment');

module.exports = {

    help: {
        name: "rastreio",
        aliases: ["tracking", "rast"]
    },

    run: async (bot, message, args) => {
        var tracking = args.join(" ");

        if (tracking.length < 1 ) {
            message.react("❎");
            return message.channel.send("Mensagem inválida!")
        }
  
        await axios(`https://proxyapp.correios.com.br/v1/sro-rastro/${tracking}`)
        .then(({ data }) => {

            let objeto = data.objetos[0];
            let eventos = objeto.eventos
            let embed = new MessageEmbed().setColor("BLACK");

            if(objeto.mensagem) {
                // mensagem não existe
            }

            for (let i = (eventos.length -1); i >= 0; i--) {
                embed.addField(`• **${eventos[i].descricao}**`,
                    `> 📍 ${eventos[i].unidade.tipo} - ${eventos[i].unidade.endereco.cidade}-${eventos[i].unidade.endereco.uf}
                    ${eventos[i].unidadeDestino ? "> ✈ " + eventos[i].unidadeDestino.tipo + " - " +
                      eventos[i].unidadeDestino.endereco.cidade + "-" + eventos[i].unidadeDestino.endereco.uf : ""}`
                );
            }

            message.channel.send(embed
                .setTitle(`**🧭 Rastreando objeto de ${message.author.username}**`)
                .setThumbnail("https://i.imgur.com/unNhvOp.png")
                .setDescription(`> 🔗 Código de rastreio: **\`${objeto.codObjeto}\`**`)
                .setFooter(`Previsão de chegada: ${moment(objeto.dtPrevista).format("DD/MM/YYYY")} 📅 `, bot.user.displayAvatarURL())
            );

        })
        .catch((err) => {
            return console.error(err)
        });

    }
}