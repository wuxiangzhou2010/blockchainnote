// require('./contracts/inbox.sol')
const path = require("path");
const fs = require("fs");
const solc = require("solc");

const inboxPath = path.resolve(__dirname, "contracts", "inbox.sol");
const source = fs.readFileSync(inboxPath, "utf8");

const result = solc.compile(source, 1);
// console.log(result);
module.exports = result.contracts[":Inbox"];

/* contracts:inbox:bytecode, interface(ABI)*/
