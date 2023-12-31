// scripts/withdraw.js

import hre from "hardhat";
import abi from "../artifacts/contracts/BuyMeACoffee.sol/BuyMeACoffee.json";

async function getBalance(provider: any, address: string) {
    const balanceBigInt = await provider.getBalance(address);
    return hre.ethers.utils.formatEther(balanceBigInt);
}

async function main() {
    // Get the contract that has been deployed to Goerli.
    const contractAddress = "0x4c76A9E277028526dc109293660b5b91c619683a";
    const contractABI = abi.abi;

    // Get the node connection and wallet connection.
    const provider = new hre.ethers.providers.InfuraProvider("goerli", process.env.GOERLI_API_KEY);

    // Ensure that signer is the SAME address as the original contract deployer,
    // or else this script will fail with an error.
    const signer = new hre.ethers.Wallet(process.env.PRIVATE_KEY as string, provider);

    // Instantiate connected contract.
    const buyMeACoffee = new hre.ethers.Contract(contractAddress, contractABI, signer);

    // Check starting balances.
    console.log("current balance of owner: ", await getBalance(provider, signer.address), "ETH");
    const contractBalance = await getBalance(provider, buyMeACoffee.address);
    console.log("current balance of contract: ", await getBalance(provider, buyMeACoffee.address), "ETH");

    // Withdraw funds if there are funds to withdraw.
    if (contractBalance !== "0.0") {
        console.log("withdrawing funds..")
        const withdrawTxn = await buyMeACoffee.withdrawTips(signer.address);
        await withdrawTxn.wait();
    } else {
        console.log("no funds to withdraw!");
    }

    // Check ending balance.
    console.log("current balance of owner: ", await getBalance(provider, signer.address), "ETH");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });