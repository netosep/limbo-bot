const { bot } = require("../../index");

bot.on("ready", async () => {

    let status = [
        "boas energias!",
        "use ?help",
        `em ${bot.guilds.cache.size} servidores! 🥰`,
        "me mencione para obter ajuda..."
    ];

    let i = 0;
    bot.user.setStatus('dnd') // dnd, idle, online, invisible
    setInterval(() => bot.user.setActivity(`${status[i++ % status.length]}`, { 
        type: "STREAMING", // PLAYING, STREAMING, LISTENING, WATCHING, COMPETING
        //url: "https://www.twitch.tv/net0xy",
        url: "https://www.youtube.com/watch?v=sSQH1Hin9-I", // video do samuel silva
    }), 10000);

});
