const { ethers } = require("ethers");
const constants = require("./constants");

module.exports = async function callContractFunction(chain, method, args) {
  const rpcUrl = constants.rpcUrls[chain];
  const privateKey = constants.privateKeys[chain];
  const contractAddress = constants.contractAddresses[chain];
  const abi = constants.abi;

  // Connect to the blockchain
  const provider = new ethers.JsonRpcProvider(rpcUrl);

  // Create a wallet instance
  const wallet = new ethers.Wallet(privateKey, provider);

  // Create a contract instance
  const contract = new ethers.Contract(contractAddress, abi, wallet);

  // Estimate gas
  const gasLimit = await contract.estimateGas[method](...args, {
    from: wallet.address,
  });

  // Call the contract method
  const tx = await contract[method](...args, { gasLimit });

  // Wait for the transaction to be mined
  const receipt = await tx.wait();

  console.log(`Transaction successful on ${chain}:`, receipt);
  return receipt;
};
