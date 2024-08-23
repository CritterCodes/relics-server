import db from '../lib/database.js';
import Constants from '../lib/constants.js';

export default class CollectorM {
    static createCollector = async (collector) => {
        try {
            const result = await db.dbCollectors().insertOne(collector);
            return result;  // Return the created document
        } catch (err) {
            console.error(`Error adding collector to DB:`, err);
            return err;
        }
    };

    static updateCollector = async (address, update) => {
        try {
            const result = await db.dbCollectors().updateOne({ address }, { $set: update });
            return result.matchedCount ? update : null;  // Return the updated document or null
        } catch (err) {
            console.error(`Error updating collector in DB:`, err);
            return err;
        }
    };

    static deleteCollector = async (address) => {
        try {
            const result = await db.dbCollectors().deleteOne({ address });
            return result.deletedCount ? address : null;  // Return the deleted ID or null
        } catch (err) {
            console.error(`Error deleting collector from DB:`, err);
            return err;
        }
    };

    static listCollectors = async () => {
        try {
            return await db.dbCollectors().find({}, { projection: Constants.DEFAULT_PROJECTION }).toArray();
        } catch (err) {
            console.error(`Error listing collectors from DB:`, err);
            return err;
        }
    };

    static getCollector = async (address) => {
        try {
            return await db.dbCollectors().findOne({ address }, { projection: Constants.DEFAULT_PROJECTION });
        } catch (err) {
            console.error(`Error getting collector from DB:`, err);
            return err;
        }
    };

    static getCollectorByUsername = async (username) => {
        try {
            return await db.dbCollectors().findOne({ username }, { projection: Constants.DEFAULT_PROJECTION });
        } catch (err) {
            console.error(`Error getting collector from DB:`, err);
            return err;
        }
    };
}
