/* eslint-disable import/prefer-default-export */
import { getMetadata } from './aem.js';

/**
 * Language
 */
function getCurrentLang() {
  return getMetadata('locale');
}

function getDefaultLang() {
  return 'en';
}



/**
 * Creates a new HTML element
 */
function createElement(tagName, attributes, ...children) {
  const el = document.createElement(tagName);
  if (attributes) {
    Object.keys(attributes).forEach((name) => {
      el.setAttribute(name, attributes[name]);
    });
  }
  children.forEach((child) => {
    if (typeof child === 'string') {
      el.appendChild(document.createTextNode(child));
    } else if (Array.isArray(child)) {
      child.forEach((c) => el.appendChild(c));
    } else if (child) {
      el.appendChild(child);
    }
  });
  return el;
}


/**
 * Retrieves tags from the page
 * @returns {Object} Object containing article metadata
 */
async function getPageTags() {
  const metadataTags = getMetadata('article:tag');
  const mapTag = async (tagName) => {
    const finalName = tagName.trim();
    const tag = await getTag(finalName);
    return {
      name: finalName,
      title: tag ? tag.title : '',
    };
  };
  const tags = await Promise.all(metadataTags.split(',').map(mapTag));
  return tags;
}

/**
 * Adds a horizontal divider line at the end of an element
 * @param {HTMLElement} element - The element to add the divider line to
 */
function addDividerLine(element) {
  const hr = createElement('hr');
  const divider = createElement('div', { class: 'block-divider-line' }, hr);
  element.appendChild(divider);
}

function parseTime(time) {
  if (!time) {
    return '';
  }
  const parts = time.split(':');
  if (parts.length !== 2) {
    return '';
  }
  const timeInMins = parseInt(parts[1], 10) > 30
    ? parseInt(parts[0], 10) + 1 : parseInt(parts[0], 10);
  let hours = 0;
  let mins = 0;

  if (timeInMins > 60) {
    hours = Math.floor(timeInMins / 60);
    mins = timeInMins - 60 * hours;
    return `${hours} hr ${mins} min`;
  }
  return `${timeInMins} min`;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return 'Invalid Date';
  }
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'short' });
  return `${day} ${month}`;
}


function formatToCentralTime(utcDateString) {
  const utcDate = new Date(utcDateString);
  const options = {
    timeZone: 'America/Chicago',
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  };
  const formatter = new Intl.DateTimeFormat('en-US', options);
  const parts = formatter.formatToParts(utcDate);
  const day = parts.find((p) => p.type === 'day').value;
  const month = parts.find((p) => p.type === 'month').value;
  const year = parts.find((p) => p.type === 'year').value;
  const hour = parts.find((p) => p.type === 'hour').value.padStart(2, '0');
  const minute = parts.find((p) => p.type === 'minute').value.padStart(2, '0');
  const period = parts.find((p) => p.type === 'dayPeriod').value.toUpperCase();
  return `${month} ${day}, ${year} ${hour}:${minute} ${period} CT`;
}

export {
  createElement,
  addDividerLine,
  parseTime,
  formatDate,
  getPageTags,
  formatToCentralTime,
};