const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const weather = require("weather-js");

module.exports = { 

    help: {
        name: "weather",
        usage: ["weather <cidade>"],
        description: "Veja a previsão do tempo de uma cidade.",
        accessableBy: "Todos os membros.",
        aliases: ["tempo", "pt"]
    },

    run: async (bot, message, args) => {

        let locale = args.join(" ").trim();
        let embed = new MessageEmbed().setColor("BLACK");
        let emojis = [
            "⛈", "⛈", "⛈", "⛈", "⛈", "🌨", "🌧", "🌧", "🌧", "🌧",
            "🌧", "🌧", "🌨", "❄", "🌨", "⛈", "🌧", "🌫", "🌫", "🌫",
            "🌫", "💨", "💨", "❄", "☁", "🌥", "🌥", "🌥", "🌥", "🌙",
            "☀", "🌥", "🌥", "⛈", "☀", "🌦", "🌦", "🌦", "🌦", "🌧",
            "🌦", "🌨", "🌨", "🚫", "🌦", "🌦", "⛈"
        ];

        weather.find({search: locale, lang: "pt-br", degreeType: "C"}, (err, result) => {
            if(err) {
                return message.reply({
                    content: "> **Ocorreu algum erro por aqui...  🤕**",
                    allowedMentions: { repliedUser: false },
                    failIfNotExists: false
                });
            }
            if(result.length === 0) {
                return message.reply({
                    content: "> **Não foi possível encontrar essa cidade ou local...  🧭**",
                    allowedMentions: { repliedUser: false },
                    failIfNotExists: false
                });
            }

            result = result[0];
            embed.setAuthor(`Previsão do tempo para ${result.location.name}`, result.current.imageUrl)
                .setThumbnail("https://i.imgur.com/YrhNKCx.png") // Weather Icon
                .addField(`📆 ${result.current.day.toUpperCase()} (HOJE) - ${moment(result.current.date).format("DD/MM/YY")}`,`
                    > 🌡 Temperatura: **${result.current.temperature}°C** 
                    > 💦 Humidade: **${result.current.humidity}%** 
                    > 💨 Vento: **${result.current.winddisplay}**
                    > ${emojis[result.current.skycode]} Tempo: **${result.current.skytext}**
                    > 🔗 Fonte: **[MSN Clima](https://www.msn.com/pt-br/clima/)**
                `)
                .setFooter(`Atualizado às: ${result.current.observationtime}h - ${moment(result.current.date).format("DD/MM/YY")} por MSN Clima`, bot.user.displayAvatarURL());
            
            let days = result.forecast;
            /* iniciando o for no 2 pois os dias 0 e 1 são ontem e hoje */
            for (let i = 2; i < days.length; i++) { 
                embed.addField(`📆 ${days[i].day.toUpperCase()} - ${moment(days[i].date).format("DD/MM/YY")}`, `
                    > ❄ Temperatura min.: **${days[i].low}°C**
                    > 🌡 Temperatura max.: **${days[i].high}°C**
                    > ${emojis[days[i].skycodeday]} Tempo: **${days[i].skytextday}**
                    > ☔ Chuva: **${days[i].precip ? days[i].precip : 0}%**
                `);
            }
           
            return message.reply({
                embeds: [embed],
                allowedMentions: { repliedUser: false },
                failIfNotExists: false
            });
        });

    }
    
}