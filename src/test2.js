var simgen = require('./simgen');

var g = new simgen.DNA();
var n = new simgen.RNA("DEF");

g.sequence("ABC");
console.log(g);
console.log(n);
console.log(g.nucleic_acid_sequence === n.nucleic_acid_sequence);
console.log(n.sequence());