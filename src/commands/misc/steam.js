const axios = require("axios");
const Steam = require("steamid");
const moment = require("moment");
const { MessageEmbed } = require("discord.js");
require("dotenv").config();

module.exports = {

    help: {
        name: "steam",
        usage: ["steam <url_id>", "steam <id>", "steam <id64>"],
        description: "Mostra os detalhes de uma conta steam.",
        accessableBy: "Todos os membros.",
        aliases: []
    },
    
    run: async (bot, message, args) => {

        let steam = args.join(" ");
        let validSteam = true;
        let token = process.env.STEAM_API_KEY;

        if(!token) return;

        if(!steam) {
            message.react("❎");
            return message.reply("> **É necessário passar um parâmetro!**");
        }

        if(parseInt(steam)) {
            let validSteamId = new Steam(steam).isValid();
            if(!validSteamId) {
                message.react("❎");
                return message.reply("> **O SteamID informado é inválido!**");
            }
        }
        else if(steam.startsWith("STEAM_") || steam.startsWith("[U:")) {
            try {
                steam = new Steam(steam).getSteamID64();
            } catch(err) {
                message.react("❎");
                return message.reply("> **O SteamID informado é inválido!**");
            }
        } else {
            await axios(`http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${token}&vanityurl=${steam}`)
            .then(({ data }) => {
                steam = data.response.steamid;
                if(!steam) {
                    validSteam = false;
                    message.react("❎");
                    return message.reply("> **Não foi possivel encontrar ninguém com esse final de URL...**");
                }
            })
            .catch((err) => {
                return console.error(err);
            });
        }

        if(validSteam) {
            await axios(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${token}&steamids=${steam}`)
            .then(async ({ data }) => {
                let steamAcc = data.response.players[0];
                let state = ["online", "offline", "ocupado", "away", "cochilando", "querendo trocar", "querendo jogar"];

                if(!steamAcc) {
                    message.react("❎");
                    return message.reply("> **Não foi possivel encontrar uma conta steam com esse parâmetro...**");
                }

                await axios(`http://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key=${token}&steamids=${steam}`)
                .then(({ data }) => {
                    steamAcc.VACBanned = data.players[0].VACBanned;
                    steamAcc.gameBans = data.players[0].NumberOfGameBans;
                    steamAcc.VACBans = data.players[0].NumberOfVACBans;
                })
                .catch((err) => {
                    return console.error(err);
                });

                let embed = new MessageEmbed()
                    .setColor("BLACK")
                    .setAuthor(`Steam de ${(steamAcc.personaname).toUpperCase()}`, steamAcc.avatarfull, steamAcc.profileurl)
                    .setThumbnail(steamAcc.avatarfull)
                    .setDescription(`
                        > ▫ Nome real: **${steamAcc.realname || "indefinido"}**
                        > ▫ Status: **${steamAcc.profilestate ? state[steamAcc.profilestate] : "offline"}** ` + 
                        `| País: :flag_${steamAcc.loccountrycode ? steamAcc.loccountrycode.toLowerCase() : "white"}:
                        > ▫ Link do perfil: **[clique aqui](https://steamcommunity.com/profiles/${steamAcc.steamid})**
                        > ▫ Ultima vez online: **${steamAcc.lastlogoff ? moment(steamAcc.lastlogoff*1000).format("DD/MM/YYYY - HH:mm") : "indefinido"}**
                        > ▫ SteamID: **${new Steam(steamAcc.steamid).getSteam2RenderedID()}**
                        > ▫ Conta criada em: **${moment(steamAcc.timecreated*1000).format("DD/MM/YYYY - HH:mm")}**
                        > ▫ VAC: **\`${steamAcc.VACBanned ? "✅" : "❎"}\`** - VACBans: **${steamAcc.VACBans}** - GameBans: **${steamAcc.gameBans}**
                    `)
                    .setFooter(`Steam Info - © ${bot.user.username}`, "https://i.imgur.com/e9kv0wT.png");

                return message.reply({ embeds: [embed] });

            })
            .catch((err) => {
                return console.error(err);
            });
            
        }

    }

}
