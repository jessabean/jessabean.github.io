'use strict()';

var projectList        = document.getElementById('selected-projects'),
    detailsView        = document.getElementById('project-details'),
    detailsClose       = detailsView.querySelector('.button--close'),
    previewImageView   = detailsView.querySelector('.project__image'),
    previewDescription = detailsView.querySelector('.project__description');

projectList.addEventListener('click', showDetails, false);
detailsClose.addEventListener('click', hideDetails, false);

function showDetails(e) {
  var project      = e.target.closest('li.project'),
      image        = project.querySelector('img'),
      src          = image.getAttribute('src'),
      content      = project.querySelector('.js-project__description').outerHTML,
      previewImage = document.createElement('img');

  e.preventDefault();

  previewImage.setAttribute('src', src);
  previewImageView.appendChild(previewImage);
  previewDescription.innerHTML = content;

  detailsView.classList.add('is-active');
};

function hideDetails(e) {
  detailsView.classList.remove('is-active');
  previewImageView.innerHTML = '';
  previewDescription.innerHTML = '';
}
