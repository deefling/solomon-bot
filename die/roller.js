const coreMechanic = (stat, classDice = 0, adv = 0, dis = 0) => {
    var rolls = stat + adv - dis;
    var succ = 0;
    var sp = 0;
    var cdr = 0;
    var rollStr = ""

    for(let i = 0; i < rolls; i++){
        let roll = Math.ceil(Math.random() * 6);
        rollStr += roll + ", "
        if(roll >= 4){
            succ++;
        }
        if(roll === 6){
            sp++;
        }
    }
    
    if(classDice > 0){
        cdr = Math.ceil(Math.random() * classDice);
        rollStr+= "Class Dice: " + cdr;
        if(cdr >= 4){
            succ++;
        }
        if(cdr >= 6){
            sp++;
        }
    }

    var doc = {
        rolls: rollStr,
        successes: succ,
        classDiceResult: cdr,
        specials: sp
    }
    console.log(doc);
    return doc;
}

module.exports = coreMechanic;