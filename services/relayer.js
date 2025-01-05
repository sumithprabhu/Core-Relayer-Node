const listenForEvents = require("../utils/listenEvents");
const callContractFunction = require("../utils/callContract");

module.exports.handleRelayerRequest = async (req, res) => {
  const { srcChain, destChain, token, amount, userAddress } = req.body;

  if (!srcChain || !destChain || !token || !amount || !userAddress) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    console.log(`Listening for events on ${srcChain}...`);
    await listenForEvents(srcChain, async (eventData) => {
      console.log("Event data:", eventData);
      if (
        eventData.token === token &&
        eventData.amount === amount &&
        eventData.user === userAddress
      ) {
        console.log(`Verified event on ${srcChain}. Triggering ${destChain}...`);

        const receipt = await callContractFunction(destChain, "receiveSwap", [
          eventData.token,
          eventData.amount,
          eventData.user,
        ]);

        res.status(200).json({
          message: "Transaction relayed successfully",
          transactionHash: receipt.transactionHash,
        });
      }
    });
  } catch (error) {
    console.error("Error handling relayer request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
