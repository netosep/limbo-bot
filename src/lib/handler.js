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

module.exports = {
    setup: (client) => {

        // events
        fs.readdir("./src/events", (err, files) => {
            if(err) return console.error(err);

            var jsFiles = files.filter(file => file.split(".").pop() === "js");

            //console.clear();
            console.log(`╔═══════════════════════════════╗`)
            console.log(`║   _ _           _             ║`);
            console.log(`║  | (_)         | |            ║`);
            console.log(`║  | |_ _ __ ___ | |__   ___    ║`);
            console.log(`║  | | | '_ \` _ \\  '_ \\ / _ \\   ║`);
            console.log(`║  | | | | | | | | |_) | (_) |  ║`);
            console.log(`║  |_|_|_| |_| |_|_.__/ \\___/   ║`);
            console.log(`║                               ║`);
            console.log(`╚═══════════════════════════════╝`);
    
            if(jsFiles.length <= 0) return console.log("sem eventos para carregar");
    
            console.log("Loading events...");
            jsFiles.forEach((file, i = 0) => {
                require(`../events/${file}`); 
                i++;
                console.log(`→ ${file} - OK!`);
                if(i === jsFiles.length) {
                    console.log(`${i} events loaded successfully!`);
                }
            });
        });
    
        // commands
        findFile("./src/commands", ".js").forEach(file => {
            var props = require(file);
            client.commands.set(props.name, props);
        });
    }
}