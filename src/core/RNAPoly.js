var RNAPoly = function RNAPoly() {

};

RNAPoly.TRANSCRIPTION_PROMOTER_SEQUENCE = "ATATAA";
RNAPoly.TRANSCRIPTION_TERMINATOR_SEQUENCE = "AAAAAAAAA";

RNAPoly.prototype.transcribe = function(dna) {
  return this._transcribe(dna.sequence());
};



RNAPoly.prototype._transcribe = (function() {
  var promoterLength = RNAPoly.TRANSCRIPTION_PROMOTER_SEQUENCE.length,
    terminatorLength = RNAPoly.TRANSCRIPTION_TERMINATOR_SEQUENCE.length;
  return function(dnaseq) {
    var relevantSeq, promoterIndex, terminatorIndex, geneseq;

    promoterIndex = dnaseq.indexOf(RNAPoly.TRANSCRIPTION_PROMOTER_SEQUENCE);
    if( promoterIndex !== -1) {
    // Found promoter
      relevantSeq = dnaseq.substr(promoterIndex + promoterLength);
      terminatorIndex = relevantSeq.indexOf(RNAPoly.TRANSCRIPTION_TERMINATOR_SEQUENCE);
      if( terminatorIndex !== -1 ) {
      // Found terminator

        geneseq = relevantSeq.substr(0,terminatorIndex);
        relevantSeq = relevantSeq.substr(terminatorIndex + terminatorLength);

        return this._transcribe(relevantSeq).concat(new RNA(geneseq));
      } else {
        return [new RNA(relevantSeq)];
      }
    } else {
      return [];
    }
  };
})();

module.exports = RNAPoly;