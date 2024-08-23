import algosdk from 'algosdk';
import jwt from 'jsonwebtoken';
import nacl from 'tweetnacl'; // Ensure that you have tweetnacl installed

export const authenticateUser = async (req, res) => {
  const { walletAddress, signedTxn } = req.body;

  try {
    console.log("Decoding signed transaction...");
    const decodedSignedTxn = algosdk.decodeSignedTransaction(new Uint8Array(Object.values(signedTxn)));
    console.log("Decoded Transaction:", decodedSignedTxn);

    const { sig, txn } = decodedSignedTxn;
    if (!sig) {
      console.error("No signature found.");
      return res.status(401).json({ error: 'No signature found in transaction.' });
    }

    // Get the txn object
    const txnObj = txn.get_obj_for_encoding();
    if (!txnObj) {
      console.error("Failed to extract transaction object.");
      return res.status(401).json({ error: 'Invalid transaction object.' });
    }

    // Encode the transaction object as msgpack
    const txnBytes = algosdk.encodeObj(txnObj);

    // Create byte array with TX prefix
    const msgBytes = new Uint8Array(txnBytes.length + 2);
    msgBytes.set(Buffer.from('TX'));
    msgBytes.set(txnBytes, 2);
    console.log("Message Bytes for Verification:", msgBytes);

    // Extract the public key and signature
    const pkBytes = txn.from.publicKey;
    const sigBytes = new Uint8Array(sig);

    // Perform the verification
    const isValid = nacl.sign.detached.verify(msgBytes, sigBytes, pkBytes);
    console.log("Signature Verified:", isValid);

    if (!isValid) {
      return res.status(401).json({ error: 'Invalid transaction signature.' });
    }
    let token;
    if (walletAddress === process.env.ADMIN_WALLETS) {
    token = jwt.sign({ walletAddress, isAdmin: true }, process.env.JWT_SECRET);
    } else {
      token = jwt.sign({ walletAddress }, process.env.JWT_SECRET);
    }

    console.log("JWT Token Generated:", token);

    return res.json({ token });
  } catch (error) {
    console.error('Error during authentication:', error.message, error.stack);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};
