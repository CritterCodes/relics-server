import db from '../lib/database.js';

export default class SubsModel {
    static addSub = async (sub) => {
        try {
            const result = await db.dbSubs().insertOne(sub);
            if (result.insertedCount === 1) {
                return true;
            };
        } catch (error) {
            new Error(`Error adding sub. Error: ${error}`);
        };
    };

    static getSubs = async () => {
        try {
            const subs = await db.dbSubs().find().toArray();
            return subs;
        } catch (error) {
            new Error(`Error getting subs. Error: ${error}`);
        };
    };

    static getSub = async (subID) => {
        try {
            const sub = await db.dbSubs().findOne({ subID });
            return sub;
        } catch (error) {
            new Error(`Error getting sub. Error: ${error}`);
        };
    };

    static deleteSub = async (subID) => {
        try {
            const result = await db.dbSubs().deleteOne({ subID });
            if (result.deletedCount === 1) {
                return true;
            };
        } catch (error) {
            new Error(`Error deleting sub. Error: ${error}`);
        };
    };
};