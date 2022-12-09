const { SlashCommandBuilder } = require('discord.js');
const mongoDriver = require('../mongoDriver.js');
const { EmotionKnight } = require('../die/emotion_knight.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ek')
		.setDescription('Set of commands for Emotion Knights')
        .addSubcommand(subcommand =>
          subcommand.setName('set')
			    .setDescription('Set various class features')
			    .addStringOption(option => 
            option.setName('sacred_emotion')
            .setDescription('Set your sacred emotion')
            .addChoices(
              { name: EmotionKnight.emotions[0], value: EmotionKnight.emotions[0] },
              { name: 'Admiration', value: 'Admiration' },
              { name: 'Terror', value: 'Terror' },
              { name: 'Amazement', value: 'Amazement' },
              { name: 'Grief', value: 'Grief' },
              { name: 'Loathing', value: 'Loathing' },
              { name: 'Rage', value: 'Rage' },
              { name: 'Vigilance', value: 'Vigilance' },
            )
          )
          .addIntegerOption( option => 
            option.setName('emotional_scale')
            .setDescription('The Emotional Scale score of your Paragon')
            .addChoices(
              { name: '+1', value: 0 },
              { name: '1', value: 1 },
              { name: '2', value: 2 },
              { name: '3', value: 3 },
              { name: '4', value: 4 },
              { name: '5', value: 5 },
              { name: '6', value: 6 },
            )
          )
          //TODO - add weapon data
          //TODO - add vent data
          //TODO - add stance data
        ),
	async execute(interaction) {
		if (interaction.options.getSubcommand() === 'set') {
      const paragon = await mongoDriver.getParagon(interaction.user.id);
      if(paragon.hasOwnProperty("error")){
        await interaction.reply(paragon.error);
      }

      const filter = { user: interaction.user.id };    
      var _emotion = interaction.options.getString('sacred_emotion');
      var _emotionalScale = interaction.options.getInteger('emotional_scale');
      var doc = {};
      
      if(_emotion != null){
        doc.sacredEmotion = _emotion;
      } else {
        doc.sacredEmotion = paragon.classFeatures.sacredEmotion;
      };

      if(_emotionalScale != null){
        if(_emotionalScale == 0){
          scale = paragon.classFeatures.emotionalScale + 1;
          if(scale > 6){
            await interaction.reply('Your Emotional Scale is already maxed out.');
            return;
          } else {
            doc.emotionalScale = scale;
          }
        } else {
          doc.emotionalScale = _emotionalScale;
        }
      } else {
        doc.emotionalScale = paragon.classFeatures.emotionalScale;
      }
        
      doc.arcaneWeapon = paragon.classFeatures.arcaneWeapon;
      doc.vent = paragon.classFeatures.vent;
      doc.stance = paragon.classFeatures.stance;
      
      const updateDoc = {
        $set: {
          classFeatures: doc
        }
      }

      var result = await mongoDriver.updateParagon(filter, updateDoc);
      if(result.hasOwnProperty('error')){
        await interaction.reply(error);
        return;
      }
      await interaction.reply('Modified Emotion Knight class features.');
    }   
	},
};