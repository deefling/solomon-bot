const { SlashCommandBuilder } = require('discord.js');
const mongoDriver = require('../mongoDriver.js');
const coreMechanic = require('../die/roller.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roll')
		.setDescription('Make a roll in DIE')
		.addStringOption(option =>
			option.setName('stat')
                .setDescription('The stat you are rolling in')
				.setRequired(true)
                .addChoices(
                    { name: 'str', value: 'str' },
                    { name: 'dex', value: 'dex' },
                    { name: 'con', value: 'con' },
                    { name: 'int', value: 'int' },
                    { name: 'wis', value: 'wis' },
                    { name: 'cha', value: 'cha' },
                )),
	async execute(interaction) {
		await interaction.deferReply();
		var paragon = await mongoDriver.getParagon(interaction.user.id);
		var rollResult = coreMechanic(paragon[interaction.options.getString('stat')], paragon.classDice);
		var returnStr = `>>> Rolls: ${rollResult.rolls}\nSuccesses: ${rollResult.successes}\nSpecials: ${rollResult.specials}`
		await interaction.editReply(returnStr);
	},
};