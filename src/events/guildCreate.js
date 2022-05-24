const { bot } = require("../../index");
const { MessageEmbed } = require("discord.js");

bot.on("guildCreate", async (guild) => {

    await bot.database.guildInfo.findOne({ 
        "guild_id": guild.id 
    })
    .then(async (result) => {
        if(!result) {
            new bot.database.guildInfo({
                guild_id       : guild.id,
                guild_name     : guild.name,
                guild_owner_id : guild.ownerId,
                guild_icon_url : guild.iconURL({ size: 1024 }),
                created_at     : Date.now()
            })
            .save()
            .then(() => {
                return console.log(`Novo servidor adicionado ao banco de dados: ${guild.name}`);
            })
            .catch((err) => {
                console.log(`Ocorreu um erro ao adicionar o servidor ${guild.name} ao banco de dados...`);
                return console.error(err);
            });
        } else {
            await bot.database.guildInfo.updateOne({ guild_id: guild.id }, { active : true });
            return console.log(`Estou de volta ao servidor: ${guild.name}`);
        }
    })
    .catch((err) => {
        return console.error(err);
    });

    let guildData = await bot.database.guildInfo.findOne({ guild_id: guild.id });
    let prefix = guildData.guild_prefix;
    let channel = guild.channels.cache.filter(channel => channel.type == "GUILD_TEXT").first();

    if(channel) {
        // mensagem de entrada no servidor
        let embed = new MessageEmbed()
            .setColor("BLACK")
            .setTitle(`Saudações ${guild.name} 🖖🏿`)
            .setThumbnail(guild.iconURL())
            .setDescription(`
                > Olá! Gostaria de agradecer por me adicionar ao servidor! 🥰
                > Meu nome é **${bot.user.username}**, sou um simples e simpático
                > BOT de discord desenvolvido em Node.js. 🤖\n
                > Quem me mantem vivo é o meu criador, <@!${process.env.BOT_OWNER_ID}>. 🤍
                > Para ver a minha lista de comandos utilize o comando **\`${prefix}help\`** e
                > a qualquer momento, você pode me mencionar caso precise de ajuda.\n
                > Estou em constante desenvolvimento e bugs podem acontecer,
                > então, se você encontrar um bug, por favor, utilize o comando
                > **\`${prefix}bug\`** para reportar o acontecido para uma futura correção. 🪲\n
                > Sou de código aberto e de fácil configuração.
                > Você pode contribuir com o meu desenvolvimento
                > através do meu repositório oficial [clicando aqui](https://github.com/netosep/limbo-bot). 👨🏻‍💻\n
                > **Aproveite!** 😊
            `)
            .setFooter({
                text: `© ${bot.user.username} | 2021 - ${new Date().getFullYear()}`, 
                iconURL: bot.user.displayAvatarURL()
            })
            .setTimestamp();

        return channel.send({
            embeds: [embed], 
            allowedMentions: { repliedUser: false },
            failIfNotExists: false
        });
    }

});