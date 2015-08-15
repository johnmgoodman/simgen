var Photein = function() {

};

Photein.REACTION_MAX_LIMIT = 5;
Photein.PER_REACTION_WATER = 6;
Photein.PER_REACTION_CO2 = 6;
Photein.PER_REACTION_O2 = 6;
Photein.PER_REACTION_LIGHT = 1;
Photein.PER_REACTION_ENERGY = 1;

Photein.prototype.synthesize = function(resources, callback) {
  var self = this;

  process.nextTick(function() {
    callback(null, self._synthesize(resources));
  });

  return this;
};

Photein.prototype._synthesize = function(resources) {
  var limit = Math.min(
    Math.floor(resources.light / Photein.PER_REACTION_LIGHT),
    Math.floor(resources.co2 / Photein.PER_REACTION_CO2),
    Math.floor(resources.water / Photein.PER_REACTION_WATER)
  );

  if(limit > Photein.REACTION_MAX_LIMIT) {
    limit = Photein.REACTION_MAX_LIMIT;
  }

  return {
    energy: Photein.PER_REACTION_ENERGY * limit,
    o2: Photein.PER_REACTION_O2 * limit,
    light: -1 * Photein.PER_REACTION_LIGHT * limit,
    water: -1 * Photein.PER_REACTION_WATER * limit,
    co2: -1 * Photein.PER_REACTION_CO2 * limit
  };
};

module.exports = Photein;