import sinon from 'sinon';
import {expect} from 'chai';
import * as dispatchActionModule from '../../app/utils/dispatchAction';

const {dispatchAction} = dispatchActionModule;

describe('dispatchAction', () => {
  const ACTION_EVENT_NAME = 'ACTION_EVENT_NAME';
  let $document;

  beforeEach(() => {
    $document =  {
      dispatchEvent: sinon.spy()
    };

    dispatchActionModule.__set__('ACTION_EVENT_NAME', ACTION_EVENT_NAME);
    dispatchActionModule.__set__('$document', $document);
  });

  afterEach(() => {
    dispatchActionModule.__ResetDependency__('ACTION_EVENT_NAME');
    dispatchActionModule.__ResetDependency__('$document');
  });

  it('should dispatch event with reduxAction property', () => {
    const action = {};

    dispatchAction(action);

    expect($document.dispatchEvent.calledOnce).to.eql(true);
    expect($document.dispatchEvent.firstCall.args[0].reduxAction).to.equal(action);
  });
});
