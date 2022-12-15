const { SlashCommandBuilder } = require('discord.js');
const mongoDriver = require('../mongoDriver.js');
const { EmotionKnight } = require('../die/emotion_knight.js');

const emotions = [];
const vents = []
const combatStances = [];

EmotionKnight.emotions.forEach(e => {
  emotions.push({ name: e, value: e });
})

EmotionKnight.vents.forEach(v => {
  vents.push({ name: v.vent, value: v.vent });
})

EmotionKnight.stances.combat.forEach(s => {
  combatStances.push({ name: s.stance, value: s.stance });
})

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ek')
		.setDescription('Set of commands for Emotion Knights')
    .addSubcommand(subcommand => 
      subcommand.setName('help')
      .setDescription('More info about the ek command')
    )
    .addSubcommand(subcommand => 
      subcommand.setName('set')
      .setDescription('Set various class features')
      .addStringOption(option => 
        option.setName('sacred_emotion')
        .setDescription('Set your Sacred Emotion')
        .addChoices(...emotions)
      )
      .addIntegerOption( option => 
        option.setName('emotional_scale')
        .setDescription('The Emotional Scale score of your Paragon')
        .setMinValue(0)
        .setMaxValue(8)
      )
      //TODO - add weapon data
      .addStringOption(option => 
        option.setName('vent')
        .setDescription('Set the Venting Ability of your Paragon')
        .addChoices(...vents)
      )
      .addStringOption(option => 
        option.setName('stance')
        .setDescription('Set the Stance of your Paragon')
        // TODO - look into subcommand groups / attatchments
        // TODO - combat, social, emotional vents
        // TODO - add stance data
      )
    )
    .addSubcommand(subcommand =>
      subcommand.setName('scale_inc')
      .setDescription('Increment Emotional Scale')
    )
    .addSubcommand(subcommand =>
      subcommand.setName('show')
      .setDescription('Show information about various Emotion Knight features')
        // .addSubcommand(subcommand => 
        // subcommand.setName('vents')
        //   .setDescription('See all vent abilities')
        // )
      ),
	async execute(interaction) {
    const paragon = await mongoDriver.getParagon(interaction.user.id);
    // HELP subcommand
    if (interaction.options.getSubcommand() === 'set') {
      if(paragon.hasOwnProperty("error")){
        await interaction.reply(paragon.error);
      }

      //TODO - bot embed?
      var helpStr = 'Here is a list of ek commands'
        + '\nset'
      await interaction.reply();
    }


    //SET subcommand
		if (interaction.options.getSubcommand() === 'set') {
      if(paragon.hasOwnProperty("error")){
        await interaction.reply(paragon.error);
      }

      const filter = { user: interaction.user.id };    
      var _emotion = interaction.options.getString('sacred_emotion');
      var _emotionalScale = interaction.options.getInteger('emotional_scale');
      var _vent = interaction.options.getString('vent');
      var doc = {};
      
      if(_emotion != null){
        doc.sacredEmotion = _emotion;
      } else {
        doc.sacredEmotion = paragon.classFeatures.sacredEmotion;
      };

      if(_emotionalScale != null){
        doc.emotionalScale = _emotionalScale;
      } else {
        doc.emotionalScale = paragon.classFeatures.emotionalScale;
      }

      if(_vent != null){
        doc.vent = _vent;
      } else {
        doc.vent = paragon.classFeatures.vent;
      }

      doc.arcaneWeapon = paragon.classFeatures.arcaneWeapon;
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


    // SCALE_INC subcommand
    if (interaction.options.getSubcommand() === 'scale_inc') {
      scale = paragon.classFeatures.emotionalScale + 1;
      const filter = { user: interaction.user.id };    
      const doc ={};
      if(scale > 6){
        await interaction.reply('Your Emotional Scale is already maxed out.');
        return;
      } else {
        doc.sacredEmotion = paragon.classFeatures.sacredEmotion;
        doc.emotionalScale = scale;
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
        await interaction.reply('Incremented Emotional Scale by 1');
      }
    }
	},
};