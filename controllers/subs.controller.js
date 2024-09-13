import SubsCoordinator from '../coordinators/subs.coordinator.js';

export default class SubsController {
    static addSub = async (req, res) => {
        try {
            const result = await SubsCoordinator.addSub(req.body);
            if (result) {
                res.status(201).send('Sub added');
            } else {
                res.status(400).send('Error adding sub');
            };
        } catch (error) {
            res.status(400).send(`Error adding sub. Error: ${error}`);
        };
    };

    static getSubs = async (req, res) => {
        try {
            const subs = await SubsCoordinator.getSubs();
            res.status(200).send(subs);
        } catch (error) {
            res.status(400).send(`Error getting subs. Error: ${error}`);
        };
    };

    static getSub = async (req, res) => {
        try {
            const sub = await SubsCoordinator.getSub(req.params.subID);
            res.status(200).send(sub);
        } catch (error) {
            res.status(400).send(`Error getting sub. Error: ${error}`);
        };
    };

    static deleteSub = async (req, res) => {
        try {
            const result = await SubsCoordinator.deleteSub(req.params.subID);
            if (result) {
                res.status(200).send('Sub deleted');
            } else {
                res.status(400).send('Error deleting sub');
            };
        } catch (error) {
            res.status(400).send(`Error deleting sub. Error: ${error}`);
        };
    };
};