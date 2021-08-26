const { bot } = require("../../index");
const { logChannelID } = require("../../config.json")
const User = require("../utils/userQuery");
const Rank = require("../utils/rankQuery");

var userConnected;
var userDisconnected;
var users = [];
var logChannel

bot.on("voiceStateUpdate", async (oldMember, newMember) => {

    logChannel = newMember.guild.channels.cache.get(logChannelID);

    // desabilitando a função para o canal afk
    if(newMember.channelID === newMember.guild.afkChannelID) return;
    // desabilitando evento de ensurdecer (mutar fone)
    if(newMember.selfDeaf || oldMember.selfDeaf) return;
    if(newMember.serverDeaf || oldMember.serverDeaf) return;
    // desabilitando evento de mutar (mutar microfone)
    if(newMember.selfMute || oldMember.selfMute) return;
    if(newMember.serverMute || oldMember.serverMute) return;
    // desabilitando evento de abrir video
    if(newMember.selfVideo || oldMember.selfVideo) return;
    // desabilitando evento de trasmitir tela
    if(newMember.streaming || oldMember.streaming) return;
    // desabilitando para usuário bot
    if(newMember.member.user.bot || oldMember.member.user.bot) return;

    var channels = [];
    newMember.guild.channels.cache.forEach((channel) => {
        if(channel.type == "voice" && channel.id != newMember.guild.afkChannelID) {
            channels.push(channel.id);
        }
    });

    channels.forEach(async (channelId) => {

        if(newMember.channelID === channelId) {
            userConnected = newMember.member.user;
            var channel = newMember.channel;

            await User.findById(userConnected.id)
            .then(user => {
                if(!user.id) {
                    var insertUser = {
                        id         : userConnected.id,
                        name       : userConnected.username,
                        avatar_url : userConnected.displayAvatarURL({ size: 1024 }),
                        guild_id   : newMember.guild.id,
                        rank : {
                            xp         : 0,
                            nxt_lvl_xp : 100,
                            messages   : 0
                        }
                    }
                    User.insert(insertUser);
                    Rank.insert(insertUser)
                }
            })
            .catch((err) => {
                return console.error(err);
            });

            if(logChannel) logChannel.send(`\`\`\`fix\n- →📞 ${userConnected.username} entrou no canal ${channel.name}\`\`\``);

            //console.log(`→ ${userConnected.username} entrou no canal ${channel.name}`);
            userConnected.time_connected = 30000; // 30 segundos
            users.push(userConnected);

        }

        if(oldMember.channelID === channelId) {
            userDisconnected = oldMember.member.user;
            var channel = oldMember.channel;

            if(users.length > 0){
                for(let i = 0; i < users.length; i++) {
                    if(users[i].id === userDisconnected.id) {
                        if(logChannel) logChannel.send(`\`\`\`diff\n- ←📞 ${users[i].username} saiu do canal ${channel.name}\`\`\``);
                        // removendo do array o usuário desconectado
                        users.splice(i, 1); 
                    }
                }
            }

        }

    });

});


setInterval(() => {

    if(users.length < 1) return;

    users.forEach((user) => {
        Rank.updateTimeConected(user);
        if(logChannel) logChannel.send(`\`\`\`yaml\n- 🔄 Atualizando tempo de conexão de ${user.username} | +30seg\`\`\``);
    });

}, 30000);