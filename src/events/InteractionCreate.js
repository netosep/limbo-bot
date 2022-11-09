const { InteractionType } = require("discord.js");
const { client } = require("../../index");

client.on("interactionCreate", (interaction) => {

    /**
     * https://discord.js.org/#/docs/discord.js/main/class/CommandInteraction
     */
    if (interaction.type === InteractionType.ApplicationCommand) {
        let slashCommand = client.commands.get(interaction.commandName);
        if (!slashCommand) return;

        slashCommand.run(client, interaction);
    }
})
