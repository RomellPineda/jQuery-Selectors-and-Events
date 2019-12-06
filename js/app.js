'use strict';

const array = [];
const forSort = [];

function Horn(title, img, description, keyword, numberOfHorns) {
  this.title = title;
  this.img = img;
  this.description = description;
  this.keyword = keyword;
  this.numberOfHorns = numberOfHorns;
}

Horn.prototype.howManyHorns = function () {
  console.log(this.numberOfHorns);
  array.push(this.numberOfHorns);
}

Horn.prototype.renderWithJquery = function () {
  $('#horns').append(`
  <div class=${this.keyword}>
    <h2>${this.title}</h2>
    <img src="${this.img}"></img>
    <p>${this.description}</p>
  </div>
  `);
}

function getPagesData(page) {
  $.get(`data/page-${page}.json`).then(
    (data) => {
      data.forEach(hornObj => {
        array.push(hornObj);
      })
    }
  )
}

// array will have data for sorting


function renderPages(page) {
  $('#horns').text('');
  $.get(`data/page-${page}.json`).then(
    (data) => {
      data.forEach(hornObj => {
        let horn = new Horn(hornObj.title, hornObj.image_url, hornObj.description, hornObj.keyword, hornObj.horns);
        horn.renderWithJquery();
        forSort.push(hornObj);
        if (!array.includes(horn.numberOfHorns)) {
          array.push(horn.numberOfHorns);
        }
      });
    }
  );
  array.sort();
}
renderPages(1);

$('#coupleHorns').on('change', function () {
  let $selected = $(this).val();
  $('div').hide();
  $(`div[class="${$selected}"]`).show();
});


//lab 03

$('#pages').on('click', function (event) {
  console.log('pages function')
  renderPages(event.target.value);
})

$('#sort-options').on('change', function() {
  forSort.sort(function(a, b) {
    if (a.numberOfHorns > b.numberOfHorns) {
      return 1;
    } else if (b.numberOfHorns > a.numberOfHorns) {
      return -1;
    } else {
      return 0;
    }
  })
})

// console.log('is fort sort sorted?', forSort);
