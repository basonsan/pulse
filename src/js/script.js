//alert (1234);
$(document).ready(function(){
    //подключаем слайдер с товарами
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

    //функция для переключения табов с категориями товаров
    $('ul.product__tabs').on('click', 'li:not(.product__tab_active)', function() {
        $(this)
          .addClass('product__tab_active').siblings().removeClass('product__tab_active')
          .closest('div.container').find('div.product__items').removeClass('product__items_active').eq($(this).index()).addClass('product__items_active');
    });

    //обработка события нажатия на кнопку заказать звонок (заказать консультацию)
    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn();
    });

    //обработка события нажатия на кнопку купить
    $('.button_buy').each(function(i) {
        $(this).on('click', function() {
            $('.overlay, #order').fadeIn();
            $('#order .modal__descr').text($('.card-product__header').eq(i).text());
    })

    });

     //обработка события нажатия на кнопку закрыть модального окна
    $('.modal__close, .overlay').on('click', function() {
        $('.overlay').fadeOut();
    });

    hideInfo ('touchstart'); //функция для скрытия инфо при нажатии (на мобильных) на карту
    hideInfo ('mousedown'); //функция для скрытия инфо при нажатии (мышкой) на карту
    showInfo ('touchend'); //функция показать инфо когда отжали (на мобильных)
    showInfo ('mouseup'); //функция показать инфо когда отжали (мышкой)
    toggleSlide('.card-product__link'); //функция для кнопки подробнее на карточках товара
    toggleSlide('.card-product__link-back'); //функция для кнопки назад в карточках товара


    //Вспомогательные функции
    
    //функция скрывать инфо на карте после нажатия
    function hideInfo (enventInfo) {
        $('.footer__maps').on(enventInfo, function() {
            $('.footer__info').addClass('hide');
        });
    };

    //функция показывать инфо на карте после отжатия
    function showInfo (enventInfo) {
        $('.footer__maps').on(enventInfo, function() {
            setTimeout(() => {  
                    $('.footer__info').removeClass('hide'); 
            }, 3000);
            
        });
    };

    //функция для кнопки подробнее (и назад) в карточке товара
    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.card-product__descr-wrapper').eq(i).toggleClass('card-product__descr-wrapper_active');
                //$('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });
    };

  });