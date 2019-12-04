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
  <div>
    <h2>${this.title}</h2>
    <img src="${this.img}"></img>
    <p>${this.description}</p>
  </div>
  `);
}

Horn.prototype.renderWithJqueryClone = function () {
  let clone = $('#horn-template').clone();

  clone.find('h2').text(this.title);
  clone.find('img').attr('src', this.img);
  clone.find('p').text(this.description);
  clone.find('h2').text(this.title);
  clone.find('h2').text(this.title);
  clone.removeAttr('id');
  console.log(clone);

  $('#horns').append(clone);
};

let UniWhal = new Horn('UniWhal', 'http://3.bp.blogspot.com/_DBYF1AdFaHw/TE-f0cDQ24I/AAAAAAAACZg/l-FdTZ6M7z8/s1600/Unicorn_and_Narwhal_by_dinglehopper.jpg', 'A unicorn and a narwhal nuzzling their horns', 'narwhal', 1);


UniWhal.renderWithJquery();

$.get('page-1.json').then(
  (data) => {
    console.log(data);
    data.forEach(hornObj => {
      let horn = new Horn(hornObj.title, hornObj.image_url, hornObj.description, hornObj.keyword, hornObj.horns);
      horn.renderWithJqueryClone();
    });
  }
);
