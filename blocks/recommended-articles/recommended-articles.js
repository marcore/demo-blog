import { createElement } from '../../scripts/utils.js';

export default function decorate(block) {
  let title=block.classList.contains('title');
  if (title){
    block.children[0].classList.add('title');
  }
  for (let i = 0; i < block.children.length; i++) {
    let article = block.children[i];
    if (!article.classList.contains('title')) {
      const numberDiv = createElement('h3', { class: 'article-box-number' });
      numberDiv.textContent = (title)?`${i}`:`${i+1}`;
      article.prepend(numberDiv);
    }
    let cat = article.querySelector('h6');
    if (cat) {
      cat.classList.add(cat.textContent.replace(/ /g, "-").toLowerCase());
      cat.textContent = '';
    }
    
  }
  block.querySelectorAll('a').forEach((link) => {
    link.classList.remove('button');
  });
    
}