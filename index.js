const { Client, Collection } = require("discord.js");
const { DisTube } = require("distube");
const { SpotifyPlugin } = require('@distube/spotify')
const { SoundCloudPlugin } = require('@distube/soundcloud')
const { YtDlpPlugin } = require('@distube/yt-dlp')

const client = new Client({ intents: ['Guilds', 'GuildMessages', 'MessageContent', 'GuildMembers', 'GuildVoiceStates', 'GuildPresences'] });
const dotenv = require("dotenv");
const handler = require("./src/lib/handler");

client.commands = new Collection();

client.distube = new DisTube(client, {
    leaveOnStop: false,
    emitNewSongOnly: true,
    emitAddSongWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: false,
    plugins: [
        new SpotifyPlugin({
            emitEventsAfterFetching: true
        }),
        new SoundCloudPlugin(),
        new YtDlpPlugin()
    ]
})



client.distube.on("error", (channel, err) => {
    console.log(err);
})


dotenv.config();
handler.setup(client);

client.login(process.env.BOT_TOKEN);

module.exports = { client }