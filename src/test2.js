var simgen = require('./simgen');

var g = simgen.create('DNA');
var n = simgen.create('RNA',"DEF");

g.sequence("ABC");
console.log(g);
console.log(n);
console.log(g.nucleic_acid_sequence === n.nucleic_acid_sequence);
console.log(n.sequence());