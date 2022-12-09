const { SlashCommandBuilder } = require('discord.js');
const mongoDriver = require('../mongoDriver.js');
const paragonFactory = require('../die/paragonFactory.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stats')
		.setDescription('Shows your DIE Paragon\'s stats')
		.addUserOption( option => 
            option.setName('user')
            .setDescription('View someone else\'s Paragon')
        ),
	async execute(interaction) {    
		var _user = "";
		if(interaction.options.getUser('user') != null){
			_user = interaction.options.getUser('user').id
		} else {
			_user = interaction.user.id;
		}

		
        var userParagon = await mongoDriver.getParagon(_user);

        if(userParagon.hasOwnProperty('error')){
            await interaction.reply("Paragon not found.");
            return;
        }

		await interaction.reply(userParagon.toString());
	},
};