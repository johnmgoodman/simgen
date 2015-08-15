
var Simgen = require('./core/Simgen'),
  simgen = new Simgen();

simgen.module( 'NucleicAcid', require('./core/modules/NucleicAcid') );
simgen.module('Protesynth', require('./core/modules/Protesynth'));

simgen.entity('DNA', 'NucleicAcid', require('./core/DNA'));
simgen.entity('RNA', 'NucleicAcid', require('./core/RNA'));
simgen.entity('Aminoid', require('./core/Aminoid'));
simgen.entity('RNAPoly', require('./core/RNAPoly'));
simgen.entity('Ribosome', require('./core/Ribosome'));
simgen.entity('Photein', require('./core/Photein'));

simgen.implement('Protesynth', Simgen);

module.exports = simgen;