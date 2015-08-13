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

/*
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
);*/

cell.dna.sequence(
  "ATATAAATGTAGAAAAAAAAAAAAAAATATAAATGTTGTAGAAAAAAAAAATATAAATGTCGAAAAAAAAA"
);

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

simgen.protesynth_define(
  function() { this.type = 'test protein 1';},
  {
    'M': 1
  }
);

simgen.protesynth_define(
  function() { this.type = 'test protein 2';},
  {
    'Mb': 1
  }
);

var polypeps = {};

var onPSynth = function(err, products) {
  polypeps = products.remaining;
  console.log('-------');
  console.log(polypeps);
  console.log(products.products);
};

var onTranslate = (function() {

  return function(err, pp) {
    if(polypeps.hasOwnProperty(pp)) {
      polypeps[pp] += 1;
    } else {
      polypeps[pp] = 1;
    }
    //console.log(polypeps);
    simgen.protesynth_synthesize(polypeps, onPSynth);
  }
})();

cell.rnaps.forEach(function(rnap) {
  rnap.transcribe(cell.dna, function(err, rna) {
    cell.ribosomes.forEach(function(ribo) {
      ribo.translate(rna, onTranslate);
    });
  });
});





