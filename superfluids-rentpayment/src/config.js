export const Framework = require("@superfluid-finance/sdk-core");
export const ethers = require("ethers");

// Ethers.js provider initialization
export const url =
  "https://eth-kovan.alchemyapi.io/v2/nl2PDNZm065-H3wMj2z1_mvGP81bLfqX";
export const customHttpProvider = new ethers.providers.JsonRpcProvider(url);
