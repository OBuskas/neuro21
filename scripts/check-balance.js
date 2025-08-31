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
  console.log("🔍 Verificando balance de la cuenta...");

  if (!process.env.PRIVATE_KEY) {
    console.error("❌ PRIVATE_KEY no encontrada en .env.local");
    return;
  }

  try {
    // Crear provider para Base mainnet
    const provider = new ethers.JsonRpcProvider("https://mainnet.base.org");

    // Crear wallet
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

    console.log("👤 Dirección:", wallet.address);

    // Verificar balance
    const balance = await provider.getBalance(wallet.address);
    const balanceInEth = ethers.formatEther(balance);

    console.log("💰 Balance en Base Mainnet:", balanceInEth, "ETH");

    if (balance === 0n) {
      console.log("\n❌ No tienes ETH en Base mainnet");
      console.log("💡 Necesitas obtener ETH de Base mainnet para hacer el deployment");
      console.log("🌐 Faucets de Base: https://docs.base.org/tools/network-faucets");
    } else {
      console.log("\n✅ Tienes suficientes fondos para el deployment!");
      console.log("🚀 Puedes proceder con: npm run deploy:base");
    }

  } catch (error) {
    console.error("❌ Error verificando balance:", error.message);
  }
}

checkBalance();
