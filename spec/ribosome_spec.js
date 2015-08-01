describe("Ribosome", function() {
  var Ribosome = require('../src/core/Ribosome');

  it("should be a function", function() {
    expect(Ribosome).toEqual(jasmine.any(Function));
  });

  it("should define start codons", function() {
    expect(Ribosome.TRANSLATION_START_CODONS).toEqual(jasmine.any(Array));
    expect(Ribosome.TRANSLATION_START_CODONS.length).not.toBe(0);
  });

  it("should define stop codons", function() {
    expect(Ribosome.TRANSLATION_STOP_CODONS).toEqual(jasmine.any(Array));
    expect(Ribosome.TRANSLATION_STOP_CODONS.length).not.toBe(0);
  });
});