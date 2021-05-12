import Discord from "discord.js";
import Dotenv from "dotenv";
import commands from "./commands.js";

Dotenv.config();

const client = new Discord.Client();

client.on("ready", () => {
    console.log("I am up and running.");
});

client.on("message", async (msg) => {
    const tokens = msg.content.split(" ");
    let [command, ...args] = tokens;
    if (command[0] !== "!") {
        return;
    }
    command = command.substr(1);
    if (command in commands) {
        commands[command](msg, ...args);
    }
});

client.login(process.env.DISCORD_API_KEY);
