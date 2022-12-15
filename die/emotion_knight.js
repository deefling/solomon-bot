const { Paragon } = require("./paragon");
const mongoDriver = require('../mongoDriver.js');



exports.EmotionKnight = class extends Paragon{
    static emotions = ["Ecstacy", "Admiration", "Terror", "Amazement", "Grief", "Loathing", "Rage", "Vigilance"]
    static weaponTraits = [
        {  
            trait: 'Brutal',
            ability: "**Special:** if this hit Wounds, it deals two Wounds instead."
        },
        {  
            trait: 'Fast',
            ability: "**Special:** if this hit removes a Guard from your opponent, remove two Guard instead of one."
        },
        {  
            trait: 'Elegant',
            ability: "Uses Dexterity instead of Strength for its dice pool. **Special:** recover two Guard."
        }
    ];
    static vents = [
        {
            vent: "Decapitation Strike",
            ability: "Target and attack a single individual and ignore Guard."
        },
        {
            vent: "Combat Frenzy",
            ability: "Apply the results of this attack to all enemies within melee range of the knight’s position."
        },
        {
            vent: "Duel",
            ability: "Target a single individual. They cannot attack anyone else until you say so, or until you’re no longer a combatant."
        },
        {
            vent: "Personal Attacks",
            ability: "Discover how your Sacred Emotion could be used to hurt the target—whatever that means."
        },
        {
            vent: "Personal Knowledge",
            ability: "Gain knowledge of who or what a target feels your emotion most strongly towards. For example, a Terror Knight could vent to discover a target’s worst fear."
        },
        {
            vent: "Distance Strike",
            ability: "You can attack anything, at any distance, as long as you know exactly where they are."
        },
        {
            vent: "Emotional Reserve",
            ability: "When hit, an Emotion Knight may reduce their Emotion Level instead of losing Health on a 1-for-1 basis."
        },
        {
            vent: "Hardcase",
            ability: "Vent to make anyone human-sized think that if you fought, you would win."
        }
    ]
    static stances = {
        combat: [
            {
                stance: "Bodygurard",
                ability: "Choose someone within arm’s reach. If they are attacked, you can choose to be attacked instead."
            },
            {
                stance: "Ranged Attack",
                ability: "You can attack with your Arcane Weapon at a medium range."
            },
            {
                stance: "Riposte",
                ability: "When an opponent’s attack fails to hit you, make an immediate attack in response as an extra action."
            },
            {
                stance: "Parry",
                ability: "All attacks on attacks on you suffer one disadvantage."
            },
            {
                stance: "Quick on the Draw",
                ability: " If someone attacks you before your turn in the initiative order, give up your move action to attack them before they attack you."
            },
            {
                stance: "I’ll Die When I’m Dead",
                ability: "You can act normally when you’ve taken so much damage that you should be unconscious. You continue to fight until you literally die."
            },
            {
                stance: "Slashing Blade",
                ability: "You can split your successes in an attack between multiple targets without suffering a disadvantage to do so."
            },
            {
                stance: "Pacifier",
                ability: "You can attack and inflict non-fatal injuries without suffering a disadvantage."
            },
            {
                stance: "Show-Off",
                ability: "Your fighting style is undeniably more beautiful than anyone else’s. Your attacks have the **Special:** choose an opponent to be startled by your grace. The next attack on them gains an advantage."
            },
        ],
        social: [
            {
                stance: "",
                ability: ""
            },
        ],
        emotional: []
    }

    

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