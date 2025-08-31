// Base Network Configuration for Neuro21 Mini App
export const BASE_CONFIG = {
  // Network Details
  CHAIN_ID: 8453, // Base Mainnet
  RPC_URL: "https://mainnet.base.org",
  BLOCK_EXPLORER: "https://basescan.org",

  // Testnet (for development)
  TESTNET_CHAIN_ID: 84532,
  TESTNET_RPC_URL: "https://sepolia.base.org",
  TESTNET_BLOCK_EXPLORER: "https://sepolia.basescan.org",

  // Token Configuration
  ADHD_TOKEN: {
    SYMBOL: "ADHD",
    DECIMALS: 18,
    NAME: "ADHD Token",
    // Contract deployed locally (for development)
    LOCAL_ADDRESS: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    // Add mainnet address here when deployed
    // MAINNET_ADDRESS: "0x...",
  },

  // Reward System
  REWARDS: {
    EXERCISE: 1000, // 10 tokens (with 18 decimals)
    NUTRITION: 800, // 8 tokens
    SLEEP: 600,     // 6 tokens
    STREAK_BONUS: 500, // 5 tokens bonus
  },

  // Mini App Settings
  MINI_APP: {
    ENABLED: true,
    THEME: "neuro21",
    FEATURES: [
      "wallet-connection",
      "token-rewards",
      "progress-tracking",
      "professional-booking"
    ]
  }
};

export default BASE_CONFIG;
