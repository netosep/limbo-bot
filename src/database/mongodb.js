const client = require("mongoose");
const env = require("dotenv");
const { 
    guildInfoTable, 
    userInfoTable, 
    rankInfoTable, 
    disabledChannelsTable 
} = require("./schemas");

env.config();

const uri = process.env.MONGODB_URL;

client.connect(uri, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => {
    return console.log("Success!")
})
.catch((err) => {
    console.log("Error!")
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
