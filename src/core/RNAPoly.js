var RNA = require('./RNA');

var RNAPoly = function RNAPoly() {

};

RNAPoly.TRANSCRIPTION_PROMOTER_SEQUENCE = "ATATAA";
RNAPoly.TRANSCRIPTION_TERMINATOR_SEQUENCE = "AAAAAAAAA";

RNAPoly.prototype.transcribe = function(dna, callback) {
  this._transcribe(this, dna.sequence(), callback);
};



RNAPoly.prototype._transcribe = (function() {
  var promoterLength = RNAPoly.TRANSCRIPTION_PROMOTER_SEQUENCE.length,
    terminatorLength = RNAPoly.TRANSCRIPTION_TERMINATOR_SEQUENCE.length;
  return function(env, dnaseq, callback) {
    var relevantSeq, promoterIndex, terminatorIndex, geneseq, err = null;

    promoterIndex = dnaseq.indexOf(RNAPoly.TRANSCRIPTION_PROMOTER_SEQUENCE);
    if( promoterIndex !== -1) {
    // Found promoter
      relevantSeq = dnaseq.substr(promoterIndex + promoterLength);
      terminatorIndex = relevantSeq.indexOf(RNAPoly.TRANSCRIPTION_TERMINATOR_SEQUENCE);
      if( terminatorIndex !== -1 ) {
      // Found terminator

        geneseq = relevantSeq.substr(0,terminatorIndex);
        relevantSeq = relevantSeq.substr(terminatorIndex + terminatorLength);

        callback(err, new RNA(geneseq));
        process.nextTick(function(){env._transcribe(env, relevantSeq, callback);});
      } else {
        callback(err, new RNA(relevantSeq));
      }
    }
  };
})();

module.exports = RNAPoly;