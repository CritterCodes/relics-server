// Filename: algorandClient.js

import algosdk from 'algosdk';

// AlgoNode's Testnet Algod API endpoint
const algodToken = ''; // No token required
const algodServer = 'https://testnet-api.algonode.cloud';
const algodPort = '';  // Port is empty for HTTPS

// Instantiate the Algod client
const algod = new algosdk.Algodv2(algodToken, algodServer, algodPort);

export default algod;
