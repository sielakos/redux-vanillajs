import {setUpDomTesting} from 'dom-testing';
import {expect} from 'chai';
import sinon from 'sinon';
import {component, __set__, __ResetDependency__} from 'uploader/component';


describe('uploader/component', () => {
  let $FileReader;
  let node;
  let nameElement;
  let fileElement;
  const fileContent = 'file content';

  beforeEach(() => {
    node = setUpDomTesting();
    $FileReader = createFileReaderMock(fileContent);

    __set__('$FileReader', $FileReader);

    component(node);
    nameElement = node.querySelector('.upload-form-name');
    fileElement = node.querySelector('.upload-form-file');
  });

  afterEach(() => {
    __ResetDependency__('$FileReader');
  });

  it('should create file field', () => {
    expect(fileElement).to.exist;
    expect(fileElement).to.have.attr('type', 'file');
  });

  it('should have name field', () => {
    expect(nameElement).to.exist;
    expect(nameElement).to.have.attr('type', 'text');
  });

  describe('on submit', () => {
    const name = 'barbara';
    const ADD_DIAGRAM = 'ADD_DIAGRAM';
    let submitEvent;
    let dispatchAction;

    beforeEach(() => {
      submitEvent = new Event('submit');
      sinon.spy(submitEvent, 'preventDefault');

      nameElement.value = name;

      node.dispatchEvent(submitEvent);

      dispatchAction = sinon.spy();

      __set__('dispatchAction', dispatchAction);
      __set__('ADD_DIAGRAM', ADD_DIAGRAM);
    });

    afterEach(() => {
      __ResetDependency__('dispatchAction');
      __ResetDependency__('ADD_DIAGRAM');
    });

    it('should read file as text on submit event', () => {
      expect($FileReader.readAsText.calledOnce).to.eql(true);
    });

    it('should prevent default submit behavior', () => {
      expect(submitEvent.preventDefault.calledOnce).to.eql(true);
    });

    it('should dispatch ADD_DIAGRAM action when file is loaded', () => {
      $FileReader.instance.onload();

      expect(dispatchAction.calledOnce).to.eql(true);
      expect(dispatchAction.calledWith({
        type: ADD_DIAGRAM,
        name,
        diagram: fileContent
      }));
    });
  });

  function createFileReaderMock(result) {
    const $FileReader = function() {
      $FileReader.instance = this;
    };

    $FileReader.prototype = $FileReader;

    $FileReader.readAsText = sinon.spy();
    $FileReader.result = result;

    return $FileReader;
  }
});


