import {Match, Case, dispatchAction, jsx} from 'utils';

export const CLEAR_ALL = 'CLEAR_ALL';

const template = <button class="clear-all-btn" type="button">
  clear all
</button>;

const dispatchClearAll = dispatchAction.bind(null, {
  type: CLEAR_ALL
});

window.dispatchClearAll = dispatchClearAll;

function ClearAll(node, eventsBus) {
  template(node, eventsBus);

  const clearAllBtn = node.querySelector('.clear-all-btn');

  clearAllBtn.addEventListener('click', dispatchClearAll);

  return [];
}

export const component = <div className="clear-all">
  <Match>
    <Case predicate={({list}) => list.length > 0}>
      <ClearAll/>
    </Case>
  </Match>
</div>;
