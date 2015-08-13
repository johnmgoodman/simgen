
var def = {

  products: [
    /*
     *  {
     *    constructor: productConstructor,
     *    polypeps: {'polypep': 2, 'polypep': 1}
     *  },
     *
     */
  ]

},

uniq = function(array) {
  var seen = [];

  array.forEach(function(item) {
    if(seen.indexOf(item) === -1) {
      seen.push(item);
    }
  });

  return seen;
},


getAvailableCount = function(query, pool) {
  var counts = {};

  query.forEach(function(q) {
    counts[q] = pool.filter(function(item) {
      return item === q;
    }).length;
  });
  return counts;
},


search = function(polypeps) {
  var product, productId, pp, ppRequired, prPolypeps, meetsRequirements;

  for(productId = 0; productId < def.products.length; productId += 1) {
    product = def.products[productId];

    prPolypeps = product.polypeps;
    meetsRequirements = true;



    for(pp in prPolypeps) {
      if(prPolypeps.hasOwnProperty(pp)) {



        if(polypeps.hasOwnProperty(pp)) {
          if(polypeps[pp] < prPolypeps[pp]) {
            meetsRequirements = false;
            break;
          }
        } else {
          meetsRequirements = false;
          break;
        }



      }
    }


    if(meetsRequirements === true) {
      for(pp in prPolypeps) {
        if(prPolypeps.hasOwnProperty(pp)) {
          polypeps[pp] -= prPolypeps[pp];
        }
      }
      return product;
    }

  };

},

dispatchProducts = function(err, products, callback) {
  process.nextTick(function() {
    callback(err, products);
  });
},

methods = {

  synthesize: function(polypeps, callback) {
    var product, products = [], err = null;


    if(polypeps instanceof Array) {
      polypeps = getAvailableCount(uniq(polypeps), polypeps);
    }

    while(product = search(polypeps)) {
      products.push(new product.constructor);
    }

    dispatchProducts(err, {products: products, remaining: polypeps}, callback);
  },

  define: function(product, polypeps) {
    var productId = def.products.length, pp;

    if(polypeps instanceof Array) {
      polypeps = getAvailableCount(uniq(polypeps), polypeps);
    }

    def.products[productId] = {
      constructor: product,
      polypeps: polypeps
    };

  }

};


module.exports = function() {
  this.prototype.protesynth_synthesize = methods.synthesize;
  this.prototype.protesynth_define = methods.define;
};