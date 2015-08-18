var simgen = require('./simgen');
var Repo = require('./core/Repo.js');
var cell = {

  resources: new Repo({
    light: 200,
    water: 430,
    co2: 430,
    o2: 20,
    energy: 120
  }),


  dna: simgen.create('DNA'),

  proteins: new Repo({
    Ribosome: 2,
    RNAPoly: 3,
    Photein: 2,
  }),

  aminoids: (function(aminoidData) {
    as = [];
    aminoidData.forEach(function(aminoidDatum) {
      as.push(simgen.create('Aminoid',aminoidDatum));
    });
    return as;
  })( require('./aminoids/base_aminoids') )

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
/*
cell.dna.sequence(
  "ATATAAATGTAGAAAAAAAAAAAAAAATATAAATGTTGTAGAAAAAAAAAATATAAATGTCGAAAAAAAAA"
);

/*
cell.dna.nucleic_acid_random_sequence(3500);

console.log(cell.dna.sequence());
*/
simgen.protesynth_define(
  'PROTEIN1',
  {
    'Mjghd': 3
  }
);

simgen.protesynth_define(
  'PROTEIN2',
  {
    'Mibrnps': 1
  }
);


var polypeps = {};
var rnas = [];
var proteins = {};

var onPSynth = function(err, proteins) {
  console.log('PSynth ----------');
  console.log(proteins);
  
};

var onTranslate = (function() {

  return function(err, pp) {
    if(polypeps.hasOwnProperty(pp)) {
      polypeps[pp] += 1;
    } else {
      polypeps[pp] = 1;
    }
    console.log(polypeps);
    simgen.protesynth_synthesize(polypeps, onPSynth);
  }
})();


var onTranscribe = function(err, rna) {
  //console.log(rna);
  rnas.push(rna);
};



setInterval(function() {
  var nribo = Math.floor(Math.random() * cell.proteins.quantityOf('Ribosome')),
  iribo = 0,
  ribo = simgen.create('Ribosome');

  for(; iribo < nribo && rnas.length > 0; iribo += 1) {
    ribo.translate(rnas.pop(), onTranslate);
  }
}, 2000);

setInterval(function() {
  var nrnap = Math.floor(Math.random() * cell.proteins.quantityOf('RNAPoly'));
    irnap = 0,
    rnap = simgen.create('RNAPoly');

  for(; irnap < nrnap; irnap += 1) {
    rnap.transcribe(cell.dna, onTranscribe);
  }
}, 2500);


setInterval(function() {
  var nphos = cell.proteins.quantityOf('Photein'),
  ipho = 0,
  photein = simgen.create('Photein'),
  onPhoSynth = function(err, products) {
    cell.resources.apply(products);
    ipho += 1;

    //console.log(products);
    if(ipho < nphos) {
      photein.synthesize(cell.resources.items(), onPhoSynth);
    }
  };

  //console.log('------------------------------------------------');
  //console.log(cell.resources.items());
  photein.synthesize(cell.resources.items(), onPhoSynth);
}, 700);

/*
 *
 * Todo
 *
 *  Fix Protesynth so that it doesn't modify the polypeps parameter, but returns modifications for the original polypeps object in the callback
 *
 */
