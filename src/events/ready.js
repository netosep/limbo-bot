const { bot } = require("../../index");
const database = require("../database/connection");

bot.on("ready", async () => {

    database.testConnection()
})
