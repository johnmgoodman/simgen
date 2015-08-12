var Aminoid = require('./Aminoid');

var Ribosome = function Ribosome() {

};

Ribosome.TRANSLATION_START_CODONS = ["ATG"];
Ribosome.TRANSLATION_STOP_CODONS = ["TAA","TAG","TGA"];



Ribosome.prototype.translate = function(rna, callback) {
  this._translate(this, rna.codons(), callback);
};


Ribosome.prototype._translate = (function() {
  var stopcs = Ribosome.TRANSLATION_STOP_CODONS,
    startcs = Ribosome.TRANSLATION_START_CODONS,


    firstSigIndex = function(sigcs, codons) {
      var sigIndex = -1,
        eachSigc = function(sigc) {
          var index = codons.indexOf(sigc);
          if( index !== -1 && (sigIndex === -1 || index < sigIndex) ) {
            sigIndex = index;
          }
        };

      sigcs.forEach(eachSigc);
      return sigIndex;
    },


    firstStartIndex = function(codons) {
      return firstSigIndex(startcs, codons);
    },


    firstStopIndex = function(codons) {
      return firstSigIndex(stopcs, codons);
    },

    constructPolypeptide = function(codons) {
      var pp = "";

      codons.forEach(function(codon) {
        pp += Aminoid.codonLookup(codon) || ' ';
      });

      return pp;
    };


  return function(env, codons, callback) {
    var relevantCSeq, startIndex, stopIndex, polypepCodons, err = null;
    startIndex = firstStartIndex(codons);
    if(startIndex !== -1) {
    // start codon found
      relevantCSeq = codons.slice(startIndex);
      stopIndex = firstStopIndex(relevantCSeq);
      if(stopIndex !== -1) {
      // stop codon found
        polypepCodons = relevantCSeq.slice(0, stopIndex);
        relevantCSeq = relevantCSeq.slice(stopIndex + 1);
        callback(err, constructPolypeptide(polypepCodons));
        process.nextTick(function(){env._translate(env, relevantCSeq, callback);});
      } else {
        callback(err, constructPolypeptide(relevantCSeq));
      }
    }

  };
})();



module.exports = Ribosome;