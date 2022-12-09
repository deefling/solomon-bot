const fs = require('node:fs');
const path = require('node:path');

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
	await aiBootUp();
});

async function aiBootUp(){
	await aiText("connecting to fair servers");
	await aiText("callibrating ai");
	await aiText("activating neuromorphic daemon");
	await aiText("targeting subroutine 'solomon'");
	await aiText("<<solomon has been booted up>>", false);
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