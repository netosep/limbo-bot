const client = require("mongoose");
const { guildInfoTable, userInfoTable, rankInfoTable, disabledCmdsTable } = require("./schemas");
require("dotenv").config();

const uri = process.env.MONGODB_URL;
client.connect(uri, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => {
    console.log("===== Client is Ready! =====");
    return console.log("Success connecting to DB");
})
.catch((err) => {
    console.log("An error occurred connecting to the DB...");
    return console.error(err);
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