//getting contract for interaction
const ABI = require("./ABI.json");
const { Web3 } = require("web3");
const web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://data-seed-prebsc-1-s1.binance.org:8545/"
  )
);
// "https://polygon-mumbai.g.alchemy.com/v2/In2MkKQ-tdNRRqw8YteHoQtMQF41vLWi"
// 0xF4b43bdacC4023d5e0a7E0d830844f45161AD513  -deployed on bsctestnet
const contractAddress = "0xF4b43bdacC4023d5e0a7E0d830844f45161AD513"; //deployed on polygon mumbai
const contract = new web3.eth.Contract(ABI, contractAddress);
module.exports = contract;
