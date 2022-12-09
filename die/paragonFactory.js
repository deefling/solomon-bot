const { Paragon } = require("./paragon");
const { Dictator } = require('../die/dictator.js');
const { Fool } = require('../die/fool.js');
const { EmotionKnight } = require('../die/emotion_knight.js');
const { Neo } = require('../die/neo.js');
const { Godbinder } = require('../die/godbinder.js');
const { Master } = require('../die/master.js');

const paragonFactory = (doc) => {
    var paragon;
    switch(doc.paragonClass){ // needs expansion
        case 'DICTATOR':
            paragon = new Dictator(doc.str, doc.dex, doc.con, doc.int, doc.wis, doc.cha);
            paragon.setClass('DICTATOR');
            break;
        case 'FOOL':
            paragon = new Fool(doc.str, doc.dex, doc.con, doc.int, doc.wis, doc.cha);
            paragon.setClass('FOOL');
            break;
        case 'EMOTION_KNIGHT':
            paragon = new EmotionKnight(doc.str, doc.dex, doc.con, doc.int, doc.wis, doc.cha);
            paragon.setClass('EMOTION_KNIGHT');
            break;
        case 'NEO':
            paragon = new Neo(doc.str, doc.dex, doc.con, doc.int, doc.wis, doc.cha);
            paragon.setClass('NEO');
            break;
        case 'GODBINDER':
            paragon = new Godbinder(doc.str, doc.dex, doc.con, doc.int, doc.wis, doc.cha);
            paragon.setClass('GODBINDER');
            break;
        case 'MASTER':
            paragon = new Master(doc.str, doc.dex, doc.con, doc.int, doc.wis, doc.cha);
            paragon.setClass('MASTER');                
            break;
        default:
            paragon = new Paragon(2,2,3,3,2,2);
            break;
    }
    paragon.setUser(doc.user);

    if(doc.hasOwnProperty('name')){
        paragon.setName(doc.name);
    }
    if(doc.hasOwnProperty('equipment')){
        paragon.setEquipment(doc.equipment);
    }
    if(doc.hasOwnProperty('look')){
        paragon.setLook(doc.look);
    }
    if(doc.hasOwnProperty('classFeatures')){
        paragon.setClassFeatures(doc.classFeatures);
    }

    return paragon;
}

module.exports = paragonFactory;