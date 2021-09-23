const { bot } = require("../../index");

bot.on("ready", async () => {

    var status = [
        "boas energias!"
    ];

    let i = 0;
    await bot.user.setStatus('dnd') // dnd, idle, online, invisible
    setInterval(() => bot.user.setActivity(`${status[i++ % status.length]}`, { 
        type:"STREAMING", // PLAYING, STREAMING, LISTENING, WATCHING, COMPETING
        //url: "https://www.twitch.tv/net0xy",
        url: "https://www.youtube.com/watch?v=sSQH1Hin9-I", // video do samuel silva
     }), 10000);

    console.log("Connecting to the database...");

})
