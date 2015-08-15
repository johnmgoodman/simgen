module.exports = (function() {
  var methods = {

    sequence: function(sequence) {
      if(typeof sequence === "string") {
        this.__nucleicAcidSequence = sequence;
        return this;
      }
      return this.__nucleicAcidSequence;
    },

    mutations: {
      point: function(index, sequence) {
        var naseq = this.__nucleicAcidSequence;
        this.__nucleicAcidSequence = naseq.substr(0, index) + sequence + naseq.substr(index+sequence.length);
        return this;
      },

      insertion: function(index, sequence) {
        var naseq = this.__nucleicAcidSequence;
        this.__nucleicAcidSequence = naseq.substr(0, index) + sequence + naseq.substr(index);
        return this;
      },

      deletion: function(index, length) {
        var naseq = this.__nucleicAcidSequence;
        this.__nucleicAcidSequence = naseq.substr(0,index) + naseq.substr(index+length);
        return this;
      },

      duplication: function(index, length, count) {
        var naseq = this.__nucleicAcidSequence,
          dupCount = 1;

        this.__nucleicAcidSequence = naseq.substr(0,index);

        for(;dupCount <= count;dupCount += 1) {
          this.__nucleicAcidSequence += naseq.substr(index, length);
        }

        this.__nucleicAcidSequence += naseq.substr(index+length);
        return this;
      }
    },

    helpers: {
      random_sequence: function(length, nucleotides) {
        var nchar, i, seq = '';

        nucleotides = nucleotides || ['A','T','C','G'];

        length = length || 1000;

        nchar = nucleotides.length;
        i = 0;

        for(; i < length; i+=1 ) {
          seq += Math.floor(Math.random() * nchar);
        }

        nucleotides.forEach(function(n, i) {
          seq = seq.replace(new RegExp(i, 'g'), n);
        });

        this.sequence(seq);

        return this;
      }
    }

  };

  return function() {
    this.prototype.nucleic_acid_sequence = methods.sequence;
    this.prototype.nucleic_acid_point_mutation = methods.mutations.point;
    this.prototype.nucleic_acid_insertion_mutation = methods.mutations.insertion;
    this.prototype.nucleic_acid_deletion_mutation = methods.mutations.deletion;
    this.prototype.nucleic_acid_duplication_mutation = methods.mutations.duplication;

    this.prototype.nucleic_acid_random_sequence = methods.helpers.random_sequence;
  }
})();