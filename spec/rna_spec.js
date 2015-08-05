describe("RNA", function() {
  RNA = require('../src/core/RNA');

  it("should be a function", function() {
    expect(RNA).toEqual(jasmine.any(Function));
  });

  it("should implement a sequence setter/getter method", function() {
    expect(RNA.prototype.sequence).toEqual(jasmine.any(Function));
  });

  describe("sequence method", function() {

    it("should preserve a given sequence", function() {
      var rnaTranscript = new RNA(),
        givenSequence = "ATATATATATATATAT";

      rnaTranscript.sequence(givenSequence);

      expect(rnaTranscript.sequence()).toBe(givenSequence);
    });
  });

  it("should implement a codons method", function() {
    expect(RNA.prototype.codons).toEqual(jasmine.any(Function));
  });

  describe("codons method", function() {

    it("should return an array of codons based on the sequence", function() {
      var rnaTranscript = new RNA(),
        codons = ["ATC","TCA","TTA","CGA"],
        seq = codons.join('');

      rnaTranscript.sequence(seq);

      expect(rnaTranscript.codons()).toEqual(codons);
    });

    it("should not calculate the codons array more than once", function() {
      var rnaTranscript = new RNA(),
        seq1 = "ATATATATATATATAT",
        seq2 = "GCGCGCGCGCGCGCGC",
        codons;

      rnaTranscript.sequence(seq1);
      codons = rnaTranscript.codons();
      rnaTranscript.__sequence = seq2;


      expect(rnaTranscript.codons()).toBe(codons);
    });
  });

});