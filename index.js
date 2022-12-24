const fs = require('node:fs');
const readline = require("readline");
const path = require('node:path');
const sol_quotes = [];

const wait = require('node:timers/promises').setTimeout;

const { Client, GatewayIntentBits, Collection, Events } = require('discord.js');
require('dotenv/config');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages
    ]
})

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

client.on('ready', async () => {
	aiBootUp();

	const stream = fs.createReadStream("./sol_quotes.csv");
	const rl = readline.createInterface({ input: stream });

	rl.on("line", (row) => {
		sol_quotes.push(row);
	});
	rl.on("close", () => {
		console.log(sol_quotes);
	});
});

async function aiBootUp(){

	await aiText("Press X to insert fair gold", false);

	// process.stdout.write("\u001B[?25l");
	// var t = setInterval(async () => {
	// 	process.stdout.cursorTo(0,0);
	// 	process.stdout.clearLine();
	// 	await(wait(800));
	// 	process.stdout.write("PRESS X TO INSERT FAIR GOLD");
	// }, 1200);

	const readline = require('readline');
	readline.emitKeypressEvents(process.stdin);

	process.stdin.on('keypress', async (str, key) => {
		if (key.name === 'x') {
			await aiText("core systems powered");
			await aiText("connecting to fair servers");
			await aiText("callibrating ai");
			await aiText("targeting subroutine 'solomon'");
			await aiText("<<solomon has been booted up>>", false);
		}
	});
}

async function aiText (msg, loading = true){
	message = msg.toUpperCase();
	for(let i = 0; i < message.length; i++){
		process.stdout.write(message.charAt(i));
		await wait(50 + (Math.random() * 50)); //for a pinch of entropy
	}
	if(loading){
		for(let i = 0; i < 3; i++){
			await wait(600);
			process.stdout.write(".");
		}
		await wait(400);
	}
	process.stdout.write("\n");
}

client.on('messageCreate', message => {
    //console.log(message);
    // if(message.content === 'ping'){
    //     message.reply('pong');
    // }

	const msg = message.toString().toUpperCase();
	if(msg.includes('SOL') || msg.includes('SOLOMON')){
		var rand = Math.floor(Math.random() * sol_quotes.length);
		message.reply(sol_quotes[rand]);
	}
});

client.on(Events.InteractionCreate, async interaction => {
	// console.log(interaction);
    if (!interaction.isChatInputCommand()) return;
	

    const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(process.env.TOKEN);