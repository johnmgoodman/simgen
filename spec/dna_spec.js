describe("DNA", function() {
  var DNA = require('../src/core/DNA');

  it("should be a function", function() {
    expect(DNA).toEqual(jasmine.any(Function));
  });

  it("should implement sequence setter/getter method", function() {
    expect(DNA.prototype.sequence).toEqual(jasmine.any(Function));
  });
});