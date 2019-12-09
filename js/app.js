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

function renderWithHandlebars(arr) {
  $('#horns').text('');
  arr.forEach(arrItem => {
    const createDiv = hornTemplate(arrItem);
    $('#horns').append(createDiv);
  })
}

function getHornObjects(page) {
  $.get(`data/page-${page}.json`).then(
    (data) => {
      forSort = data;
      renderWithHandlebars(forSort);
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
    renderWithHandlebars(forSort);
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
    renderWithHandlebars(forSort);
  }
})
