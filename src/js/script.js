//alert (1234);
$(document).ready(function(){
    $('.switching__img-wrapper').slick({
        speed: 1000,
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

    $('ul.product__tabs').on('click', 'li:not(.product__tab_active)', function() {
        $(this)
          .addClass('product__tab_active').siblings().removeClass('product__tab_active')
          .closest('div.container').find('div.product__items').removeClass('product__items_active').eq($(this).index()).addClass('product__items_active');
    });

    $('.footer__maps').on('mousedown', function() {
        $('.footer__info').addClass('hide');
    });

    $('.footer__maps').on('mouseup', function() {
        setTimeout(() => {  
                $('.footer__info').removeClass('hide'); 
        }, 3000);
        
    });


    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.card-product__descr-wrapper').eq(i).toggleClass('card-product__descr-wrapper_active');
                //$('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });
    };

    toggleSlide('.card-product__link');
    toggleSlide('.card-product__link-back');
  });