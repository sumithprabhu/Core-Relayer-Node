const { ethers } = require("ethers");
const constants = require("./constants");

module.exports = async function listenForEvents(chain, callback) {
  const rpcUrl = constants.rpcUrls[chain];
  const contractAddress = constants.contractAddresses[chain];
  const abi = constants.abi;

  // Connect to the blockchain
  const provider = new ethers.JsonRpcProvider(rpcUrl);

  // Create a contract instance
  const contract = new ethers.Contract(contractAddress, abi, provider);

  // Listen for the SwapInitiated event
  contract.on("SwapInitiated", async (...args) => {
    const event = args[args.length - 1]; // Get the event object
    console.log(`Event caught on ${chain}:`, event.args);
    

    // Callback with event data
    callback(event.args);
  });

  console.log(`Listening for SwapInitiated events on ${chain}`);
};
