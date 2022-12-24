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
                stance: "Bodyguard",
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
                stance: "Intimidating Gaze",
                ability: "You can be a scary fucker. You radiate murderous contempt. If there’s a question of “who’s the most murderous person in the room?” The answer is “You.”"
            },
            {
                stance: "Common Touch",
                ability: "The “Common Folk” of the kingdom automatically think you’re one of them. What does “Common Folk” mean? You tell us."
            },
            {
                stance: "The Look Of Eagles",
                ability: "If someone is looking for a leader, they look to you. Everyone will assume you’re in charge due to your natural authority."
            },
            {
                stance: "Who The Hell Are They",
                ability: "In any room, you instantly attract everyone’s attention."
            },
            {
                stance: "Infectious Charm",
                ability: "In any room, you instantly attract everyone’s attention."
            },
        ],
        emotional: {
            ecstacy: [ 
                {
                    stance: "Painfree",
                    ability: "You no longer suffer any physical pain."
                },
                {
                    stance: "Life and Soul of the Party",
                    ability: "Your infectious enthusiasm makes others want to spend time with you."
                }
            ],
            admiration: [ 
                {
                    stance: "Hero-Worship",
                    ability: "Choose one person to idealise. When supporting them in an action, you give two advantages instead of one."
                },
                {
                    stance: "Trusting Face",
                    ability: "You radiate such simple good-heartedness that people will give you the benefit of the doubt unless there’s a strong reason to do otherwise."
                }
            ],
            terror: [ 
                {
                    stance: "Flight",
                    ability: "When fleeing, you’ll always escape any pursuer who doesn’t have some supernatural ability to hunt you down."
                },
                {
                    stance: "Reading the Danger Room",
                    ability: "When in this stance, at any time, you can ask the GM “What should I be most frightened of here?” and they must answer honestly."
                }
            ],
            amazement: [ 
                {
                    stance: "Eeek!",
                    ability: "When surprised, you jump out of your skin. You instantly teleport a short distance."
                },
                {
                    stance: "Innocent",
                    ability: "People cannot read you in any way other than a wide-eyed adorable innocent."
                }
            ],
            grief: [ 
                {
                    stance: "Catharsis",
                    ability: "When Emotion Draining (page 64), you also heal 1 Wound from your target for each level of emotion drained."
                },
                {
                    stance: "Pity Me",
                    ability: "People pity you as they would a whimpering puppy."
                }
            ],
            loathing: [ 
                {
                    stance: "Can't Stand Me Now",
                    ability: "Everybody who can see you finds you loathsome; they behave appropriately. Their attacks against you have one disadvantage"
                },
                {
                    stance: "My Mind is a Fortress",
                    ability: "You are so wrapped up in hatred (of self and others) the difficulty of any emotional manipulation is increased by 2."
                }
            ],
            rage: [ 
                {
                    stance: "Warface",
                    ability: "Anyone foolish enough to meet your gaze regrets it. All your attacks gain Special: they metaphorically shit themselves and lose 1 Guard."
                },
                {
                    stance: "Berserk",
                    ability: "As long as you are in this stance, your Health is increased by your Wisdom."
                }
            ],
            vigilance: [ 
                {
                    stance: "You Watch the Watchmen",
                    ability: "You know any time you’ve been spotted or are about to be ambushed."
                },
                {
                    stance: "Guardian",
                    ability: "You can declare one person under your protection. You know whenever they are threatened, and gain an advantage when acting on it."
                }
            ]
        }
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