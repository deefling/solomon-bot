const { SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;


module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Lists commands and what they do'),
	async execute(interaction) {
		await interaction.deferReply();
		// await wait(4000);
        var text = "/ping: Responds with 'Pong!'\n"
        + "/paragon: Create your Paragon for the DIE RPG.\n"
        + "/delete_paragon: Delete your Paragon - you can only have one registered at a time.\n"
        + "/roll: Roll the core mechanic for DIE based on your stats & class.";

		await interaction.editReply(text);
	},
};