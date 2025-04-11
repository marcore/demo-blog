// add delayed functionality here

document.querySelectorAll('.dropdown-button').forEach((button) => {
  button.addEventListener('click', () => {
    const dropdown = button.parentElement;
    dropdown.classList.toggle('open');
  });
});

document.querySelectorAll('.filters-list li').forEach((item) => {
  item.addEventListener('click', (e) => {
    const dropdown = item.closest('.filters');
    const button = dropdown.querySelector('.dropdown-button');
    button.setAttribute('data-selected', e.target.textContent);
    dropdown.classList.remove('open');
  });
});
