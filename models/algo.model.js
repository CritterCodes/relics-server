import db from '../lib/database.js';
import Constants from '../lib/constants.js';

export default class RelicM {
    static getRelicById = async (relicId) => {
        try {
            return await db.dbRelics().findOne({ _id: relicId }, { projection: Constants.DEFAULT_PROJECTION });
        } catch (err) {
            console.error(`Error getting relic from DB:`, err);
            return err;
        }
    };

    static updateRelicMintStatus = async (relicId, minted, txnId) => {
        try {
            const result = await db.dbRelics().updateOne({ _id: relicId }, { $set: { minted, txnId } });
            return result.matchedCount ? { minted, txnId } : null;
        } catch (err) {
            console.error(`Error updating relic mint status in DB:`, err);
            return err;
        }
    };

    // Other model methods remain unchanged
}
