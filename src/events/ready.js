const { bot } = require("../../index");

bot.on("ready", async () => {

    var status = [
        "boas energias!",
        "use ?help",
        "novos comandos!",
        `em ${bot.guilds.cache.size} servidores 🥰`,
        "me mencione para obter ajuda...",
        `para ${bot.users.cache.size} usuários 🤪`
    ];

    let i = 0;
    await bot.user.setStatus('dnd') // dnd, idle, online, invisible
    setInterval(() => bot.user.setActivity(`${status[i++ % status.length]}`, { 
        type:"STREAMING", // PLAYING, STREAMING, LISTENING, WATCHING, COMPETING
        //url: "https://www.twitch.tv/net0xy",
        url: "https://www.youtube.com/watch?v=sSQH1Hin9-I", // video do samuel silva
     }), 10000);

});
