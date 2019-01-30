const HDWalletProvider = require('truffle-hdwallet-provider');
const infuraKey = "a973f72655dc4760bfc81012fec47c86";
const mnemonic = "";

module.exports = {
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
  },
  solc: {
    // Turns on the Solidity optimizer. For development the optimizer's
    // quite helpful, just remember to be careful, and potentially turn it
    // off, for live deployment and/or audit time. For more information,
    // see the Truffle 4.0.0 release notes.
    //
    // https://github.com/trufflesuite/truffle/releases/tag/v4.0.0
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
}
