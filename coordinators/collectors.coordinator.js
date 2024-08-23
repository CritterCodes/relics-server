import CollectorM from "../models/collectors.model.js";
import Collector from '../class/collector.class.js';

export default class CollectorCoor {
    static createCollector = async (collectorData) => {
        try {
            const newCollector = new Collector(collectorData.address, collectorData.picture, collectorData.bio, collectorData.websites, collectorData.socials);
            console.log(newCollector.address);
            return await CollectorM.createCollector(newCollector);
        } catch (err) {
            console.error(`Error creating collector:`, err);
            return err;
        };
    };

    static updateCollector = async (address, update) => {
        try {
            const collectorData = await CollectorM.getCollector(address);
            if (!collectorData) throw new Error(`Collector with wallet ${address} not found.`);
            const collector = new Collector(collectorData.address, collectorData.username, collectorData.picture, collectorData.bio, collectorData.websites, collectorData.socials);
            collector.updateCollector(update);
            return await CollectorM.updateCollector(address, collector);
        } catch (err) {
            console.error(`Error updating collector:`, err);
            return err;
        }
    };

    static deleteCollector = async (address) => {
        try {
            return await CollectorM.deleteCollector(address);
        } catch (err) {
            console.error(`Error deleting collector:`, err);
            return err;
        }
    };

    static listCollectors = async () => {
        try {
            return await CollectorM.listCollectors();
        } catch (err) {
            console.error(`Error listing collectors:`, err);
            return err;
        }
    };

    static getCollector = async (address) => {
        try {
            return await CollectorM.getCollector(address);
        } catch (err) {
            console.error(`Error getting collector:`, err);
            return err;
        }
    };

    static getCollectorByUsername = async (username) => {
        try {
            return await CollectorM.getCollectorByUsername(username);
        } catch (err) {
            console.error(`Error getting collector:`, err);
            return err;
        }
    };
}
