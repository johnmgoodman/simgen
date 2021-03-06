
var Aminoid = function Aminoid(init) {
  if(init.hasOwnProperty('label')) {
    if(init.label.length === 1) {
      this.__label = init.label;
    } else {
      this._labelLengthError();
    }
  }
  if(init.hasOwnProperty('anticodons')) {
    this.__anticodons = init.anticodons;
  }
  if(this.hasOwnProperty('__anticodons') && this.hasOwnProperty('__label')) {
    Aminoid._register(this);
  }
};


Aminoid.__anticodonMap = {};

Aminoid._register = function(aminoid) {
  aminoid.anticodons().forEach(function(anticodon) {
    Aminoid.__anticodonMap[anticodon] = aminoid.label();
  });
}

Aminoid.codonLookup = function(codon) {
  return Aminoid.__anticodonMap[codon];
};



Aminoid.prototype.label = function(label) {
  if(typeof label === 'string') {
    if(label.length === 1) {
      this.__label = label;
      return this;
    } else {
      this._labelLengthError();
    }
  }
  return this.__label;
};

Aminoid.prototype.anticodons = function(anticodons) {
  if(typeof anticodons === 'undefined') {
    return this.__anticodons;
  }

  this.__anticodons = typeof anticodons === 'string' ? [anticodons] : anticodons;

  Aminoid._register(this);

  return this;
}


Aminoid.prototype._labelLengthError = function() {
  throw "Aminoid label must be a single character long.";
};


module.exports = Aminoid;