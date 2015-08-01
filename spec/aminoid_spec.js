describe("Aminoid", function() {
  var Aminoid = require('../src/core/Aminoid');

  it("should be a function", function() {
    expect(Aminoid).toEqual(jasmine.any(Function));
  });

  it('should implement a label getter/setter method', function() {
    expect(Aminoid.prototype.label).toEqual(jasmine.any(Function));
  });

  it("should implement an anticodons setter/getter method", function() {
    expect(Aminoid.prototype.anticodons).toEqual(jasmine.any(Function));
  });

  describe("anticodons method", function() {
    var ami = new Aminoid('r');

    ami.anticodons(['CTT','TGA']);

    it("should return an array of anticodons when no arguments given", function() {
      expect(ami.anticodons()).toEqual(['CTT','TGA']);
    });

  });
});