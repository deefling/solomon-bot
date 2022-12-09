const { MongoClient } = require('mongodb');
const paragonFactory = require('./die/paragonFactory');
require('dotenv/config');

const uri = process.env.MONGO_CONNECTION_STRING;
const client = new MongoClient(uri);

exports.updateParagon = async function(filter, updateDoc){
    try{
        await client.connect();
        var db = client.db("paragons");
        var collection = db.collection("paragon")

        var result = await collection.updateOne(filter, updateDoc);

        // console.log(result)
        if(result.matchedCount == 0){
            return {error: 'You have no Paragons to update.'};
        }
        return "success";
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

exports.deleteParagon = async function(_user){
    try{
        await client.connect();
        var db = client.db("paragons");
        var collection = db.collection("paragon")
        const query = { user: _user };

        var result = await collection.deleteOne(query);

        if(result.deletedCount == 1){
            return 'Your Paragon has been deleted.';
        } else if (result.deletedCount == 0){
            return {error: 'You have no Paragons to delete.'};
        }
        else {
            return {error: "error connecting to DB"}
        }
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

exports.getParagon = async function(_user){
    try{
        await client.connect();
        var db = client.db("paragons");
        var collection = db.collection("paragon")
        const query = { user: _user };

        var result = await collection.findOne(query);

        if(result != null){
            var paragon = paragonFactory(result);
            return paragon;
        } else {
            return {error: "Could not find Paragon."}
        }
    } catch (e) {
        console.error(e);
    } finally {
        if(client != null){
        await client.close();
        }
    }
}

//                                          ,----.
//                                         / /¯¯\ \
//    .-----.                            _丄丄__丄丄_
//  /  ,---.  \  ___________________    |    ___    |
// |  |     |  ||_________   __   __|   |   (   )   |
//  \  `---'  /           | |  |_|      |    | |    |
//   `-------'            '-'           |    |_|    |
//                                      |___________| 

exports.insertParagon = async function(paragon){
    try{
        await client.connect();

        var doc = {
            user:paragon.user,
            paragonClass: paragon.paragonClass,
            str: paragon.str,
            dex: paragon.dex,
            con: paragon.con,
            int: paragon.int,
            wis: paragon.wis,
            cha: paragon.cha
        }

        var db = client.db("paragons");
        var result = await db.collection("paragon").insertOne(doc);
        if(result != null){
            return "Your Paragon has been created.";
        } else {
            return "error connecting to DB"
        }
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}