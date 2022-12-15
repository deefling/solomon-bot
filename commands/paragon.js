const { SlashCommandBuilder } = require('discord.js');
const mongoDriver = require('../mongoDriver.js');
const paragonFactory = require('../die/paragonFactory.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('paragon')
		.setDescription('Constructs a DIE paragon')
        .addStringOption(option =>
            option.setName('class')
            .setDescription('The DIE class of your character')
            .setRequired(true)
            .addChoices(
                { name: 'dictator', value: 'DICTATOR' },
                { name: 'fool', value: 'FOOL' },
                { name: 'emotion knight', value: 'EMOTION_KNIGHT' },
                { name: 'neo', value: 'NEO' },
                { name: 'godbinder', value: 'GODBINDER' },
                { name: 'master', value: 'MASTER' },
            ))
        .addIntegerOption( option => 
            option.setName('str')
            .setDescription('The STRENGTH score of your Paragon')
            .setRequired(true)
            .setMaxValue(4)
            .setMinValue(0)
        )
        .addIntegerOption( option => 
            option.setName('dex')
            .setDescription('The DEXTERITY score of your Paragon')
            .setRequired(true)
            .setMaxValue(4)
            .setMinValue(0)
        )
        .addIntegerOption( option => 
            option.setName('con')
            .setDescription('The CONSTITUTION score of your Paragon')
            .setRequired(true)
            .setMaxValue(4)
            .setMinValue(0)
        )
        .addIntegerOption( option => 
            option.setName('int')
            .setDescription('The INTELLIGENCE score of your Paragon')
            .setRequired(true)
            .setMaxValue(4)
            .setMinValue(0)
        )
        .addIntegerOption( option => 
            option.setName('wis')
            .setDescription('The WISDOM score of your Paragon')
            .setRequired(true)
            .setMaxValue(4)
            .setMinValue(0)
        )
        .addIntegerOption( option => 
            option.setName('cha')
            .setDescription('The CHARISMA score of your Paragon')
            .setRequired(true)
            .setMaxValue(4)
            .setMinValue(0)
        ),
	async execute(interaction) {
        var paragon;
        var _class = interaction.options.getString('class');
        var _user = interaction.user.id;
        var _str = interaction.options.getInteger('str');
        var _dex = interaction.options.getInteger('dex');
        var _con = interaction.options.getInteger('con');
        var _int = interaction.options.getInteger('int');
        var _wis = interaction.options.getInteger('wis');
        var _cha = interaction.options.getInteger('cha');
        //modify paragon stat func
        var doc = {
            paragonClass: _class,
            user: _user,
            str: _str,
            dex: _dex,
            con: _con,
            int: _int,
            wis: _wis,
            cha: _cha
        }
        
        var paragon = paragonFactory(doc);
        
        var userParagon = await mongoDriver.getParagon(_user);
        if(userParagon != null && !userParagon.hasOwnProperty('error')){
            await interaction.reply("You already have a Paragon");
            return;
        }

        var result = await mongoDriver.insertParagon(paragon);
        //catch error?
        paragon.initClassFeatures();
		await interaction.reply(result);
	},
};