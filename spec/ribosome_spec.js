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

  it("should implement a translate method", function() {
    expect(Ribosome.prototype.translate).toEqual(jasmine.any(Function));
  });

  describe("translate method", function() {
    var RNA = require('../src/core/RNA'),
      Aminoid = require('../src/core/Aminoid'),
      ribo = new Ribosome(),
      normalSequence = [
        'CCC',
        'CCC',
        Ribosome.TRANSLATION_START_CODONS[0],
        'CCC',
        Ribosome.TRANSLATION_STOP_CODONS[0],
        'CCC',
        'CCC'
      ].join(''),
      peculiarSequence = [
        'CCC',
        Ribosome.TRANSLATION_STOP_CODONS[0],
        'CCC',
        Ribosome.TRANSLATION_START_CODONS[0], // polypep 0
        Ribosome.TRANSLATION_STOP_CODONS[0],
        Ribosome.TRANSLATION_START_CODONS[0], // polypep 1
        'CCC',
        Ribosome.TRANSLATION_STOP_CODONS[0],
        'CCC',
        Ribosome.TRANSLATION_START_CODONS[0], // polypep 2
        Ribosome.TRANSLATION_START_CODONS[0],
        'CCC',
        'CCC',
        Ribosome.TRANSLATION_STOP_CODONS[0],
        'CCC',
        Ribosome.TRANSLATION_START_CODONS[0], // polypep 3
        'CCC',
        Ribosome.TRANSLATION_START_CODONS[0],
        'CCC'
      ].join(''),
      ami1 = new Aminoid({
        label: 'c',
        anticodons: ['CCC']
      }),
      ami2 = new Aminoid({
        label: 'S',
        anticodons: [Ribosome.TRANSLATION_START_CODONS[0]]
      });

      ami1.anticodons('CCC');
      ami2.anticodons(Ribosome.TRANSLATION_START_CODONS[0]);

      it("should translate RNA into polypeptides (return and array of Aminoid label-strings)", function() {
        var rna = new RNA(normalSequence);

        expect(ribo.translate(rna)).toEqual(['Sc']);
      });

      it('should translate accurately', function() {
        var rna = new RNA(peculiarSequence);
        expect(ribo.translate(rna)).toEqual(['S', 'Sc','SScc','ScSc']);
      });

  });
});