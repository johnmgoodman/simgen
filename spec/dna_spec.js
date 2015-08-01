describe("DNA", function() {
  var DNA = require('../src/core/DNA');

  it("should be a function", function() {
    expect(DNA).toEqual(jasmine.any(Function));
  });

  it("should implement mutation prototype methods", function() {
    expect(DNA.prototype.point).toEqual(jasmine.any(Function));
    expect(DNA.prototype.insertion).toEqual(jasmine.any(Function));
    expect(DNA.prototype.deletion).toEqual(jasmine.any(Function));
    expect(DNA.prototype.duplication).toEqual(jasmine.any(Function));
    expect(DNA.prototype.translocation).toEqual(jasmine.any(Function));
  });

  it("should implement sequence setter/getter method", function() {
    expect(DNA.prototype.sequence).toEqual(jasmine.any(Function));
  });
});