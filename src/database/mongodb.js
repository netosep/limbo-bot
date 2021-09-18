const client = require('mongoose');
const env = require("dotenv");
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

var guildInfoTable = new client.Schema({
    guild_id       : { type: String, default: '0', required: true },
    guild_name     : { type: String, default: '0', required: true },
    guild_owner_id : { type: String, default: '0', required: true },
    guild_icon_url : { type: String, default: '0', required: true },
    guild_prefix   : { type: String, default: '?', required: true },
    enable_rank    : { type: Boolean, default: false, required: true },
    created_at     : { type: Date, default: Date.now(), required: true }
},
{ 
    versionKey : false
});

var userInfoTable = new client.Schema({
    user_id         : { type: String, default: '0', required: true },
    user_name       : { type: String, default: '0', required: true },
    user_avatar_url : { type: String, default: '0', required: true },
    created_at      : { type: Date, default: Date.now(), required: true }
},
{ 
    versionKey : false
});

var rankInfoTable = new client.Schema({
    user_id        : { type: String, default: '0', required: true },
    guild_id       : { type: String, default: '0', required: true },
    level          : { type: Number, default: 0, required: true },
    experience     : { type: Number, default: 0, required: true },
    next_level_exp : { type: Number, default: 100, required: true },
    messages       : { type: Number, default: 0, required: true },
    time_connected : { type: String, default: '0', required: true }
},
{ 
    versionKey : false
});

const guildInfo = client.model("guild", guildInfoTable);
const userInfo  = client.model("user", userInfoTable);
const rankInfo  = client.model("rank", rankInfoTable);

module.exports = { 
    guildInfo,
    userInfo,
    rankInfo
}
