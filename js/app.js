'use strict';

let forSort = [];
const hornTemplate = Handlebars.compile($('#horn-template').html());

function Horn(title, img, description, keyword, numberOfHorns) {
  this.title = title;
  this.image_url = img;
  this.description = description;
  this.keyword = keyword;
  this.numberOfHorns = numberOfHorns;
}

Horn.prototype.renderWithHandlebars = function(){
  const myHtml = hornTemplate(this);
  $('#horns').append(myHtml);
};

function renderWithJquery(arr) {
  $('#horns').text('');
  arr.forEach(arrItem => {
    $('#horns').append(`
    <div class=${arrItem.keyword}>
      <h2>${arrItem.title}</h2>
      <img src="${arrItem.image_url}"></img>
      <p>${arrItem.description}</p>
    </div>
    `);
  })
}

function getHornObjects(page) {
  $.get(`data/page-${page}.json`).then(
    (data) => {
      forSort = data;
      renderWithJquery(forSort);
    }
  );
}
getHornObjects(1);

$('#coupleHorns').on('change', function () {
  let $selected = $(this).val();
  $('div').hide();
  $(`div[class="${$selected}"]`).show();
});


//lab 03

$('#pages').on('click', function (event) {
  console.log('pages function')
  getHornObjects(event.target.value);
})

$('#sort-options').on('change', function(event) {
  if (event.target.value === 'number') {
    forSort.sort((a, b) => {
      if (a.horns > b.horns) {
        return 1;
      } else if (a.horns < b.horns) {
        return -1;
      } else {
        return 0;
      }
    });
    renderWithJquery(forSort);
  }
  if (event.target.value === 'title') {
    forSort.sort((a, b) => {
      if (a.title > b.title) {
        return 1;
      } else if (a.title < b.title) {
        return -1;
      } else {
        return 0;
      }
    });
    renderWithJquery(forSort);
  }
})
