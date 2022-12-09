const { SlashCommandBuilder } = require('discord.js');
const mongoDriver = require('../mongoDriver.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('set')
		.setDescription('Modifies your Paragon')
        .addStringOption( option => 
            option.setName('name')
            .setDescription('The name of your Paragon')
        )
        .addStringOption( option => 
            option.setName('equipment')
            .setDescription('The equipment of your Paragon')
        )
        .addStringOption( option => 
            option.setName('look')
            .setDescription('The look of your Paragon')
        ),
	async execute(interaction) {
        

        var name = interaction.options.getString('name');
        if(name != null){
            const filter = { user: interaction.user.id };
            const updateDoc = {
            $set: {
              name: name
            },
          };
          var result = await mongoDriver.updateParagon(filter, updateDoc);
          if(result.hasOwnProperty('error')){
            await interaction.reply(error);
            return;
          }
        }



        var equipment = interaction.options.getString('equipment');
        if(equipment != null){
            const filter = { user: interaction.user.id };
            const updateDoc = {
            $set: {
              equipment: equipment
            },
          };
          var result = await mongoDriver.updateParagon(filter, updateDoc);
          if(result.hasOwnProperty('error')){
            await interaction.reply(error);
            return;
          }
        }




        var look = interaction.options.getString('look');
        if(look != null){
            const filter = { user: interaction.user.id };
            const updateDoc = {
            $set: {
              look: look
            },
          };
          var result = await mongoDriver.updateParagon(filter, updateDoc);
          if(result.hasOwnProperty('error')){
            await interaction.reply(error);
            return;
          }
        }


		await interaction.reply('Paragon has been updated');
	},
};