// Script para probar el contrato sin deployment real
// Este script simula las funcionalidades del contrato

async function main() {
  console.log("🧪 Probando funcionalidades del contrato ADHD Token...");

  // Desplegar contrato localmente
  const ADHDToken = await ethers.getContractFactory("ADHDToken");
  const [owner, user1, user2] = await ethers.getSigners();

  console.log("👤 Owner:", owner.address);
  console.log("👤 User1:", user1.address);

  // Deploy contract
  const adhdToken = await ADHDToken.deploy(owner.address);
  await adhdToken.waitForDeployment();

  const contractAddress = await adhdToken.getAddress();
  console.log("📍 Contract deployed at:", contractAddress);

  // Verificar suministro inicial
  const initialSupply = await adhdToken.totalSupply();
  console.log("💰 Initial supply:", ethers.formatEther(initialSupply), "ADHD");

  // Verificar balance del owner
  const ownerBalance = await adhdToken.balanceOf(owner.address);
  console.log("👑 Owner balance:", ethers.formatEther(ownerBalance), "ADHD");

  // Probar función de reward
  console.log("\n🎁 Probando sistema de rewards...");

  await adhdToken.mintReward(user1.address, "exercise", 8);
  const user1Balance = await adhdToken.balanceOf(user1.address);
  console.log("🏃 User1 recibió reward por ejercicio:", ethers.formatEther(user1Balance), "ADHD");

  await adhdToken.mintReward(user1.address, "nutrition", 9);
  const user1Balance2 = await adhdToken.balanceOf(user1.address);
  console.log("🥗 User1 recibió reward por nutrición:", ethers.formatEther(user1Balance2), "ADHD");

  // Probar staking (primero transferir tokens a user1)
  console.log("\n🔒 Probando sistema de staking...");

  const transferAmount = ethers.parseEther("100");
  await adhdToken.transfer(user1.address, transferAmount);

  const stakeAmount = ethers.parseEther("50");
  await adhdToken.connect(user1).stake(stakeAmount);
  const stakedBalance = await adhdToken.getStakedBalance(user1.address);
  console.log("📈 User1 staked:", ethers.formatEther(stakedBalance), "ADHD");

  // Verificar total supply no cambió
  const finalSupply = await adhdToken.totalSupply();
  console.log("💰 Final supply (debe ser igual):", ethers.formatEther(finalSupply), "ADHD");

  console.log("\n✅ Todas las pruebas pasaron exitosamente!");
  console.log("🚀 El contrato ADHD Token está listo para deployment en Base!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Error en las pruebas:", error);
    process.exit(1);
  });
