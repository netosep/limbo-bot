const client = require("mongoose");
const env = require("dotenv");
const { 
    guildInfoTable, 
    userInfoTable, 
    rankInfoTable, 
    disabledChannelsTable 
} = require("./schemas");
require("colors");

env.config();

const uri = process.env.MONGODB_URL;
client.connect(uri, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => {
    return console.log("→ ONLINE!\n→ Conectado com o banco de dados!".green);
})
.catch((err) => {
    console.log("→ ONLINE!\n→ Erro ao conectar com o banco de dados...".red);
    return console.error(err)
});

const guildInfo        = client.model("guild", guildInfoTable);
const userInfo         = client.model("user", userInfoTable);
const rankInfo         = client.model("rank", rankInfoTable);
const disabledChannels = client.model("disabledChannels", disabledChannelsTable);

module.exports = { 
    guildInfo,
    userInfo,
    rankInfo,
    disabledChannels
}
