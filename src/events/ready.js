const { client } = require("../../index");


client.on("ready", async () => {

    console.log(`# Client ${client.user.username}#${client.user.discriminator} is ready!`);

    client.guilds.cache.forEach(guild => guild.commands.set(client.commands));
    client.user.setStatus('dnd'); // dnd, idle, online, invisible
    

    let i = 0;
    let status = [
        "minha nova versão!",
        "/help",
        `em ${client.guilds.cache.size} servidores! 🥰`,
        "me mencione para obter ajuda..."
    ];

    setInterval(() => client.user.setActivity(`${status[i++ % status.length]}`, { 
        type: "LISTENING", // PLAYING, STREAMING, LISTENING, WATCHING, COMPETING
        // url: "https://www.twitch.tv/net0xy",
        // url: "https://www.youtube.com/watch?v=sSQH1Hin9-I", // video do samuel silva
    }), 10000);

});
