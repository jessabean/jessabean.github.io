'use strict()';

var projectList     = document.getElementById('selected-projects');
var detailsView     = document.getElementById('project-details');

projectList.addEventListener('click', showDetails, false);

function showDetails(e) {
  var target = event.target;
  var link    = event.target.closest('a.project__link');
  var project = event.target.closest('li.project');
  var image   = project.querySelector('img');
  var src     = image.getAttribute('src');
  var detail  = project.querySelector('.js-project__description');
  var content = detail.outerHTML;

  var previewImageView   = detailsView.querySelector('.project__image');
  var previewDescription = detailsView.querySelector('.project__description');

  e.preventDefault();

  this.previewImage = document.createElement('img');
  this.previewImage.setAttribute('src', src);

  previewImageView.appendChild(this.previewImage);
  previewDescription.innerHTML = content;

  detailsView.classList.add('is-active');
};
