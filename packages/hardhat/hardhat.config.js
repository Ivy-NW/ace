require("@nomicfoundation/hardhat-ignition/modules");
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env" });

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337, // Hardhat's default chain ID
    },
    hardhat: {
      allowUnlimitedContractSize: false,
    },
    sepolia: {
      url: process.env.ALCHEMY_API_KEY_SEPOLIA,
      accounts: [process.env.WALLET_PRIVATE_KEY],
      chainId: 11155111,
      gasPrice: "auto",
      timeout: 600000,
    },

    lisk: {
      url: "https://rpc.api.lisk.com",
      accounts: [process.env.WALLET_PRIVATE_KEY],
      gasPrice: 1000000000,
    },

    "lisk-sepolia": {
      url: "https://rpc.sepolia-api.lisk.com",
      accounts: [process.env.WALLET_PRIVATE_KEY],
      gasPrice: 1000000000,
    },

    ethereum: {
      url: `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY_MAIN}`,
      accounts: [process.env.WALLET_PRIVATE_KEY],
      chainId: 44787,
    },

    alfajores: {
      url: "https://alfajores-forno.celo-testnet.org",
      accounts: [process.env.WALLET_PRIVATE_KEY],
      chainId: 44787,
    },

    celo: {
      url: "https://forno.celo.org",
      accounts: [process.env.WALLET_PRIVATE_KEY],
      chainId: 42220,
    },
  },

  // ethereum - celo - explorer API keys
  etherscan: {
    // Use "123" as a placeholder, because Blockscout doesn't need a real API key, and Hardhat will complain if this property isn't set.
    apiKey: {
      "lisk-sepolia": "123",
    },
    customChains: [
      {
        network: "lisk-sepolia",
        chainId: 4202,
        urls: {
          apiURL: "https://sepolia-blockscout.lisk.com/api",
          browserURL: "https://sepolia-blockscout.lisk.com",
        },
      },
    ],
  },
  sourcify: {
    enabled: false,
  },

  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 800,
      },
      viaIR: true,
    },
  },
};
