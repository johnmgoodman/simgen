
var def = {

  proteins: [
    /*
     *  {
     *    proteinType: productConstructor,
     *    polypeps: {'polypep': 2, 'polypep': 1}
     *  },
     *
     */
  ]

},

/* Fisher-Yates shuffle
 * 
 * Thank you, Blender.
 * http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript
 * 
 */
shuffle = function(array) {
  var counter = array.length, temp, index;

  while (counter > 0) {
    index = Math.floor(Math.random() * counter);

    counter--;

    temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
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
  var proteinId,
    proteins = shuffle(def.proteins.slice(0)),
    
    polypepsAvailable = JSON.parse(JSON.stringify(polypeps)),
    
    products = [],
    
    
    eachProtein = function(protein, proteinId, proteins) {
      var reqPP, unmetReq = 0, cost = {};
      
      
      for(reqPP in protein.polypeps) {
        if(protein.polypeps.hasOwnProperty(reqPP)) {
          unmetReq += 1;
          if(polypepsAvailable.hasOwnProperty(reqPP) && polypepsAvailable[reqPP] >= protein.polypeps[reqPP]) {
            unmetReq -= 1;
          }
        }
      }
      
      if(unmetReq === 0) {
        for(reqPP in protein.polypeps) {
          if(protein.polypeps.hasOwnProperty(reqPP)) {
            cost[reqPP] = -1 * protein.polypeps[reqPP];
            polypepsAvailable[reqPP] -= protein[reqPP];
            products.push({proteinType: protein.proteinType, cost: cost});
          }
        }
      }
      
    };
    

  proteins.forEach(eachProtein);
  
  return products;

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

    products = search(polypeps);
    dispatchProducts(err, products, callback);
  },

  define: function(proteinType, polypeps) {
    var proteinId = def.proteins.length, pp;

    if(polypeps instanceof Array) {
      polypeps = getAvailableCount(uniq(polypeps), polypeps);
    }

    def.proteins[proteinId] = {
      proteinType: proteinType,
      polypeps: polypeps
    };

  }

};


module.exports = function() {
  this.prototype.protesynth_synthesize = methods.synthesize;
  this.prototype.protesynth_define = methods.define;
};
