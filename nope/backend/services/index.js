const authService = require("./authService");
const userService = require("./userService");
// const groupService = require("./groupService"); // Später für Jesper?
// const eventService = require("./eventService"); // Später für Jesper?

module.exports = function(dbURL) {
    return {
        auth: authService(dbURL),
        user: userService(dbURL),
        // groups: groupService(dbURL), // Später für Jesper?
        // events: eventService(dbURL) // Später für Jesper?
    };
};