import RelicCoor from "../coordinators/relic.coordinator.js";

export const createRelic = async (req, res, next) => {
    try {
        console.log(req.body);
        const result = await RelicCoor.createRelic(req.body);
        
        if (result) {
            return res.status(200).json(result);
        } else {

            return res.status(404).json();
        }
    } catch (error) {
        next(error);
    };
}

export const updateRelic = async (req, res, next) => {
    try {
        const result = await RelicCoor.updateRelic(req.params.relicID, req.body);
        
        if (result) {
            return res.status(200).json(result);
        } else {
            return res.status(404).json();
        };
    } catch (error) {
        next(error);
    };
}

export const deleteRelic = async (req, res, next) => {
    try {
        const result = await RelicCoor.deleteRelic(req.params.relicID);
        
        if (result) {
            return res.status(200).json(result);
        } else {
            return res.status(404).json();
        };
    } catch (error) {
        next(error);
    };
}

export const listRelics = async (req, res, next) => {
    try {
        const result = await RelicCoor.listRelics();
        
        if (result) {
            return res.status(200).json(result);
        } else {
            return res.status(404).json();
        };
    } catch (error) {
        next(error);
    };
}

export const getRelic = async (req, res, next) => {
    try {
        const result = await RelicCoor.getRelic(req.params.relicID);
        
        if (result) {
            return res.status(200).json(result);
        } else {
            return res.status(404).json();
        };
    } catch (error) {
        next(error);
    };
}