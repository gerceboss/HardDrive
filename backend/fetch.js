//getting contract for interaction
const ABI = require("./ABI.json");
const { Web3 } = require("web3");
const web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://little-black-ensemble.ethereum-sepolia.discover.quiknode.pro/0cf0508350900bf159739cf58bdd6846952a7a42/"
  )
);

const contractAddress = "0x874806B13dA2e975556CA084e52416c252CedF7F"; //change the address and the provider
const contract = new web3.eth.Contract(ABI, contractAddress);
module.exports = contract;
