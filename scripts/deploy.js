// Load environment variables from .env.local
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env.local file
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

async function main() {
  console.log("🚀 Deploying ADHD Token...");

  // Get deployer account
  let deployer;
  try {
    const signers = await ethers.getSigners();
    if (signers && signers.length > 0) {
      deployer = signers[0];
      console.log("👤 Deploying with account:", deployer.address);
    } else {
      throw new Error("No signers available. Check your network configuration.");
    }

    // Debug: Show environment variables (remove in production)
    console.log("🔧 Environment check:");
    console.log("- PRIVATE_KEY exists:", !!process.env.PRIVATE_KEY);
    console.log("- PRIVATE_KEY length:", process.env.PRIVATE_KEY?.length || 0);
    console.log("- BASESCAN_API_KEY exists:", !!process.env.BASESCAN_API_KEY);

  } catch (error) {
    console.error("❌ Error getting deployer account:", error.message);
    console.log("💡 Make sure your hardhat.config.js has the correct network configuration");
    console.log("💡 For external networks, ensure PRIVATE_KEY is set in .env.local");

    // Debug information
    console.log("🔧 Debug info:");
    console.log("- .env.local path:", path.join(__dirname, '..', '.env.local'));
    console.log("- process.env.PRIVATE_KEY:", process.env.PRIVATE_KEY ? "Set" : "Not set");

    throw error;
  }

  // Get the contract factory
  const ADHDToken = await ethers.getContractFactory("ADHDToken");

  // Deploy the contract with deployer as initial owner
  const adhdToken = await ADHDToken.deploy(deployer.address);

  await adhdToken.waitForDeployment();

  const contractAddress = await adhdToken.getAddress();

  console.log("✅ ADHD Token deployed successfully!");
  console.log("📍 Contract address:", contractAddress);
  console.log("🌐 Base Network:", "https://base.org");
  console.log("🔍 BaseScan:", `https://basescan.org/address/${contractAddress}`);

  // Verify contract on Base
  console.log("\n🔍 To verify on Base:");
  console.log(`npx hardhat verify --network base ${contractAddress}`);

  return contractAddress;
}

// Execute deployment
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
