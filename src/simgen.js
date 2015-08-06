
var simgen = require('./core/Simgen');

simgen.module( 'NucleicAcid', require('./core/modules/NucleicAcid') );

simgen.entity('DNA', 'NucleicAcid', require('./core/DNA'));
simgen.entity('RNA', 'NucleicAcid', require('./core/RNA'));
simgen.entity('Aminoid', require('./core/Aminoid'));
simgen.entity('RNAPoly', require('./core/RNAPoly'));
simgen.entity('Ribosome', require('./core/Ribosome'));


module.exports = simgen;