import * as chai from 'chai';
import  { roundNumber } from './math-helper';

chai.should();

describe('Math Helper', () => {
  describe('roundNumber', () => {
    it('returns 0 when passed null', () => {
      roundNumber(null).should.equal(0);
    });

    it('returns 0 when passed 0', () => {
      roundNumber(0).should.equal(0);
    });

    it('rounds up to 1.56 when passed 1.55555 rounded to 2 digits', () => {
      roundNumber(1.55555, 2).should.equal(1.56);
    });

    it('rounds up to -1.56 when passed -1.55555 rounded to 2 digits', () => {
      roundNumber(-1.55555, 2).should.equal(-1.56);
    });
  });
});
