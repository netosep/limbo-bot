const fs = require("fs");
const path = require("path");

function findFile(directory, pattern) {

    var results = [];

    fs.readdirSync(directory).forEach(innerDirectory => {
        innerDirectory = path.resolve(directory, innerDirectory);
        const state = fs.statSync(innerDirectory);

        if(state.isDirectory()) {
            results = results.concat(findFile(innerDirectory, pattern));
        }

        if(state.isFile() && innerDirectory.endsWith(pattern)) {
            results.push(innerDirectory);
        }

    });

    return results;

}

const commandFiles = findFile("./src/commands", ".js");

function setup(bot) {

    fs.readdir("./src/events", (err, files) => {

        if(err) {
            return console.error(err);
        }

        var jsFiles = files.filter(file => file.split(".").pop() === "js");

        if(jsFiles.length <= 0) {
            return console.log("sem eventos para carregar")
        }

        console.clear();
        console.log(`\x1b[33m`); // cor console amarela
        console.log(`╔══════════════════════════════════╗`)
        console.log(`║   _ _           _                ║`);
        console.log(`║  | (_)         | |               ║`);
        console.log(`║  | |_ _ __ ___ | |__   ___       ║`);
        console.log(`║  | | | '_ \` _ \\  '_ \\ / _ \\      ║`);
        console.log(`║  | | | | | | | | |_) | (_) |     ║`);
        console.log(`║  |_|_|_| |_| |_|_.__/ \\___/      ║`);
        console.log(`║                                  ║`);
        console.log(`╚══════════════════════════════════╝`)
        console.log(`\x1b[0m`); // retornando a cor normal
        console.log("Loading events...\n");

        jsFiles.forEach((file, i = 0) => {
            require(`../events/${file}`); 
            i++;
            console.log(`→ ${file} - OK!`)
            if(i === jsFiles.length) {
                console.log(`\n${i} events loaded successfully!\n`)
            }
        })

    });

    commandFiles.forEach(file => {

        var props = require(file);
        bot.commands.set(props.help.name, props);
        
        props.help.aliases.forEach(aliase => {
            bot.aliases.set(aliase, props.help.name);
        });

    });

}

module.exports = { setup };
