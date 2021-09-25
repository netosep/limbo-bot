require("colors");

const asciiLogo = function() {

    console.clear();
    console.log(`╔═══════════════════════════════╗`.yellow)
    console.log(`║   _ _           _             ║`.yellow);
    console.log(`║  | (_)         | |            ║`.yellow);
    console.log(`║  | |_ _ __ ___ | |__   ___    ║`.yellow);
    console.log(`║  | | | '_ \` _ \\  '_ \\ / _ \\   ║`.yellow);
    console.log(`║  | | | | | | | | |_) | (_) |  ║`.yellow);
    console.log(`║  |_|_|_| |_| |_|_.__/ \\___/   ║`.yellow);
    console.log(`║                               ║`.yellow);
    console.log(`╚═══════════════════════════════╝`.yellow);
}

module.exports = { asciiLogo }