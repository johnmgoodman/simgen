var Simgen = function Simgen() {
  this.__modules = {};
  this.__entities = {};
};

Simgen.prototype.create = function(entityName,eData) {
  return new (this.__entities[entityName])(eData);
};

Simgen.prototype.module = function(moduleName, moduleInitializer) {
  this.__modules[moduleName] = moduleInitializer;
  return this;
};


Simgen.prototype.implement = function(moduleNames, entity) {
  var moduleNameIndex, moduleName,
    moduleNames = moduleNames.split(' ');
    moduleNameCount = moduleNames.length;

  for(moduleNameIndex = 0; moduleNameIndex < moduleNameCount; moduleNameIndex += 1) {
    moduleName = moduleNames[moduleNameIndex];
    this.__modules[moduleName].call(entity);
    entity.__simgen_modules = (entity.__simgen_modules || []).push(moduleName);
  }
};


Simgen.prototype.entity = function(name, modules, constructor) {
  if(typeof constructor === 'undefined') {
    this.__entities[name] = modules;
  } else {
    this.implement(modules, constructor);
    this.__entities[name] = constructor;
  }
  return this;
};

module.exports = new Simgen();