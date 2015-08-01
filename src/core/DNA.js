var DNA = function DNA(initSequence) {
  if(typeof initSequence === 'string') {
    this.__sequence = initSequence;
  }
};


/*
 *  Mutation methods
 */
DNA.prototype.point = function(index, sequence) {
  var dnaseq = this.__sequence;
  this.__sequence = dnaseq.substr(0, index) + sequence + dnaseq.substr(index+sequence.length);
  return this;
};

DNA.prototype.insertion = function(index, sequence) {
  var dnaseq = this.__sequence;
  this.__sequence = dnaseq.substr(0, index) + sequence + dnaseq.substr(index);
  return this;
};

DNA.prototype.deletion = function(index, length) {
  var dnaseq = this.__sequence;
  this.__sequence = dnaseq.substr(0,index) + dnaseq.substr(index+length);
  return this;
};

DNA.prototype.duplication = function(index, length, count) {
  var dnaseq = this.__sequence,
    dupCount = 1;

  this.__sequence = dnaseq.substr(0,index);

  for(;dupCount <= count;dupCount += 1) {
    this.__sequence += dnaseq.substr(index, length);
  }

  this.__sequence += dnaseq.substr(index+length);
  return this;
};

DNA.prototype.translocation = function(index, dna, dnaIndex) {
//  var dnaseq = this.__sequence;
//  this.__sequence = ;
//  return this;
};




DNA.prototype.sequence = function(sequence) {
  if(typeof sequence === "string") {
    this.__sequence = sequence;
    return this;
  }

  return this.__sequence;
};


module.exports = DNA;
