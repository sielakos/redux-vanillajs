import {get} from 'utils';
import {expect} from 'chai';

describe('get', () => {
  it('should get property of object', () => {
    const object = {
      a: 1
    };

    expect(get('a', object)).to.equal(1);
  });
});
