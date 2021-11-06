const { Schema } = require("mongoose");
require("dotenv").config();

const prefix = process.env.BOT_PREFIX || "?";

const guildInfoTable = new Schema({
    guild_id       : { type: String, default: '0', required: true },
    guild_name     : { type: String, default: '0', required: true },
    guild_owner_id : { type: String, default: '0', required: true },
    guild_icon_url : { type: String, default: '0', required: false },
    guild_prefix   : { type: String, default: prefix, required: true },
    enable_rank    : { type: Boolean, default: false, required: true },
    created_at     : { type: Date, required: false },
    updated_at     : { type: Date, required: false }
},
{ 
    versionKey : false
});

const userInfoTable = new Schema({
    user_id         : { type: String, default: '0', required: true },
    user_name       : { type: String, default: '0', required: true },
    user_avatar_url : { type: String, default: '0', required: true },
    created_at      : { type: Date, required: false },
    updated_at      : { type: Date, required: false }
},
{ 
    versionKey : false
});

const rankInfoTable = new Schema({
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

const disabledCmdsTable = new Schema({
    guild_id   : { type: String, default: '0', required: true },
    channel_id : { type: String, default: '0', required: true },
    commands   : { type: Array, default: [], required: true }
},
{ 
    versionKey : false
});

module.exports = {
    guildInfoTable,
    userInfoTable,
    rankInfoTable,
    disabledCmdsTable
}