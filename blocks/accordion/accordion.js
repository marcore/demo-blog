import { createElement } from '../../scripts/utils.js';

function createAccordionItem(title, content) {
  const details = createElement('details', { class: 'accordion-item' });
  const summary = createElement('summary', { class: 'accordion-item-label' });
  summary.textContent = title;

  const body = createElement('div', { class: 'accordion-item-body' });
  body.appendChild(content);

  details.append(summary, body);
  return details;
}

function decorateAccordion(block) {
  [...block.children].forEach((row) => {
    const [label, body] = [...row.children];
    const accordion = createAccordionItem(
      label.textContent,
      body,
    );
    row.replaceWith(accordion);
  });
}

export default async function decorate(block) {
  decorateAccordion(block);
}
