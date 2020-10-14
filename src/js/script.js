//alert (1234);
$(document).ready(function(){
    $('.switching__img-wrapper').slick({
        speed: 2000,
        prevArrow: '<button type="button" class="slick-prev"><img src="img/4_switching/arrow_left.png" alt="left"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="img/4_switching/arrow_right.png" alt="right"></button>',
        responsive: [
            {
              breakpoint: 950,
              settings: {
                arrows:false,
                dots: true
              }
            }
          ]
    });
  });