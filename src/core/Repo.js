var Repo = function Repo(items) {
  this.__items = {/* "type": quantity */};

  if(typeof items !== 'undefined') {
    this.set(items);
  }
};

Repo.prototype.setItem = function(type, quanity) {
  this.__items[type] = quantity;
  return this;
};

Repo.prototype.applyItem = function(type, quantity) {
  if(this.__items.hasOwnProperty(type)) {
    this.__items[type] += quantity;
  } else {
    this.__items[type] = quantity;
  }
  return this;
};

Repo.prototype.apply = function(items, quantity) {
  var itemType;

  if(typeof quantity !== 'number') {
    for(itemType in items) {
      if(items.hasOwnProperty(itemType)) {
        this.applyItem(itemType, items[itemType]);
      }
    }
  } else {
    this.applyItem(items, quantity);
  }

  return this;
};

Repo.prototype.set = function(items, quantity) {
  if( typeof quantity !== 'number') {
    this.__items = JSON.parse(JSON.stringify(items));
  } else {
    this.setItem(items, quantity);
  }
  return this;
};

Repo.prototype.quantityOf = function(itemType) {
  return this.__items[itemType];
};

Repo.prototype.items = function() {
  return JSON.parse(JSON.stringify(this.__items));
};


module.exports = Repo;