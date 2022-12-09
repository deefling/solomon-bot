const { SlashCommandBuilder } = require('discord.js');
const mongoDriver = require('../mongoDriver.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('delete_paragon')
		.setDescription('Deletes your DIE paragon'),
	async execute(interaction) {
        var result = await mongoDriver.deleteParagon(interaction.user.id);
		if(result.hasOwnProperty("error")){
			await interaction.reply(result.error);
			return;
		}    
		await interaction.reply(result);
	},
};