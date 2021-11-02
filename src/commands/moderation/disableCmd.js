
module.exports = { 

    help: {
        name: "disable",
        usage: ["disable <command>", "dc <comand> <command>"],
        description: "Desativa o uso do comando no canal.",
        accessableBy: "Administrador.",
        aliases: ["dc", "desativarcmd", "disablecmd"]
    },

    run: async (bot, message, args) => {

        if(message.member.permissions.has("ADMINISTRATOR")) {
            
            let dataDB = await bot.database.disabledCmds.findOne(
                { guild_id: message.guild.id, channel_id: message.channel.id }
            );

            let commandsToDisable = [];
            args.forEach((arg) => {
                var command = bot.commands.get(bot.aliases.get(arg.toLowerCase()) || arg.toLowerCase());
                if(command) commandsToDisable.push(command.help.name);
            });

            if(dataDB) {
                dataDB.commands.forEach((cmdDB) => {
                    commandsToDisable.forEach((cmd) => {
                        if(cmdDB === cmd) {
                            var index = commandsToDisable.indexOf(cmd);
                            commandsToDisable.splice(index, 1);
                        }
                    });
                });

                if(commandsToDisable.length > 0) {

                    commandsToDisable.forEach((cmd) => { dataDB.commands.push(cmd) });

                    await bot.database.disabledCmds.updateOne(
                        { guild_id: message.guild.id, channel_id: message.channel.id },
                        {
                            guild_id   : message.guild.id,
                            channel_id : message.channel.id,
                            commands   : dataDB.commands
                        }
                    );

                    let successString = "O comando foi desativado nesse canal";
                    if(commandsToDisable.length > 1) successString = "Os comandos foram desativados nesse canal";
                    return message.reply({
                        content: `> **${successString}.**`,
                        allowedMentions: { repliedUser: false }
                    });

                } else {
                    return message.reply({
                        content: "> **Esse comando já está desabilitado para esse canal!**",
                        allowedMentions: { repliedUser: false }
                    });
                }
                
            } else {

                return await new bot.database.disabledCmds({
                    guild_id   : message.guild.id,
                    channel_id : message.channel.id,
                    commands   : commandsToDisable
                }).save();
            }

        } else {
            return message.reply({
                content: "> **Você não tem permissão para acessar esse comando!**",
                allowedMentions: { repliedUser: false }
            });
        }
        
    } 
    
}