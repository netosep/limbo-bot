const { MessageEmbed } = require("discord.js");
const { bot } = require("../../index");

let embed = new MessageEmbed().setColor("BLACK");

bot.distube.on("playSong", (queue, song) => {
    embed.setAuthor("Tocando agora 🎶", bot.user.displayAvatarURL())
        .setThumbnail(song.thumbnail)
        .setDescription(`
            > **🔗 [${song.name}](${song.url})**
            > **🔊 Tocando em: ${queue.voiceChannel}**
            > **⏱ Duração: \`${song.formattedDuration}\`**
            > **👤 Pedida por: ${song.user.id === bot.user.id ? "\`AUTOPLAY\`" : song.user}**
        `);

    return queue.textChannel.send({ embeds: [embed] });
});

bot.distube.on("addList", (queue, playlist) => {
    embed.setAuthor("Uma nova playlist foi adicionada 🆙", bot.user.displayAvatarURL())
        .setThumbnail(playlist.thumbnail)
        .setDescription(`
            > **🔗 [${playlist.name}](${playlist.url})**
            > **🔊 Para tocar em: ${queue.voiceChannel}**
            > **⏱ Duração: \`${playlist.formattedDuration}\`**
            > **📂 Tamanho: \`${playlist.songs.length} musicas\`**
            > **👤 Adicionada por: ${playlist.user.id === bot.user.id ? "\`AUTOPLAY\`" : playlist.user}**
        `);

    return queue.textChannel.send({ embeds: [embed] });
});

bot.distube.on("addSong", (queue, song) => {
    embed.setAuthor("Uma nova música foi adicionada a fila 🔜", bot.user.displayAvatarURL())
        .setThumbnail(song.thumbnail)
        .setDescription(`
            > **🔗 [${song.name}](${song.url})**
            > **🔊 Para tocar em: ${queue.voiceChannel}**
            > **⏱ Duração: \`${song.formattedDuration}\`**
            > **👤 Pedida por: ${song.user.id === bot.user.id ? "\`AUTOPLAY\`" : song.user}**
        `);

    return queue.textChannel.send({ embeds: [embed] });
});

bot.distube.on("initQueue", (queue) => {
    queue.autoplay = false;
    queue.volume = 100;
});

bot.distube.on("searchNoResult", (message, query) => {
    return message.reply("> **Nada encontrado... 😕 Seja um pouco mais específico...  📝**");
});

bot.distube.on("finish", (queue) => {
    return queue.textChannel.send("> **Já que não tem mais nada pra tocar, tô vazando!  👋**");
});

bot.distube.on("empty", (queue) => {
    return queue.textChannel.send("> **Não vou ficar tocando sozinho aqui não, tô vazando! 😠**");
});

bot.distube.on("error", (channel, err) => {
    return channel.send(`
        > **Aconteceu alguma coisa errada aqui... 🥺👇🏿**\n\`\`\`fix\n${err}\`\`\`
    `);
});