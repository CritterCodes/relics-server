import algosdk from "algosdk";
import algodClient from "../lib/algoClient.js";
import RelicM from "../models/relic.model.js";

// Helper function to wait for transaction confirmation
async function waitForConfirmation(txId) {
    const status = await algodClient.status().do();
    let lastRound = status['last-round'];
    while (true) {
        const pendingInfo = await algodClient.pendingTransactionInformation(txId).do();
        if (pendingInfo['confirmed-round'] !== null && pendingInfo['confirmed-round'] > 0) {
            console.log(`Transaction confirmed in round ${pendingInfo['confirmed-round']}.`);
            return pendingInfo['confirmed-round'];
        }
        lastRound++;
        await algodClient.statusAfterBlock(lastRound).do();
    }
}

export default class AlgoCoor {
    static async mintNFT(relicId, signedTxn) {
        try {
            // Fetch the relic from the database
            const relic = await RelicM.getRelicById(relicId);

            if (!relic) {
                throw new Error('Relic not found');
            }

            // Convert the signed transaction back to Uint8Array
            const signedTxnArray = new Uint8Array(Object.values(signedTxn));

            // Send the transaction to the network
            const txResponse = await algodClient.sendRawTransaction(signedTxnArray).do();

            // Wait for confirmation
            const confirmedRound = await waitForConfirmation(txResponse.txId);

            // Update relic status in the database to mark as minted
            await RelicM.updateRelicMintStatus(relicId, true, txResponse.txId);

            return { txId: txResponse.txId, confirmedRound };
        } catch (err) {
            console.error('Error minting NFT:', err);
            return { error: 'Failed to mint NFT', details: err };
        }
    }

    static createWallet = async () => {
        try {
            // Generate new Algorand account
            const account = algosdk.generateAccount();
            const mnemonic = algosdk.secretKeyToMnemonic(account.sk);
            const response = {
                address: account.addr,
                mnemonic
            };
            console.log(`Algo Address: ${account.addr}\nMnemonic: ${mnemonic}`);
            return response;
        } catch (err) {
            console.error('There was an error creating the wallet:', err);
            return { error: 'Failed to create wallet', details: err };
        }
    };

    static getBalance = async (addr) => {
        try {
            const info = await algodClient.accountInformation(addr).do();
            return info.amount;
        } catch (err) {
            console.error('There was an error retrieving your balance:', err);
            return { error: 'Failed to retrieve balance', details: err };
        }
    };

    static sendAlgo = async (signedTxn) => {
        try {
            // Convert the signed transaction back to Uint8Array
            const signedTxnArray = new Uint8Array(Object.values(signedTxn));
    
            // Send the transaction
            const txResponse = await algodClient.sendRawTransaction(signedTxnArray).do();
            console.log(`Transaction sent with ID: ${txResponse.txId}`);
    
            // Wait for confirmation
            const confirmedRound = await waitForConfirmation(txResponse.txId);
            console.log('Transaction confirmed in round:', confirmedRound);
    
            return { txId: txResponse.txId, confirmedRound };
        } catch (err) {
            console.error('Error sending transaction:', err);
            return { error: 'Failed to send transaction', details: err };
        }
    }
    
    static getNFTs = async (addr) => {
        try {
            if (!algosdk.isValidAddress(addr)) {
                throw new Error('Invalid Algorand address');
            }
            
            // Fetch account information from the Algorand blockchain
            const accountInfo = await algodClient.accountInformation(addr).do();
    
            // Filter out assets that are NFTs (ASAs with amount of 1)
            const nfts = accountInfo.assets.filter(asset => asset.amount === 1);
            
            // Map the NFTs to include additional details if necessary
            const nftDetails = await Promise.all(
                nfts.map(async (nft) => {
                    const assetInfo = await algodClient.getAssetByID(nft['asset-id']).do();
                    return {
                        assetId: nft['asset-id'],
                        name: assetInfo.params.name,
                        unitName: assetInfo.params['unit-name'],
                        url: assetInfo.params.url,
                    };
                })
            );
    
            return { nfts: nftDetails };
        } catch (err) {
            console.error('Error fetching NFTs:', err);
            return { error: 'Failed to fetch NFTs', details: err };
        }
    }
}
