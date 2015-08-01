describe('DNAReplicator', function() {

  var DNA = require('../src/core/DNA'),
    DNAReplicator = require('../src/core/DNAReplicator');

  it('should be a function', function() {
    expect(DNAReplicator).toEqual(jasmine.any(Function));
  });

  it('should implement a replicate method', function() {
    expect(DNAReplicator.prototype.replicate).toEqual(jasmine.any(Function));
  });

  describe('replicate method', function() {
    it('should return two DNAs with sequences identical to the given DNA',function() {
      var seq = "TAGCTGACTGACTGCTAGCTGTAACTGGCATGACGTCCGTACGTCATG",
       dna1 = new DNA(seq),
       dnar = new DNAReplicator(),
       dnaPair = dnar.replicate(dna1);

       expect(dnaPair).toEqual(jasmine.any(Array));
       expect(dnaPair.length).toBe(2);
       expect(dnaPair[0].sequence()).toBe(seq);
       expect(dnaPair[1].sequence()).toBe(seq);
    });
  });

});