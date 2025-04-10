import { createElement } from '../../scripts/utils.js';

export default function decorate(block) {
  let wide=block.classList.contains('wide');
  let picture=block.querySelector('picture');
  picture.parentNode.classList.add('featured-card-image');
  let p=block.querySelector('p');
  p.parentNode.classList.add('featured-card-content');
  p.parentNode.querySelector('p').classList.add('featured-card-pretitle');
  if (wide) {
    const categoryDiv = createElement('div', { class: 'featured-card-category' });
    p.parentNode.prepend(categoryDiv);
  }
}
