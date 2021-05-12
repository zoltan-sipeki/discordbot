import fetch from "node-fetch";

async function tournaments(msg) {
    const url = `https://euw1.api.riotgames.com//lol/clash/v1/tournaments?api_key=${process.env.RIOT_API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
        msg.channel.send(`ERROR: ${response.status}, ${response.statusText}.`);
        return;
    }

    const json = await response.json();
    
    json.sort((a, b) => {
        if (a.id < b.id) {
            return -1
        };
        if (a.id > b.id) {
            return 1;
        }
        return 0;
    });
    
    let reply = "Upcoming League of Legends tournaments:\n";
    for (const t of json) {
        reply += "-------------------------\n";
        reply += `Name: ${t.nameKey} ${t.nameKeySecondary}\n`;
        reply += "Schedule:\n"
        let counter = 1;
        for (const s of t.schedule) {
            reply += `${counter++}:\n`;
            reply += `Registration time: ${new Date(s.registrationTime).toLocaleString()}\n`;
            reply += `Start time: ${new Date(s.startTime).toLocaleString()}\n`;
            reply += `Cancelled: ${s.cancelled}\n`;
            
        }
    }
    
    msg.channel.send(reply);
}

async function clan(msg, ...args) {
    if (args.length === 0) {
        msg.channel.send("Missing clan name.")
        return;
    }
    
    let limit = Number.parseInt(args[args.length - 1]);
    if (Number.isNaN(limit))
        limit = 5;
    else
        args.pop();
        
    if (args.length === 0) {
        msg.channel.send("Missing clan name.")
        return;
    }

    const search = args.join(" ");
    const url = `https://api.clashofclans.com/v1/clans?name=${search}&limit=${limit}`;
    const response = await fetch(url, {
        headers: {
            "Authorization": `Bearer ${process.env.COC_API_KEY}`
        }
    });

    if (!response.ok) {
        const error = await response.json();
        msg.channel.send(`Error! ${error.message}.`);
        return;
    }

    const json = await response.json();

    let counter = 1;
    let reply = "";
    for (const c of json.items) {
        reply += `${counter++}:\n`;
        reply += `Name: ${c.name}\n`;
        reply += `Level: ${c.clanLevel}\n`;
        reply += `Points: ${c.clanPoints}\n`;

        const wins = c.warWins ? c.warWins : 0;
        const ties = c.warTies ? c.warTies : 0;
        const losses = c.warLosses ? c.warLosses : 0;
        const total = wins + ties + losses;

        reply += `Total matches: ${total}, `;
        reply += `Wins: ${wins}, `;
        reply += `Ties: ${ties}, `;
        reply += `Losses: ${losses}, `;

        const winratio = total === 0 ? 0 : wins / total;

        reply += `Win Ratio: ${winratio.toPrecision(4)}%\n`;
        reply += `Members: ${c.members}\n`;
        reply += `Location: ${c.location ? c.location.name: "Unknown"}\n`;
        reply += "\n";
    }
    
    msg.channel.send(reply);
}

const commands = { tournaments, clan };
export default commands;
