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
const moreProjects = document.querySelector('#more-projects');
const moreProjectsButton = document.querySelector('#more-projects-button');
let activeGroup = 'all';
const expandedGroups = new Set();
const groupLabels = {
  ai: 'AI & vận hành',
  video: 'Video & sản xuất',
  visual: 'Nền tảng visual',
};

const renderProjects = () => {
  let hiddenCount = 0;
  projects.forEach((project) => {
    const matchesGroup = activeGroup === 'all' || project.dataset.group === activeGroup;
    const isExtra = project.dataset.extra === 'true';
    const isExpanded = expandedGroups.has(project.dataset.group);
    const visible = matchesGroup && (!isExtra || isExpanded);
    project.hidden = !visible;
    if (matchesGroup && isExtra && !isExpanded) hiddenCount += 1;
  });

  if (!moreProjects || !moreProjectsButton) return;
  moreProjects.hidden = hiddenCount === 0;
  if (hiddenCount === 0) return;
  moreProjectsButton.innerHTML = activeGroup === 'all'
    ? `Xem thêm ${hiddenCount} dự án <span>↓</span>`
    : `Xem thêm ${hiddenCount} dự án ${groupLabels[activeGroup]} <span>↓</span>`;
};

filters.forEach((button) => button.addEventListener('click', () => {
  activeGroup = button.dataset.filter;
  expandedGroups.clear();
  filters.forEach((item) => {
    item.classList.toggle('active', item === button);
    item.setAttribute('aria-selected', String(item === button));
  });
  renderProjects();
}));

moreProjectsButton?.addEventListener('click', () => {
  if (activeGroup === 'all') {
    projects.forEach((project) => expandedGroups.add(project.dataset.group));
  } else {
    expandedGroups.add(activeGroup);
  }
  renderProjects();
});

renderProjects();

// Thumbnail là một vùng bấm toàn phần; liên kết văn bản bên dưới luôn hiện trên cả touch lẫn desktop.
projects.forEach((project) => {
  const image = project.querySelector('.card-image');
  const action = project.querySelector('.card-action');
  if (image && action) {
    const actionLabel = action.textContent.trim().replace(/\s+/g, ' ');
    image.classList.add('is-interactive');
    image.setAttribute('role', 'link');
    image.setAttribute('tabindex', '0');
    image.setAttribute('aria-label', actionLabel);
    const activate = () => action.click();
    image.addEventListener('click', activate);
    image.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        activate();
      }
    });
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
