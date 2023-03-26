import hre, { ethers } from "hardhat";
import { deployKimberlite, deployRegistry } from "./deploy";

export async function getKimberlite() {
    if (hre.network.name == "hardhat") {
        const facetRegistry = await deployRegistry()
        return deployKimberlite(facetRegistry)
    }
    const factory = await ethers.getContractFactory("Kimberlite")
    if (hre.network.name == "polygon") {
        return await factory.attach("0xf78b989D3cF27EFc309887501a749fE2aEAAA277")
    }
    if (hre.network.name == "mantle_testnet") {
        return await factory.attach("0x05c7df69BA4Be0F6483F8778606E7253Bc2254A4")
    }
    throw "Unknown network"
}

export async function extract() {
    console.log('Extract')
    const kimberlite = await getKimberlite();
    const tx = await kimberlite.extractDiamond("https://arweave.net/5S1NrCPfLJX7FgRx78kV8nDJCnwFkWRKSc18pDdD4Sw")
    const receipt = await tx.wait()
    const diamondAddress = receipt.events![3].args!.diamond
    console.log("Extracted diamond", diamondAddress);
    return diamondAddress;
}

if (require.main === module) {
    extract()
        .then(() => process.exit(0))
        .catch(error => {
            console.error(error)
            process.exit(1)
        })

}


