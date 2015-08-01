describe("RNAPoly", function() {
  var DNA = require('../src/core/DNA'),
    RNA = require('../src/core/RNA'),
    RNAPoly = require('../src/core/RNAPoly');

  it("should be a function", function() {
    expect(RNAPoly).toEqual(jasmine.any(Function));
  });

  it("should define a transcription promoter sequence", function() {
    expect(RNAPoly.TRANSCRIPTION_PROMOTER_SEQUENCE).toEqual(jasmine.any(String));
  });

  it("should define a transcription termination sequence", function() {
    expect(RNAPoly.TRANSCRIPTION_TERMINATOR_SEQUENCE).toEqual(jasmine.any(String));
  });

  it("should implement a transcribe method", function() {
    expect(RNAPoly.prototype.transcribe).toEqual(jasmine.any(Function));
  });

  describe("transcribe method", function() {
    var rnap = new RNAPoly(),
      dna = new DNA(),
      transcribed,
      remTPSeqs = function(seq) {
        return seq
          .split(RNAPoly.TRANSCRIPTION_PROMOTER_SEQUENCE)
          .join('')
          .split(RNAPoly.TRANSCRIPTION_TERMINATOR_SEQUENCE)
          .join('');
      };

    dna.sequence(
      remTPSeqs("AACGTGTACGACAGTACGTACGTGAGCGTACTGACG") +
      RNAPoly.TRANSCRIPTION_PROMOTER_SEQUENCE +
      remTPSeqs("AGGATCCGGATCGATCCCATGCTTAGGCCTAAATCG") +
      RNAPoly.TRANSCRIPTION_TERMINATOR_SEQUENCE +
      remTPSeqs("AATACGCATGAGTTGAGATTAGTACGTTGACTGACG") +
      RNAPoly.TRANSCRIPTION_PROMOTER_SEQUENCE +
      remTPSeqs("GCATGATCGATCCATCGATCCAGCAGTTGAGTTGAG") +
      RNAPoly.TRANSCRIPTION_TERMINATOR_SEQUENCE +
      remTPSeqs("TATGATCTGCCGTGCCGGATGCATGTACGTCAGCGA") +
      RNAPoly.TRANSCRIPTION_PROMOTER_SEQUENCE +
      remTPSeqs("ATGGGTGACTGAGTACTGACAGCGTCAGTAGCAAGT")
    );

    transcribed = rnap.transcribe(dna);

    it("should return an array of RNA(s), given a DNA", function() {
      expect(transcribed).toEqual(jasmine.any(Array));

      transcribed.forEach(function(rna) {
        expect(rna).toEqual(jasmine.any(RNA));
      });
    });

    it("should transcribe accurately", function() {
      var sequences = [
        remTPSeqs("AGGATCCGGATCGATCCCATGCTTAGGCCTAAATCG"),
        remTPSeqs("GCATGATCGATCCATCGATCCAGCAGTTGAGTTGAG"),
        remTPSeqs("ATGGGTGACTGAGTACTGACAGCGTCAGTAGCAAGT")
      ];

      expect(transcribed.length).toBe(sequences.length);

      transcribed.forEach(function(rna) {
        var seqIndex = sequences.indexOf(rna.sequence());
        expect(seqIndex).not.toBe(-1);
        sequences.splice(seqIndex, 1);
      });
    });

  });


});