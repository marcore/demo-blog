import { createElement } from '../../scripts/utils.js';

export default function decorate(block) {
  const wide = block.classList.contains('wide');
  const picture = block.querySelector('picture');
  picture.parentNode.classList.add('featured-card-image');
  const p = block.querySelector('p');
  p.parentNode.classList.add('featured-card-content');
  p.parentNode.querySelector('p').classList.add('featured-card-pretitle');
  if (wide) {
    const categoryDiv = createElement('div', { class: 'featured-card-category' });
    p.parentNode.prepend(categoryDiv);
  }
}
