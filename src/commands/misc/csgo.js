const axios = require("axios");
const Steam = require("steamid");
const { MessageEmbed } = require("discord.js");
const env = require("dotenv");
const token = process.env.STEAM_API_KEY;

env.config();

module.exports = { 

    help: {
        name: "csgo",
        usage: ["csgo <steamid>"],
        description: "Mostra as informações de um jogador de CS:GO.",
        accessableBy: "Todos os membros.",
        aliases: ["csgostatus"]
    },

    run: async (bot, message, args) => {

        let embed = new MessageEmbed().setColor("BLACK");
        let steam = args.join(" ");
        let validSteam = true;

        if(!token) return;

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
            })
            .catch((err) => {
                return console.error(err)
            });
        }

        if(validSteam) {
            let kills, deaths, player, headshots, mvps, matches, wins;
            await axios(`http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=730&key=${token}&steamid=${steam}`)
            .then(({ data }) => {
                data.playerstats.stats.forEach((stats) => {
                    if(stats.name === "total_kills") kills = stats.value;
                    if(stats.name === "total_deaths") deaths = stats.value;
                    if(stats.name === "total_kills_headshot") headshots = stats.value;
                    if(stats.name === "total_mvps") mvps = stats.value;
                    if(stats.name === "total_matches_played") matches= stats.value;
                    if(stats.name === "total_matches_won") wins = stats.value;
                });
            })
            .catch((err) => {
                return console.error(err)
            });

            await axios(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${token}&steamids=${steam}`)
            .then(async ({ data }) => {
                player = data.response.players[0];
            })
            .catch((err) => {
                return console.error(err)
            });

            return message.channel.send(embed
                .setAuthor(`informações de ${(player.personaname).toUpperCase()}`, player.avatarfull, player.profileurl)
                .setThumbnail("https://i.imgur.com/m90ZV8l.png") // csgologo
                .setDescription(`
                    > ▫ Nick: **[${player.personaname}](https://steamcommunity.com/profiles/${player.steamid})**
                    > ▫ Kills: **${kills}**
                    > ▫ Mortes: **${deaths}**
                    > ▫ KD: **${(kills/deaths).toFixed(2)}**
                    > ▫ HS: **${headshots} - ${((headshots * 100) / kills).toFixed(0)}%**\n
                    > ▫ Partidas: **${matches}**
                    > ▫ Vencidas: **${wins}**
                    > ▫ Perdidas: **${matches - wins}**
                    > ▫ MVPS: **${mvps}**
                    > ▫ Winrate: **${(wins/(matches-wins)).toFixed(2)}%**
                `)
                .setFooter(`CS:GO Player Info - © ${bot.user.username}`, bot.user.displayAvatarURL())
            );
        }

    } 
    
}