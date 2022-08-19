const axios = require("axios");
const Steam = require("steamid");
const { MessageEmbed } = require("discord.js");
require("dotenv").config();

module.exports = { 

    help: {
        name: "csgo",
        usage: ["csgo <steamid>"],
        description: "Mostra as informações de um jogador de CS:GO.",
        accessableBy: "Todos os membros.",
        aliases: ["csgokda"]
    },

    run: async (bot, message, args) => {

        let embed = new MessageEmbed().setColor("BLACK");
        let steam = args.join(" ");
        let validSteam = true;
        let token = process.env.STEAM_API_KEY;

        if(!token) return;

        if(!steam) {
            return message.reply({
                content: "> **É necessário passar um parâmetro!**",
                allowedMentions: { repliedUser: false },
                failIfNotExists: false
            });
        }

        if(parseInt(steam)) {
            let validSteamId = new Steam(steam).isValid();
            if(!validSteamId) {
                return message.reply({
                    content: "> **O SteamID informado é inválido!**",
                    allowedMentions: { repliedUser: false },
                    failIfNotExists: false
                });
            }

        }
        else if(steam.startsWith("STEAM_") || steam.startsWith("[U:")) {
            try {
                steam = new Steam(steam).getSteamID64();
            } catch(err) {
                return message.reply({
                    content: "> **O SteamID informado é inválido!**",
                    allowedMentions: { repliedUser: false },
                    failIfNotExists: false
                });
            }
        } else {
            await axios(`http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${token}&vanityurl=${steam}`)
            .then(({ data }) => {
                steam = data.response.steamid;
                if(!steam) {
                    validSteam = false;
                    return message.reply({
                        content: "> **Não foi possivel encontrar ninguém com esse final de URL...**",
                        allowedMentions: { repliedUser: false },
                        failIfNotExists: false
                    });
                }
            })
            .catch(() => {
                return message.reply({
                    content: "> **Aconteceu alguma coisa errada aqui e eu não vou conseguir fazer isso... 🥺**",
                    allowedMentions: { repliedUser: false },
                    failIfNotExists: false
                });
            });
        }

        if(validSteam) {
            let kills, deaths, player, headshots, mvps, matches, wins, playerExists;
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
                playerExists = true;
            })
            .catch((err) => {
                playerExists = false;
                return message.reply({
                    content: "> **Esse usuário não existe ou está com o perfil privado... 🤔**",
                    allowedMentions: { repliedUser: false },
                    failIfNotExists: false
                });
            });

            await axios(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${token}&steamids=${steam}`)
            .then(async ({ data }) => {
                player = data.response.players[0];
            })
            .catch((err) => {
                return console.error(err)
            });

            if(playerExists) {
                embed.setAuthor({
                    name: `informações de ${(player.personaname).toUpperCase()}`, 
                    iconURL: player.avatarfull, 
                    url: player.profileurl
                })
                .setThumbnail("https://i.imgur.com/m90ZV8l.png") // csgologo
                .setDescription(`
                    > ▫ Nick: **[${player.personaname}](https://steamcommunity.com/profiles/${player.steamid})**
                    > ▫ Kills: **${kills}**
                    > ▫ Mortes: **${deaths}**
                    > ▫ KD: **${(kills / deaths).toFixed(2)}**
                    > ▫ HS: **${headshots} - ${((headshots * 100) / kills).toFixed(2)}%**\n
                    > ▫ Partidas: **${matches}**
                    > ▫ Vencidas: **${wins}**
                    > ▫ Perdidas: **${matches - wins}**
                    > ▫ MVPS: **${mvps}**
                    > ▫ Winrate: **${((wins * 100) / matches).toFixed(2)}%**
                `)
                .setFooter({text: `CS:GO Player Info - © ${bot.user.username}`, iconURL: bot.user.displayAvatarURL()});

                return message.reply({ 
                    embeds: [embed], 
                    allowedMentions: { repliedUser: false },
                    failIfNotExists: false 
                });
            }
        }

    } 
    
}