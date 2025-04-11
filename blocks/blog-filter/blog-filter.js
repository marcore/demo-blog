import { createElement } from '../../scripts/utils.js';

export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  block.children[0].children[0].classList.add('title');
  const filterSection = block.children[0].children[1];
  filterSection.classList.add('filters');
  filterSection.prepend(createElement('button', { class: 'dropdown-button', 'data-selected': 'Blog Home' }));
  filterSection.querySelector('ul')?.classList.add('filters-list');
}
