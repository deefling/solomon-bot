const { SlashCommandBuilder } = require('discord.js');
const mongoDriver = require('../mongoDriver.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('delete_paragon')
		.setDescription('Deletes your DIE paragon'),
	async execute(interaction) {
		await interaction.deferReply();
        var result = await mongoDriver.deleteParagon(interaction.user.id);
		if(result.hasOwnProperty("error")){
			await interaction.editReply(result.error);
			return;
		}    
		await interaction.editReply(result);
	},
};