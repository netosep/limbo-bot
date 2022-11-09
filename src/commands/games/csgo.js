const { EmbedBuilder, ApplicationCommandType, Client, Interaction, ApplicationCommandOptionType } = require("discord.js");
const Steam = require("steamid");
const axios = require("axios");

module.exports = { 

    name: "csgo",
    description: "Mostra as informações de um jogador de CS:GO.",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "steam",
            description: "Final da URL do perfil Steam ou SteamID",
            type: ApplicationCommandOptionType.String,
            required: true,
            minLength: 3,
            maxLength: 20
        }
    ],

    /**
     *  @param {Client} client
     *  @param {Interaction} interaction
     */
    run: async (client, interaction) => {

        const option = interaction.options._hoistedOptions.pop();
        const apiKey = process.env.STEAM_API_KEY;

        if (!apiKey) return;

        let steam = option.value;
        let validSteam = true;
        
        if(parseInt(steam)) {
            let validSteamId = new Steam(steam).isValid();
            if(!validSteamId) {
                return interaction.reply({ 
                    content: "> **O SteamID informado é inválido!**",
                    ephemeral: true
                });
            }
        } else if(steam.startsWith("STEAM_") || steam.startsWith("[U:")) {
            try {
                steam = new Steam(steam).getSteamID64();
            } catch(err) {
                return interaction.reply({
                    content: "> **O SteamID informado é inválido!**",
                    ephemeral: true
                });
            }
        } else {
            await axios(`http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${apiKey}&vanityurl=${steam}`)
            .then(({ data }) => {
                steam = data.response.steamid;
                if(!steam) {
                    validSteam = false;
                    return interaction.reply({
                        content: "> **Não foi possivel encontrar ninguém com esse final de URL...**",
                        ephemeral: true
                    });
                }
            })
            .catch((err) => {
                return interaction.reply({
                    content: "> **Aconteceu alguma coisa errada aqui e eu não vou conseguir fazer isso... 🥺**",
                    ephemeral: true
                });
            });
        }

        if(validSteam) {
            let kills, deaths, player, headshots, mvps, matches, wins, playerExists;
            await axios(`http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=730&key=${apiKey}&steamid=${steam}`)
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
                return interaction.reply({
                    content: "> **Esse usuário não existe ou está com o perfil privado... 🤔**",
                    ephemeral: true
                });
            });

            await axios(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${apiKey}&steamids=${steam}`)
            .then(({ data }) => {
                player = data.response.players[0];
            })
            .catch((err) => {
                return console.error(err)
            });

            if(playerExists) {
                const embed = new EmbedBuilder()
                    .setColor("BLACK")
                    .setAuthor({
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
                    .setFooter({text: `CS:GO Player Info - © ${client.user.username}`, iconURL: client.user.displayAvatarURL()});

                return interaction.reply({ embeds: [embed] });
            }
        }

    } 
    
}