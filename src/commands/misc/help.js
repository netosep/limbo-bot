const { MessageEmbed } = require("discord.js");
require("dotenv").config();

module.exports = { 

    help: {
        name: "help",
        usage: ["help", "help <comando>"],
        description: "Mostra todos os comandos disponíveis do bot.",
        accessableBy: "Todos os membros.",
        aliases: ["ajuda", "h"]
    },

    run: async (bot, message, args) => {

        let data = await bot.database.guildInfo.findOne({ guild_id: message.guild.id });
        let prefix = data.guild_prefix;

        let embed = new MessageEmbed()
            .setAuthor('Esses são os meus comandos disponíveis:', 'https://i.imgur.com/ga5FQNR.png')
            .setThumbnail(bot.user.displayAvatarURL())
            .setColor("BLACK")
            .setFooter(`© ${bot.user.username} - ${new Date().getFullYear()} | Comando help`, bot.user.displayAvatarURL());

        if(!args[0]){
            embed.addField('Comandos gerais:  ⚙',
                `> **\`${prefix}activity\`**    - iniciar uma atividade no canal do discord.\n`+
                `> **\`${prefix}avatar\`**      - mostra o seu avatar ou o de alguém mencionado.\n`+
                `> **\`${prefix}csgo\`**        - mostra algus dados de uma conta de CS:GO.\n`+
                `> **\`${prefix}help\`**        - mostra os comandos disponíveis do bot.\n`+
                `> **\`${prefix}invite\`**      - link de convite para adicionar o bot ao seu servidor.\n`+
                `> **\`${prefix}ping\`**        - mostra o tempo de resposta do bot.\n`+
                `> **\`${prefix}reminder\`**    - te manda uma mensagem de lembrete.\n`+
                `> **\`${prefix}serverinfo\`**  - mostra algumas informações do servidor.\n`+
                `> **\`${prefix}steam\`**       - busca um perfil steam pela url ou steamid.\n`+
                // sugestion
                `> **\`${prefix}tracking\`**    - mostra os dados de uma encomenda dos correios.\n`+
                `> **\`${prefix}tts\`**         - entra no canal e fala o texto digitado.\n`+
                `> **\`${prefix}uptime\`**      - mostra o tempo online do bot.\n`+
                `> **\`${prefix}userinfo\`**    - mostra algumas informações da conta do discord.\n`+
                `> **\`${prefix}weather\`**     - mostra a previsão do tempo da cidade informada.\n`
            );
            embed.addField('Comandos musicais:  🎶',
                `> **\`${prefix}autoplay\`** - coloca a fila de reprodução em automático.\n`+
                `> **\`${prefix}clear\`**    - limpa a fila de músicas para reprodução.\n`+
                // filter
                `> **\`${prefix}pause\`**    - pausa a reprodução de uma música.\n`+
                `> **\`${prefix}play\`**     - busca no youtube e reproduz a música solicitada.\n`+
                // queue
                `> **\`${prefix}resume\`**   - retoma a música que estava em pausa.\n`+
                `> **\`${prefix}skip\`**     - pula a musica que está tocando para a próxima da fila.\n`+
                `> **\`${prefix}stop\`**     - para a reprodução de uma música e sai do canal.\n`+
                `> **\`${prefix}volume\`**   - define o volume da música que está reproduzindo.`
            );
            embed.addField('Comandos de moderação:  👮‍♂️',
                `> **\`${prefix}disable\`**   - desabilita o uso do(s) comando(s) no canal.\n`+
                `> **\`${prefix}enable\`**    - habilita o uso do(s) comando(s) no canal.\n`+
                `> **\`${prefix}setprefix\`** - definir o prefixo do bot no servidor.\n`
            );
            embed.addField('Comandos de desenvolvedor:  👨‍💻',
                `> **\`${prefix}eval\`**  - testa/executa uma entrada de código.\n`+
                `> **\`${prefix}lower\`** - converte uma palavra ou frase para letras minúsculas.\n`+
                `> **\`${prefix}md5\`**   - converte uma palavra ou frase para char md5.\n`+
                // qrcode
                // repo
                `> **\`${prefix}upper\`** - converte uma palavra ou frase para letras maiúsculas.\n`
            );
            embed.addField("Use também:  🔥",
                `> \`${prefix}help <comando>\` - mostra mais sobre o comando e como usar.`
            );

            return message.reply({ 
               embeds: [embed], 
               allowedMentions: { repliedUser: false },
               failIfNotExists: false 
            });

        } else{

            let command = bot.commands.get(bot.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase())

            if(!command){
                embed.setAuthor('Comando inválido!', 'https://i.imgur.com/ga5FQNR.png')
                    .setDescription(`
                        > Me perdoe ${message.author}, mas esse comando não existe! 
                        > Use \`${prefix}help\` para ver os comandos disponíveis.
                    `)
                return message.reply({ 
                    embeds: [embed], 
                    allowedMentions: { repliedUser: false },
                    failIfNotExists: false 
                });
            }

            command = command.help;

            embed.setAuthor(`Comando ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}`, 'https://i.imgur.com/ga5FQNR.png')
                .setDescription(`
                    > ▫ **Descrição:**
                    > \`${command.description || "não possui."}\`
                    > ▫ **Como usar:**
                    > \`${prefix}${command.name ? command.usage.join(` / ${prefix}`) : 'não definido.'}\`
                    > ▫ **Quem pode usar:**
                    > \`${command.accessableBy}\`
                    > ▫ **Atalhos:**
                    > \`${prefix}${command.aliases ? command.aliases.join(` / ${prefix}`) : "não possui."}\`
                `);
            
            return message.reply({ 
                embeds: [embed], 
                allowedMentions: { repliedUser: false },
                failIfNotExists: false 
            });

        }
        
    } 
    
}