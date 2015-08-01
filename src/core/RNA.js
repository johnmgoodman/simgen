
var RNA = function RNA(initSequence) {
  this.__sequence = initSequence || "";
};


RNA.prototype.sequence = function(sequence) {
  return this.__sequence = this.__sequence || sequence;
};

RNA.prototype.codons = function() {
  return this.__codons = this.__codons || this.sequence().match(/.{3}/g);
};

module.exports = RNA;
