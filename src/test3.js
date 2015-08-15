var simgen = require('./simgen');

var cell = {

  resources: {
    light: 200,
    water: 430,
    co2: 430,
    o2: 20,
    energy: 120
  },

  dna: simgen.create('DNA'),

  ribosomes: [simgen.create('Ribosome'), simgen.create('Ribosome')],

  rnaps: [simgen.create('RNAPoly'), simgen.create('RNAPoly'), simgen.create('RNAPoly')],

  photeins: [simgen.create('Photein'), simgen.create('Photein'), simgen.create('Photein')],

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
  function() { this.type = 'protein 1';},
  {
    'Mjghd': 3
  }
);

simgen.protesynth_define(
  function() { this.type = 'protein 2';},
  {
    'Mibrnps': 1
  }
);


var polypeps = {};
var rnas = [];
var proteins = {};

var onPSynth = function(err, products) {
  console.log(polypeps);
  console.log(products.remaining);
  if(products.products.length > 0) {
    products.products.forEach(function(protein) {
      proteins[protein.type] = (proteins[protein.type] || []).concat(protein);
    });

    var out = "Proteins:";
    for(var p in proteins) {
      if(proteins.hasOwnProperty(p)) {
        out += " " + p + ":" + proteins[p].length;
      }
    }
  }
};

var onTranslate = (function() {

  return function(err, pp) {
    if(polypeps.hasOwnProperty(pp)) {
      polypeps[pp] += 1;
    } else {
      polypeps[pp] = 1;
    }
    simgen.protesynth_synthesize(polypeps, onPSynth);
  }
})();


var onTranscribe = function(err, rna) {
  console.log(rna);
  rnas.push(rna);
};



setInterval(function() {
  var nribo;
  if(rnas.length > 0 && cell.ribosomes.length > 0) {
    nribo = Math.floor(Math.random() * cell.ribosomes.length);
    while((nribo -= 1) >= 0) {
      cell.ribosomes[nribo].translate(rnas.pop(), onTranslate);
    }
  }
}, 2000);

setInterval(function() {
  var nrnap;
  if(cell.rnaps.length > 0) {
    nrnap = Math.floor(Math.random() * cell.rnaps.length);
    while((nrnap -= 1) >= 0) {
      cell.rnaps[nrnap].transcribe(cell.dna, onTranscribe);
    }
  }
}, 2500);


setInterval(function() {
  cell.photeins.forEach(function(photein) {
    photein.synthesize(
      cell.resources,
      function(err, products) {
        var pname;

        for(pname in products) {
          if(products.hasOwnProperty(pname)) {
            cell.resources[pname] = (cell.resources[pname] || 0) + products[pname];
          }
        }

        console.log(cell.resources);

      }
    );
  });
}, 700);

