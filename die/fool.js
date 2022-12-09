const { Paragon } = require("./paragon");

exports.Fool = class extends Paragon{
    constructor(_str, _dex, _con, _int, _wis, _cha){
        super(_str, _dex, _con, _int, _wis, _cha);
        this.classDice = 6;
    }
}