const { createCanvas, loadImage, registerFont } = require("canvas");
const { MessageAttachment } = require("discord.js");

module.exports = { 

    help: {
        name: "teste",
        aliases: ["t"]
    },

    run: async (bot, message, args) => {

        if(message.author.id != "232310431174230026") return;

        const canvas = createCanvas(1180, 350);
        const ctx = canvas.getContext("2d");

        ctx.font = "20px Tahoma";
        ctx.textAlign = "center";
        ctx.fillStyle = "#fff"
        ctx.fillText("jacó bocó", 1000, 300)

        var imgRank = new MessageAttachment(canvas.toBuffer(), `rank-${message.author.username}.png`);
        message.channel.send(imgRank)


    } 
    
}