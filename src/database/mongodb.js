const client = require("mongoose");
const { bugReportsTable, guildInfoTable, userInfoTable, rankInfoTable, disabledCmdsTable } = require("./schemas");
require("dotenv").config();

const uri = process.env.MONGODB_URL;
client.connect(uri, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => {
    console.log("===== Client is Ready! =====");
    return console.log("Successfully connected to the database");
})
.catch((err) => {
    console.log("An error occurred connecting to the DB...");
    return console.error(err);
});

const bugReports   = client.model("bugReports", bugReportsTable);
const guildInfo    = client.model("guild", guildInfoTable);
const userInfo     = client.model("user", userInfoTable);
const rankInfo     = client.model("rank", rankInfoTable);
const disabledCmds = client.model("disabledCmds", disabledCmdsTable);

module.exports = {
    bugReports,
    guildInfo,
    userInfo,
    rankInfo,
    disabledCmds
}