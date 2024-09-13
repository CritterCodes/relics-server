import SubsModel from '../models/subs.model.js';
import Sub from '../class/sub.class.js';

export default class SubsCoordinator {

    static addSub = async (sub) => {
        try {
            const newSub = new Sub(sub.email);
            return await SubsModel.addSub(sub);
        } catch (error) {
            throw new Error(`Error adding sub. Error: ${error}`);
        };
    };

    static getSubs = async () => {
        try {
            return await SubsModel.getSubs();
        } catch (error) {
            throw new Error(`Error getting subs. Error: ${error}`);
        };
    };

    static getSub = async (subID) => {
        try {
            return await SubsModel.getSub(subID);
        } catch (error) {
            throw new Error(`Error getting sub. Error: ${error}`);
        };
    };

    static deleteSub = async (subID) => {
        try {
            return await SubsModel.deleteSub(subID);
        } catch (error) {
            throw new Error(`Error deleting sub. Error: ${error}`);
        };
    };
}