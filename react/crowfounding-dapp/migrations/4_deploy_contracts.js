var FactoryProyectoInversion = artifacts.require("./FactoryProyectoInversion.sol");
module.exports = function(deployer) {
  deployer.deploy(FactoryProyectoInversion);
};
