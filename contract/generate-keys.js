const fs = require("fs");
const path = require("path");
const { Keys } = require("casper-js-sdk");

const edKeyPair = Keys.Ed25519.new();
const { publicKey } = edKeyPair;

const accountAddress = publicKey.toHex();
const publicKeyInPem = edKeyPair.exportPublicKeyInPem();
const privateKeyInPem = edKeyPair.exportPrivateKeyInPem();

const folder = path.join("./", "casper_keys");
if (!fs.existsSync(folder)) fs.mkdirSync(folder);

fs.writeFileSync(path.join(folder, "public_key.pem"), publicKeyInPem);
fs.writeFileSync(path.join(folder, "secret_key.pem"), privateKeyInPem);

console.log("Your public key (hex):");
console.log(accountAddress);
console.log("\nKeys saved in ./casper_keys/");