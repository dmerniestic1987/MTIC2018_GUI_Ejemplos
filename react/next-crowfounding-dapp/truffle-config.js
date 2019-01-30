const path = require("path");
const HDWalletProvider = require('truffle-hdwallet-provider');
const infuraKey = "a9...";
const mnemonic = "";

module.exports = {
  contracts_build_directory: path.join(__dirname, "client/lib/contracts"), 
  
  networks: {
    development: {
      host: "127.0.0.1",     
      port: 8545,            
      network_id: "*",      
    },

    kovan: {
      provider: () => new HDWalletProvider(mnemonic, "https://kovan.infura.io/${infuraKey}", 0),
      network_id: 42,      
      gas: 5500000,     
      confirmations: 2,    
      timeoutBlocks: 200,  
      skipDryRun: true     
    },

    ropsten: {
      provider: () => new HDWalletProvider(mnemonic, "https://ropsten.infura.io/${infuraKey}", 0),
      network_id: 3,      
      gas: 5500000,       
      confirmations: 2,    
      timeoutBlocks: 200,  
      skipDryRun: true     
    },

     rinkeby: {
       provider: () => new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/${infuraKey}", 0),
       network_id: 4,      
       gas: 5500000,        
       confirmations: 2,   
       timeoutBlocks: 200, 
       skipDryRun: true    
     },

     mainnet: {
      provider: () => new HDWalletProvider(mnemonic, "https://mainnet.infura.io/${infuraKey}", 0),
      network_id: 1,       
      gas: 5500000,       
      confirmations: 2,    
      timeoutBlocks: 200,  
      skipDryRun: true     
    }
  }
};
