import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';
import { createElement } from '../../scripts/utils.js';



/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragments
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  block.textContent = '';
 
  
  block.append(fragment);
  const logo = fragment.querySelector('picture');
  if (logo) {
    const logoWrapper = createElement('div', { class: 'footer-logo' });
    logoWrapper.append(logo);
    block.querySelector('.footer-links-wrapper')?.prepend(logoWrapper);
  }
   //unwrap main
   const main = block.querySelector('main');
   main.replaceWith(...main.childNodes);

  const footerLegalFragment = block.querySelector('.footer-legal-wrapper');
  if (footerLegalFragment) {
    let picture = footerLegalFragment.querySelector('picture');
    const iconsWrapper = createElement('div', { class: 'footer-legal-icons' });
    const pictureWrapper = createElement('div', { class: 'footer-legal-logo' });
    pictureWrapper.appendChild(picture);
    iconsWrapper.appendChild(pictureWrapper);
    const socialLinks =createElement('ul', { class: 'footer-legal--social-networks' });
    
    footerLegalFragment.querySelectorAll('a').forEach((link) => {
      const linkItem = createElement('li');
      link.textContent = '';
      const imgIconSrc = '/icons/'+link.attributes.title.value.toLowerCase()+'.svg';
      const icon = createElement('img', { title:  link.attributes.title.value, src:imgIconSrc });
      link.appendChild(icon);
      linkItem.appendChild(link);
      socialLinks.appendChild(linkItem);
    });
    iconsWrapper.appendChild(socialLinks);
    footerLegalFragment.prepend(iconsWrapper);
  }
  block.parentNode.append(footerLegalFragment);

  //footer line
  const footerLine =createElement('div', { class: 'footer-line' });
  block.parentNode.prepend(footerLine);
}
