 // Script para verificar el balance de la cuenta
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { ethers } from 'ethers';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env.local file
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

async function checkBalance() {
  console.log("🔍 Checking account balance...");

  if (!process.env.PRIVATE_KEY) {
    console.error("❌ PRIVATE_KEY not found in .env.local");
    return;
  }

  try {
    // Create provider for Base mainnet
    const provider = new ethers.JsonRpcProvider("https://mainnet.base.org");

    // Create wallet
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

    console.log("👤 Address:", wallet.address);

    // Check balance
    const balance = await provider.getBalance(wallet.address);
    const balanceInEth = ethers.formatEther(balance);

    console.log("💰 Balance on Base Mainnet:", balanceInEth, "ETH");

    if (balance === 0n) {
      console.log("\n❌ You don't have ETH on Base mainnet");
      console.log("💡 You need to get ETH on Base mainnet for deployment");
      console.log("🌐 Base Faucets: https://docs.base.org/tools/network-faucets");
    } else {
      console.log("\n✅ You have enough funds for deployment!");
      console.log("🚀 You can proceed with: npm run deploy:base");
    }

  } catch (error) {
    console.error("❌ Error checking balance:", error.message);
  }
}

checkBalance();
