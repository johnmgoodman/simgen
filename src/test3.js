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
  
  polypeps: new Repo(),

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

var rnas = [];

setInterval(function() {
  simgen.protesynth_synthesize(cell.polypeps.items(), function(err, proteins) {
    proteins.forEach(function(protein) {
      cell.proteins.applyItem(protein.proteinType, 1);
      cell.polypeps.apply(protein.cost);
    });
  });
  
  console.log(cell.proteins.items());
}, 2000);


setInterval(function() {
  var nribo = Math.floor(Math.random() * cell.proteins.quantityOf('Ribosome')),
  iribo = 0,
  ribo = simgen.create('Ribosome'),
  rna = rnas.pop();
  
  onTranslate = function(err, pp) {
    cell.polypeps.apply(pp, 1);
    iribo += 1;
    
    if(iribo < nribo) {
      ribo.translate(rnas.pop(), onTranslate);
    }
  };
  
  if(rna) {
    ribo.translate(rna, onTranslate);
  }
  
}, 2000);

setInterval(function() {
  var nrnap = Math.floor(Math.random() * cell.proteins.quantityOf('RNAPoly'));
    irnap = 0,
    rnap = simgen.create('RNAPoly'),
    onTranscribe = function(err, rna) {
      rnas.push(rna);
      irnap += 1;
      
      if(irnap < nrnap) {
        rnap.transcribe(cell.dna, onTranscribe);
      }
    };
    
  rnap.transcribe(cell.dna, onTranscribe);
}, 2500);


setInterval(function() {
  var nphos = cell.proteins.quantityOf('Photein'),
  ipho = 0,
  photein = simgen.create('Photein'),
  onPhoSynth = function(err, products) {
    cell.resources.apply(products);
    ipho += 1;

    if(ipho < nphos) {
      photein.synthesize(cell.resources.items(), onPhoSynth);
    }
  };

  photein.synthesize(cell.resources.items(), onPhoSynth);
}, 700);

/*
 *
 * Todo
 *
 *  Fix Protesynth so that it doesn't modify the polypeps parameter, but returns modifications for the original polypeps object in the callback
 *
 */
