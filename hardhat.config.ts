import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const GOERLI_URL = process.env.GOERLI_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;


const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    goerli: {
      url: GOERLI_URL || "https://dummy.url.com",
      accounts: [PRIVATE_KEY || "0x1234567890123456789012345678901234567890123456789012345678901234"]
    }
  }
};

export default config;
