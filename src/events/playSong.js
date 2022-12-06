const { client } = require("../../index");

client.distube.on("playSong", (queue, song) => {
    //console.log(song);
    queue.textChannel.send(`Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}`)
});