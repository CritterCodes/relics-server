import CollectorCoor from '../coordinators/collectors.coordinator.js';

export const createCollector = async (req, res, next) => {
    try {
      console.log(req.body.address);
        const result = await CollectorCoor.createCollector(req.body);
        return result ? res.status(200).json(result) : res.status(404).json();
    } catch (error) {
        next(error);
    }
};

export const updateCollector = async (req, res, next) => {
    try {
        const result = await CollectorCoor.updateCollector(req.params.address, req.body);
        return result ? res.status(200).json(result) : res.status(404).json();
    } catch (error) {
        next(error);
    }
};

export const deleteCollector = async (req, res, next) => {
    try {
        const result = await CollectorCoor.deleteCollector(req.params.address);
        return result ? res.status(200).json(result) : res.status(404).json();
    } catch (error) {
        next(error);
    }
};

export const listCollectors = async (req, res, next) => {
    try {
        const result = await CollectorCoor.listCollectors();
        return result ? res.status(200).json(result) : res.status(404).json();
    } catch (error) {
        next(error);
    }
};

export const getCollector = async (req, res, next) => {
    try {
        const result = await CollectorCoor.getCollector(req.params.address);
        return result ? res.status(200).json(result) : res.status(404).json();
    } catch (error) {
        next(error);
    }
};

export const getCollectorByUsername = async (req, res, next) => {
    try {
        const result = await CollectorCoor.getCollectorByUsername(req.params.username);
        return result ? res.status(200).json(result) : res.status(404).json();
    } catch (error) {
        next(error);
    }
};
