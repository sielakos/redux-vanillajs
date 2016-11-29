import {setUpDomTesting} from 'dom-testing';
import {expect} from 'chai';
import sinon from 'sinon';
import {component, __set__, __ResetDependency__} from 'sidebar/randomGenerator/component';

describe('sidebar/randomGenerator/component', () => {
  let node;
  let allDiagrams;
  let dispatchAction;

  beforeEach(() => {
    allDiagrams = ['d1'];
    __set__('allDiagrams', allDiagrams);

    dispatchAction = sinon.spy();
    __set__('dispatchAction', dispatchAction);

    node = setUpDomTesting();
    component({createAddDiagramAction: (x) => x})(node);
  });

  afterEach(() => {
    __ResetDependency__('allDiagrams');
    __ResetDependency__('dispatchAction');
  });

  it('should contain "Add random diagram" text', () => {
    expect(node).to.contain.text('Add random diagram');
  });

  it('should dispatch action when button is clicked', () => {
    node.querySelector('button').click();

    expect(dispatchAction.calledOnce).to.eql(true);
    expect(dispatchAction.firstCall.args[0].diagram).to.eql(allDiagrams[0]);
  });
});
