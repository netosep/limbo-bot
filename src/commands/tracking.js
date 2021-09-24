const axios = require('axios');
const moment = require('moment')

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

        try {
            const { data } = await axios(`https://proxyapp.correios.com.br/v1/sro-rastro/${tracking}`);
        //     const object = { 
        //         cod_object : data.objetos[0].codObjeto,
        //         dat_prevision: data.objetos[0].dtPrevista,

        //         sender: data.objetos[0].eventos[0].unidade.nome,
        //         sender_uf: data.objetos[0].eventos[0].unidade.endereco.uf,
        //         description: data.objetos[0].eventos[0].descricao,

        //         recipient: data.objetos[0].eventos[0].unidadeDestino.nome, 
        //         recipient_uf: data.objetos[0].eventos[0].unidadeDestino.endereco.uf,
        //     };
        //     console.log(object);
        //     return message.channel.send(`
        //     > Código de rastrio: **${object.cod_object}** 
        //     > Previção de chegada: **${moment(object.dat_prevision).format("DD/MM/YYYY")}**
        //     > Descrição: **${object.description}**
        //     > Em: **${object.sender} ${object.sender_uf}** para **${object.recipient} ${object.recipient_uf}**
        // `)
        const object = { 
            cod_object : data.objetos[0].codObjeto,
            dat_prevision: data.objetos[0].dtPrevista,
            events: []
        };
        data.objetos[0].eventos.forEach(element => {
            object.events.push({
                description: element.descricao,
                sender_name: element.unidade.nome,
                sender_type: element.unidade.tipo,
                sender_uf: element.unidade.endereco.uf,
                dtHr_created: element.dtHrCriado,

                recipient_name: element.unidadeDestino ? element.unidadeDestino.nome : null,
                recipient_type: element.unidadeDestino ? element.unidadeDestino.tipo : null,
                recipient_uf: element.unidadeDestino ? element.unidadeDestino.endereco.uf : null,
                detail: element.detalhe ? element.detalhe : null
            });
        });
        let events = "";
        object.events.forEach(event => {
            events += `Descrição: ${event.description}\n` +
            `Em ${event.sender_type} ${event.sender_name} ${event.sender_uf}\n`+ 
            `${event.recipient_name && "Para " + event.recipient_type + " " + event.recipient_name + " " +event.recipient_uf + "\n" || ""}`+
            `${event.detail && "Detalhe: " + event.detail + "\n" || ""}`+
            `${moment(event.dtHr_created).format("DD/MM/YYYY HH:ss")}\n\n`
        });
            console.log(object.events);
            return message.channel.send(`
            > Código de rastrio **${object.cod_object}**
            > Previção de chegada: **${moment(object.dat_prevision).format("DD/MM/YYYY")}**
            \`\`\`fix\n${events}\`\`\`
            `)
        } catch (error) {
            console.error(error);
            return message.channel.send("Comando trackind Erro");
        }
    }
}