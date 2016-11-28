import {connect} from 'utils/connect';
import sinon from 'sinon';
import {expect} from 'chai';


describe('connect', () => {
  let node;
  let childComponent;
  let childUpdate;
  let state;

  beforeEach(() => {
    childUpdate = sinon.stub().returnsArg(0);
    childComponent =  sinon.stub().returns(childUpdate);
    node = 'node';
    state = {
      a: 1
    };
  });

  describe('with getProperties function as first parameter', () => {
    let update;

    beforeEach(() => {
      const getProperties = ({a}) => a;

      update = connect(getProperties, childComponent)(node);
    });

    it('should pass node to child component', () => {
      expect(childComponent.calledWith(node)).to.eql(true);
    });

    it('should update child component with processed state', () => {
      update(state);

      expect(childUpdate.calledWith(state.a)).to.eql(true);
    });
  });

  describe('with property name as first parameter', () => {
    let update;

    beforeEach(() => {
      update = connect('a', childComponent)(node);
    });

    it('should pass node to child component', () => {
      expect(childComponent.calledWith(node)).to.eql(true);
    });

    it('should update child component with processed state', () => {
      update(state);

      expect(childUpdate.calledWith(state.a)).to.eql(true);
    });
  });
});
