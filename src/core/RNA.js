
var RNA = function RNA(initSequence) {
  if(typeof initSequence === 'string') {
    this.nucleic_acid_sequence(initSequence);
  }
};

require('./modules/NucleicAcid').call(RNA);

RNA.prototype.sequence = function(sequence) {
  return this.nucleic_acid_sequence(sequence);
};


RNA.prototype.codons = function() {
  return this.__codons = this.__codons || this.sequence().match(/.{3}/g);
};

module.exports = RNA;
