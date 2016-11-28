import chaiDom from 'chai-dom';
import chai from 'chai';

chai.use(chaiDom);

const html = `
  <div id="dom-testing-target"></div>
`;

export function setUpDomTesting() {
  document.body.innerHTML = html;

  return document.getElementById('dom-testing-target');
}
