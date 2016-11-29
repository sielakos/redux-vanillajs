import {attribute} from './attribute';
import {connect} from './connect';
import {setInputValue} from './setInputValue';

export function inputField(getValue) {
  return attribute(
    connect(getValue, (node) => {
      return setInputValue.bind(null, node);
    })
  );
}
