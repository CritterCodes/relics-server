
import RelicM from "../models/relic.model.js";
import Relic from '../class/relic.class.js';

export default class RelicCoor {
    static createRelic = async (relic) => {
        try {
            const newRelic = new Relic(relic);
            console.log(newRelic);
            return await RelicM.createRelic(newRelic);
        } catch (err) {
            console.error(`There was an error building the relic for the model:`, err);
            return err;
        };
    };

    static updateRelic = async (relicID, update) => {
        try {
            // Fetch the existing relic from the database
            const relicData = await RelicM.getRelic(relicID);

            if (!relicData) {
                throw new Error(`Relic with ID ${relicID} not found.`);
            }

            // Create a Relic instance from the existing data
            const relic = new Relic(relicData);

            // Apply the update
            relic.updateRelic(update);

            // Save the updated relic back to the database
            return await RelicM.updateRelic(relicID, relic);
        } catch (err) {
            console.error(`There was an error updating Relic ${relicID}:`, err);
            return err;
        }
    };

    static deleteRelic = async (relicID) => await RelicM.deleteRelic(relicID);

    static listRelics = async () => await RelicM.listRelics();

    static getRelic = async (relicID) => await RelicM.getRelic(relicID);
}