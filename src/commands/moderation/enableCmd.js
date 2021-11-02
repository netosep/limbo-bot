
module.exports = { 

    help: {
        name: "enable",
        usage: ["enable <command>", "ec <command> <command>"],
        description: "Ativa o uso do comando no canal.",
        accessableBy: "Administrador.",
        aliases: ["ac", "ativarcmd", "enablecmd"]
    },

    run: async (bot, message, args) => {

        if(message.member.permissions.has("ADMINISTRATOR")) {
            
            let dataDB = await bot.database.disabledCmds.findOne(
                { guild_id: message.guild.id, channel_id: message.channel.id }
            );

            let commandExists;
            let commandsToEnable = [];
            args.forEach((arg) => {
                var command = bot.commands.get(bot.aliases.get(arg.toLowerCase()) || arg.toLowerCase());
                if(command) {
                    commandExists = true;
                    commandsToEnable.push(command.help.name);
                } else {
                    commandExists = false;
                    return message.reply({
                        content: "> **Esse comando não existe!**",
                        allowedMentions: { repliedUser: false }
                    });
                }
            });

            if(dataDB) {
                let dbCommandsLength = dataDB.commands.length;
                commandsToEnable.forEach((cmd) => {
                    dataDB.commands.forEach((cmdDB) => {
                        if(cmd === cmdDB) {
                            var index = dataDB.commands.indexOf(cmd);
                            dataDB.commands.splice(index, 1);
                        }
                    });
                });

                if(dbCommandsLength === dataDB.commands.length && commandExists){
                    return message.reply({
                        content: "> **Esse comando já está ativo!**",
                        allowedMentions: { repliedUser: false }
                    });
                }
                
                await bot.database.disabledCmds.updateOne(
                    { guild_id: message.guild.id, channel_id: message.channel.id },
                    {
                        guild_id   : message.guild.id,
                        channel_id : message.channel.id,
                        commands   : dataDB.commands
                    }
                );

                if(commandExists) {
                    let successString = "O comando está ativo novamente para uso neste canal";
                    if(args.length > 1) successString = "Os comandos estão ativos novamente para uso neste canal";
                    return message.reply({
                        content: `> **${successString}.**`,
                        allowedMentions: { repliedUser: false }
                    });
                }
            } 
            
        } else {
            return message.reply({
                content: "> **Você não tem permissão para acessar esse comando!**",
                allowedMentions: { repliedUser: false }
            });
        }
        
    } 
    
}