const mongoDriver = require('../mongoDriver.js')

exports.Paragon = class {
    constructor(_str, _dex, _con, _int, _wis, _cha){
        this.str = _str;
        this.dex = _dex;
        this.con = _con;
        this.int = _int;
        this.wis = _wis;
        this.cha = _cha;
        this.paragonClass = '';
        this.user = '';
        this.classDice = 0;
        this.defence = 0;
        this.name='';
        this.equipment=''
        this.look=''
        this.classFeatures={};
    }

    setClass(_class){
        this.paragonClass = _class;
    }

    setClassFeatures(_features){
        this.classFeatures = _features
    }

    initClassFeatures(){

    } 

    setUser(_user){
        this.user = _user;
    }

    setDefence(_def){
        this.defence = _def;
    }

    setName(_name){
        this.name = _name
    }

    setEquipment(_eq){
        this.equipment = _eq;
    }

    setLook(_look){
        this.look = _look;
    }

    getGuard(){
        return this.dex;
    }

    getHealth(){
        return this.con;
    }

    getWillpower(){
        return this.int + this.wis
    }

    getDefence(){
        return this.defence;
    }

    toString(){
        var res = `>>> Name: ${this.name}\nParagon Class: ${this.paragonClass}\nClass Dice: d${this.classDice}\nEquipment: ${this.equipment}\nLook: ${this.look}`
        + `\n\n\`Strength:\` ${this.str}\n\`Dexterity:\` ${this.dex}\n\`Constitution:\` ${this.con}\n\`Intelligence:\` ${this.int}\n\`Wisdom:\` ${this.wis}\n\`Charisma:\` ${this.cha}`
        + `\n\n\`Guard:\` ${this.getGuard()}\n\`Health:\` ${this.getHealth()}\n\`Willpower:\` ${this.getWillpower()}\n\`Defence:\` ${this.getDefence()}`
        + `\n\nClass Features:`
        
        var features = Object.getOwnPropertyNames(this.classFeatures);

        features.forEach((feature) =>{
            res += `\n\t` + feature + ": " + this.classFeatures[feature];
        })

        return res;
    }

}