const chains = {
    ethereum: {
      rpcUrl: process.env.ETH_RPC_URL,
      chainId: 1,
    },
    arbitrum: {
      rpcUrl: process.env.ARB_RPC_URL,
      chainId: 42161,
    },
    bnb: {
      rpcUrl: process.env.BNB_RPC_URL,
      chainId: 56,
    },
    edu: {
      rpcUrl: process.env.EDU_RPC_URL,
      chainId: 1337,
    },
  };
  
  export default chains;
  