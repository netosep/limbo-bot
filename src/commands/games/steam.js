const { EmbedBuilder, ApplicationCommandType, Client, Interaction, ApplicationCommandOptionType } = require("discord.js");
const Steam = require("steamid");
const axios = require("axios");
const moment = require("moment");

module.exports = { 

    name: "steam",
    description: "Mostra os detalhes de uma conta steam.",
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
            await axios(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${apiKey}&steamids=${steam}`)
            .then(async ({ data }) => {
                const steamAcc = data.response.players[0];
                const state = ["online", "offline", "ocupado", "away", "cochilando", "querendo trocar", "querendo jogar"];

                if(!steamAcc) {
                    return interaction.reply({
                        content: "> **Não foi possivel encontrar uma conta steam com esse parâmetro...**",
                        ephemeral: true
                    });
                }

                await axios(`http://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key=${apiKey}&steamids=${steam}`)
                .then(({ data }) => {
                    steamAcc.VACBanned = data.players[0].VACBanned;
                    steamAcc.gameBans = data.players[0].NumberOfGameBans;
                    steamAcc.VACBans = data.players[0].NumberOfVACBans;
                })
                .catch((err) => {
                    return console.error(err);
                });

                const embed = new EmbedBuilder()
                    .setColor("BLACK")
                    .setAuthor({
                        name: `Steam de ${(steamAcc.personaname).toUpperCase()}`, 
                        iconURL: steamAcc.avatarfull, 
                        url: steamAcc.profileurl
                    })
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
                    .setFooter({text: `Steam Info - © ${client.user.username}`, iconURL: "https://i.imgur.com/e9kv0wT.png"});

                return interaction.reply({ embeds: [embed] });

            })
            .catch((err) => {
                return interaction.reply({
                    content: "> **Aconteceu alguma coisa errada aqui e eu não vou conseguir fazer isso... 🥺**",
                    ephemeral: true
                });
            });
        }

    }

}