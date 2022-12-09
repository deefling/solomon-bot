const { Paragon } = require("./paragon");
const mongoDriver = require('../mongoDriver.js');



exports.EmotionKnight = class extends Paragon{
    static emotions = ["Ecstacy", "Admiration", "Terror", "Amazement", "Grief", "Loathing", "Rage", "Vigilance"]
    static weaponTraits = [
        {  
            trait: 'Brutal',
            ability: "Special: if this hit Wounds, it deals two Wounds instead."
        },
        {  
            trait: 'Fast',
            ability: "Special: if this hit removes a Guard from your opponent, remove two Guard instead of one."
        },
        {  
            trait: 'Elegant',
            ability: "Uses Dexterity instead of Strength for its dice pool. Special: recover two Guard."
        }
    ];

    constructor(_str, _dex, _con, _int, _wis, _cha){
        super(_str, _dex, _con, _int, _wis, _cha);
        this.classDice = 8;
        this.defence = 1;
    }

    async initClassFeatures(){
        var _features = {
            sacredEmotion: "",
            arcaneWeapon: {},
            emotionalScale: 0,
            vent: "",
            stance: ""
        };

        const filter = { user: this.user };
        const updateDoc = {
            $set: {
              classFeatures: _features
            },
          };
        var result = await mongoDriver.updateParagon(filter, updateDoc);
    }
}