'use strict';

function Horn(title, img, description, keyword, numberOfHorns) {
  this.title = title;
  this.img = img;
  this.description = description;
  this.keyword = keyword;
  this.numberOfHorns = numberOfHorns;
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


function renderPages (page){
 console.log('render Fired');
 $('#horns').text("");
  $.get(`data/page-${page}.json`).then(
    (data) => {
      // console.log('this is our data ', data);
      data.forEach(hornObj => {
        let horn = new Horn(hornObj.title, hornObj.image_url, hornObj.description, hornObj.keyword, hornObj.horns);
        horn.renderWithJquery();
      });
    }
  );
}
 renderPages(1);

$('#coupleHorns').on('change', function () {
  let $selected = $(this).val();
  $('div').hide();
  $(`div[class="${$selected}"]`).show();
});


//lab 03

$('#pages').on('click',function(event){
  console.log('pages function')
  // $('#horns').text('');
  renderPages(event.target.value);

})

