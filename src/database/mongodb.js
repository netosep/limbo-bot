const client = require("mongoose");
const env = require("dotenv");
const { 
    guildInfoTable, 
    userInfoTable, 
    rankInfoTable, 
    disabledCmdsTable 
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

const guildInfo    = client.model("guild", guildInfoTable);
const userInfo     = client.model("user", userInfoTable);
const rankInfo     = client.model("rank", rankInfoTable);
const disabledCmds = client.model("disabledCmds", disabledCmdsTable);

module.exports = { 
    guildInfo,
    userInfo,
    rankInfo,
    disabledCmds
}