import db from '../lib/database.js'
import Constants from '../lib/constants.js';

export default class RelicM {

    static createRelic = async (relic) => {
        try {
            const result = await db.dbRelics().insertOne(relic);
            console.log(result);
            return result
        } catch(err) {
            console.error(`There was an error adding ${relic} to the DB:`, err);
            return err;
        }
    }

    static updateRelic = async (update) => {
        try {
            const relicID = update.relicID;
            const result = await db.dbRelics().replaceOne(
                { relicID },
                { $set: update}
            );
            console.log(result);
            return result;
        } catch (err) {
            console.error(`There was an error updating Relic ${relicID} in the DB:`, err);
            return err;
        }
    }

    static deleteRelic = async (relicID) => {
        try {
            const result = await db.dbRelics().deleteOne({ relicID });
            console.log(result);
            return result;
        } catch (err) {
            console.error(`There was an error deleting Relic ${relicID} from the DB:`, err);
            return err;
        }
    }

    static listRelics = async () => {
        try {
            return await db.dbRelics().find({}, { projection: Constants.DEFAULT_PROJECTION }).toArray();
        } catch (err) {
            console.error(`There was an error getting Relics from the DB:`, err);
            return err;
        }
    }

    static getRelic = async (relicID) => {
        try {
            return await db.dbRelics().findOne({relicID}, { projection: Constants.DEFAULT_PROJECTION });
        } catch (err) {
            console.error(`There was an error getting Relic ${relicID} from the DB:`, err);
            return err;            
        }
    }

    
}
