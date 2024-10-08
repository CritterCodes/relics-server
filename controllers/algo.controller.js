import AlgoCoor from "../coordinators/algo.coordinator.js";

export const createWallet = async (req, res, next) => {
    try {
        const result = await AlgoCoor.createWallet();

        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json();
        };
    } catch (err) {
        next(err);
    }
}

export const sendAlgo = async (req, res, next) => {
    try {
        const { signedTxn } = req.body; // Expect signedTxn directly from the request body
        console.log('Received signed transaction:', signedTxn);

        const result = await AlgoCoor.sendAlgo(signedTxn);

        if (result && !result.error) {
            res.status(200).json(result);
        } else {
            res.status(400).json(result);
        }
    } catch (err) {
        next(err);
    }
}

export const getNFTs = async (req, res, next) => {
    try {
        const result = await AlgoCoor.getNFTs(req.params.address);

        if (result && !result.error) {
            res.status(200).json(result);
        } else {
            res.status(400).json(result);
        }
    } catch (err) {
        next(err);
    }
}

export const mintNFT = async (req, res, next) => {
    try {
        const { relicId } = req.params;

        const result = await AlgoCoor.mintNFT(relicId);

        if (result && !result.error) {
            res.status(200).json(result);
        } else {
            res.status(400).json(result);
        }
    } catch (err) {
        next(err);
    }
};

export const getBalance = async (req, res, next) => {
    try {
        const balance = await AlgoCoor.getBalance(req.query.address);

        if (balance) {
            res.status(200).json({ balance });
        } else {
            res.status(404).json({ error: 'Address not found' });
        }
    } catch (err) {
        next(err);
    }
};