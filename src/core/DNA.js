var DNA = function DNA(initSequence) {
  if(typeof initSequence === 'string') {
    this.nucleic_acid_sequence(initSequence);
  }
};


DNA.prototype.sequence = function(sequence) {
  return this.nucleic_acid_sequence(sequence);
};


module.exports = DNA;
