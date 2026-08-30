const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#nav');

menu?.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  menu.setAttribute('aria-expanded', String(open));
  menu.querySelector('span').textContent = open ? '−' : '+';
});

document.querySelectorAll('nav a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('is-open');
  menu?.setAttribute('aria-expanded', 'false');
  if (menu) menu.querySelector('span').textContent = '+';
}));

const filters = document.querySelectorAll('.filter');
const projects = document.querySelectorAll('.project-card');
filters.forEach((button) => button.addEventListener('click', () => {
  const group = button.dataset.filter;
  filters.forEach((item) => {
    item.classList.toggle('active', item === button);
    item.setAttribute('aria-selected', String(item === button));
  });
  projects.forEach((project) => {
    project.hidden = group !== 'all' && project.dataset.group !== group;
  });
}));

// Mỗi hành động thuộc về chính thumbnail của dự án: chỉ hiện khi hover/focus.
projects.forEach((project) => {
  const image = project.querySelector('.card-image');
  const action = project.querySelector('.card-action');
  if (image && action) {
    action.classList.add('thumbnail-action');
    image.append(action);
  }
});

document.querySelectorAll('[data-dialog]').forEach((trigger) => trigger.addEventListener('click', () => {
  document.getElementById(trigger.dataset.dialog)?.showModal();
}));

document.querySelectorAll('.close-dialog').forEach((button) => button.addEventListener('click', () => {
  button.closest('dialog')?.close();
}));

document.querySelectorAll('dialog').forEach((dialog) => dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
}));

document.querySelectorAll('[data-carousel]').forEach((button) => button.addEventListener('click', () => {
  const gallery = document.getElementById(button.dataset.carousel);
  const slides = [...gallery.querySelectorAll('.gallery-slide')];
  const current = slides.findIndex((slide) => slide.classList.contains('is-active'));
  const next = (current + Number(button.dataset.step) + slides.length) % slides.length;
  slides[current].classList.remove('is-active');
  slides[next].classList.add('is-active');
  gallery.parentElement.querySelector('[data-gallery-count]').textContent = `${next + 1} / ${slides.length}`;
}));
