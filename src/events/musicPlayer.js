const { MessageEmbed } = require("discord.js");
const { bot } = require("../../index");

let embed = new MessageEmbed().setColor("BLACK");

bot.distube.on("playSong", (message, queue, song) => {

    message.react("▶");
    return message.channel.send(embed
        .setAuthor("Tocando agora 🎵", bot.user.displayAvatarURL())
        .setThumbnail(song.thumbnail)
        .setDescription(`
            > **🔊 [${song.name}](${song.url})
            > Duração: \`${song.formattedDuration}\`
            > Pedida por: \`${song.user.username}#${song.user.discriminator}\`**
        `)
    );

});

bot.distube.on("playList", (message, queue, playlist, song) => {
    
    message.react("✅");
    return message.channel.send(embed
        .setAuthor("Playlist adicionada 🆙", bot.user.displayAvatarURL())
        .setThumbnail(playlist.thumbnail.url)
        .setDescription(`
            > **🔊 [${playlist.name}](${playlist.url})
            > Duração: \`${playlist.formattedDuration}\`
            > Tamanho: \`${playlist.songs.length} musicas\`
            > Pedida por: \`${song.user.username}#${song.user.discriminator}\`**
        `)
    );

});

bot.distube.on("addSong", (message, queue, song) => {

    message.react("✅");
    return message.channel.send(embed
        .setAuthor("Música adicionada a fila 🔜", bot.user.displayAvatarURL())
        .setThumbnail(song.thumbnail)
        .setDescription(`
            > **🔊 [${song.name}](${song.url})
            > Duração: \`${song.formattedDuration}\`
            > Pedida por: \`${song.user.username}#${song.user.discriminator}\`**
        `)
    );

});

bot.distube.on("initQueue", (queue) => {
    queue.autoplay = false;
    queue.volume = 100;
});

bot.distube.on("finish", (message) => {
    
    if(message.member.voice.channel) {
        setTimeout(() => {
            if(!bot.distube.isPaused(message) && !bot.distube.isPlaying(message)) {
                message.channel.send("> **Já que não tô tocando nada, tô vazando do canal!  👋**");
                return message.member.voice.channel.leave();
            }
        }, 60000);
    }
    
});