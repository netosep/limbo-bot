
const getEmoji = function(emoji) {
    var { bot } = require("../../index");
    return bot.emojis.cache.get(emoji);
}

module.exports = { getEmoji }