const axios = require("axios");
const Steam = require("steamid");
const { MessageEmbed } = require("discord.js");
const env = require("dotenv");

const token = process.env.STEAM_API_KEY;
env.config();

module.exports = {

    help: {
        name: "steam",
        usage: ["steam <url_id>", "steam <id>", "steam <id64>"],
        description: "Mostra os detalhes de uma conta steam.",
        accessableBy: "Todos os membros.",
        aliases: []
    },
    
    run: async (bot, message, args) => {

        let embed = new MessageEmbed().setColor("BLACK");
        let steam = args.join(" ");
        let validSteam = true;

        if(parseInt(steam)) {
            let validSteamId = new Steam(steam).isValid();
            if(!validSteamId) {
                message.react("❎");
                return message.channel.send("> **O SteamID informado é inválido!**");
            }
        }
        else if(steam.startsWith("STEAM_") || steam.startsWith("[U:")) {
            try {
                steam = new Steam(steam).getSteamID64();
            } catch(err) {
                message.react("❎");
                return message.channel.send("> **O SteamID informado é inválido!**");
            }
        } else {
            await axios(`http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${token}&vanityurl=${steam}`)
            .then(({ data }) => {
                steam = data.response.steamid;
                if(!steam) {
                    validSteam = false;
                    message.react("❎");
                    return message.channel.send("> **Não foi possivel encontrar ninguém com esse final de URL...**");
                }
            });
        }

        if(validSteam) {
            await axios(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${token}&steamids=${steam}`)
            .then(async ({ data }) => {
                let steamAcc = data.response.players[0];
                if(!steamAcc) {
                    message.react("❎");
                    return message.channel.send("> **Não foi possivel encontrar uma conta steam com esse parâmetro...**");
                }
                await axios(`http://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key=${token}&steamids=${steam}`)
                .then(({ data }) => {
                    steamAcc.vacStatus = data.players[0]
                });

                // variavel final
                console.log(steamAcc)

            });
            
        }

    }

}
