var DNA = require('./DNA'),

  DNAReplicator = function DNAReplicator() {

  };


DNAReplicator.prototype.replicate = function(parentDNA) {
  return [parentDNA, new DNA(parentDNA.sequence())];
};


module.exports = DNAReplicator;