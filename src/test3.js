var simgen = require('./simgen');

var cell = {

  dna: simgen.create('DNA'),

  ribosomes: [simgen.create('Ribosome'), simgen.create('Ribosome')],

  rnaps: [simgen.create('RNAPoly'), simgen.create('RNAPoly'), simgen.create('RNAPoly')],

  aminoids: (function(aminoidData) {
    as = [];
    aminoidData.forEach(function(aminoidDatum) {
      as.push(simgen.create('Aminoid',aminoidDatum));
    });
    return as;
  })(require('./aminoids/base_aminoids'))

};


cell.dna.sequence(
  "ACGTACTGATCGTACGTAGCTAGCTGCAGCGAGATACGACTATCTGGACT" +
  "AGCACATATAAGACTACTGACTGATCTACGTACTAGCTACTGACTGACTG" +
  "TCAAGCATGCATACTGCAGTCTGACGCATACTGTAGCTGACTGTAGTGTG" +
  "TAGCTCATCTGTAGCTACTGTACTGACTGTACTGACTGACGGTCAGTACT" +
  "GACTGACGACTGACTGTACTGACTTACGTGAAAAAAAAAAAACTAGCGTA" +
  "TACTGCATACTGCATGACTGTACTCAGGACGGTATATATATAAATAATGC" +
  "GCGTACGTACGTGACTGCGCGATGCGCATGCAGTGCGCTCGCGCGCGCGG" +
  "GCGCGCGCGCGCGCGCATGATCTCAGTGCATGAGCTACTGCATGTACTGC" +
  "CTGAAAAAAAAAACTGTCGATGACTATGATCGATCGTACTGTACTGGGGG" +
  "GGGGGTATCGATTGGATGGATGGGGGGAAAAAGGGGGGGGGGGGGGACTG" +
  "TAGCTACGTCGGGGTACGTGCATGACTGTCAGTGACTGATGTAGCTGACT" +
  "TATGCATTATACTGTACGACTTACGTAGCTAGTATATAAAAGCATGCTTC" +
  "ACTGTCAGTGGCGGCTACGTCAGTCATGCATGTGACTGTGACGTATCGGG" +
  "TAGCGTACTGACGTCGTAGACGGACTGACTATCGACTGTGTACGTGACGC" +
  "AGCTACGTCGGGGTACGTGCAATGTCAGTCATGCATGTGACTGTCAGTCG" +
  "TACGTATGTATGACTAGTTAGCAGACGTGTACTGGTGCATGACGTGACGT" +
  "ACTGACGATGGACTGTACTGACTTACGTGAAAAAAAAAAAACTTTTATAG" +
  "TACTATGCGACTTACGTAGCATGTATATAAAAGCGACTTACGTAGCTAGT" +
  "TGCATACGTGCAGATTGGGGGGTATAATATTATAAAAGGTGACTTGTGAC" +
  "ACTGTACGACTGCGATTGGGGGGGGGCATGCAGTGCTACGTAGCGGGAAA" +
  "TACGACTTCTACGTCAGTTACGTGCATGACTCATGCCTACTGTACTGACT" +
  "TAGCTCATCTGTAGCTACTGTACTGACTGTACTGACTGACGGTCAGTACT" +
  "AGTCTGACGCATGATTGGGGGGTATTATGTATTTAAGGGACTGTAGCTGA" +
  "TAGCGTACTGTACGATTAAAAAAAAAAAAAAAAAATTACGTAGCACTGAC" +
  "TACGTGCATGGGCATGCAGTGACTTACGGCGGCTACGTCAGGTGCTGCCT" +
  "TAGCGTACTAGAGCGATTGGGGGGCATGCAGTCAGACGTGGCCGGACGAC" +
  "AGACGGAGCGCATGATTGGGGGGATGGCGACTTACGTAGCTACCCGTGCC"
);
console.log(cell);

simgen.protesynth_define(
  function() { this.type = 'random protein';},
  {
    'Mjghd': 3
  }
);

simgen.protesynth_define(
  function() { this.type = 'less random protein';},
  {
    'Mibrnps': 1
  }
);

var onTranslate = (function() {
  var polypeps = [];

  return function(err, pp) {
    if(!err) {
      polypeps.push(pp);
      if(polypeps.length % 4 === 0) {
        simgen.protesynth_synthesize(polypeps, function(err, proteins) {
          proteins.forEach(function(p) {
            console.log("synthesized: " + p.type);
          });
        });
      }
    }
  }
})();

cell.rnaps.forEach(function(rnap) {
  rnap.transcribe(cell.dna, function(err, rna) {
    cell.ribosomes.forEach(function(ribo) {
      ribo.translate(rna, onTranslate);
    });
  });
});





