$(document).ready(function() {
    let rellax = new Rellax('.parallax');

    let swiper = new Swiper('.life__swiper', {
        slidesPerView: 2,
        spaceBetween: 10,
        centerInsufficientSlides: true,

        grid: {
            fill: 'row',
            rows: 2
        },

        breakpoints: {
            1279: {
                slidesPerView: 5,

                grid: {
                    fill: 'row',
                    rows: 2
                }
            },

            999: {
                slidesPerView: 4,

                grid: {
                    fill: 'row',
                    rows: 2
                }
            },

            749: {
                slidesPerView: 3,
                
                grid: {
                    fill: 'row',
                    rows: 2
                }
            }
        },

        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },

        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        }
    }); 

    setTimeout(screenTitle, 150);
    setTimeout(adaptiveHeaderNav, 150);

    $(window).on('resize', screenTitle);

    $(window).on('resize', adaptiveHeaderNav);

    $('.up').on('click', () => {
        const body = $("html, body");
        body.animate({scrollTop:0}, 500, 'swing');
    });

    $('.page-nav').onePageNav({
        currentClass: 'page-nav__link_selected',
        scrollSpeed: 750,
        scrollThreshold: 0.5,
        easing: 'swing'
    });

    $('.album__input_tel').inputmask({
        mask: '+7 (*{1}99) 999-99-99',
        placeholder: "+7 (___) ___-__-__",
        definitions: {
            '*': {
                validator: "[0-6,9]"
            }
        }
    });

    $('.header__burger-button').on('click', () => {
        $('.burger').addClass('burger-open');
        $('body').addClass('body-noscroll');
    });

    $('.burger__close-button').on('click', () => {
        $('.burger').removeClass('burger-open');
        $('body').removeClass('body-noscroll');
    });

    $('.burger__space').on('click', () => {
        $('.burger').removeClass('burger-open');
        $('body').removeClass('body-noscroll');
    });

    $('.header__nav__more').on('mouseover', () => {
        $('.header__nav_hidden').css('opacity', 1);
        $('.header__nav_hidden').css('pointer-events', 'all');

        setInterval(off, 3000);

        function off() {
            $('.header__nav_hidden').hover(() => {}, () => {
                $('.header__nav_hidden').css('opacity', 0);
                $('.header__nav_hidden').css('pointer-events', 'none');
            });
        }
    });

    Fancybox.bind("[data-fancybox]");

    $(document).on('scroll', function() {
        if ($(window).scrollTop() >= 200) {
            $('.header__menu').removeClass('invisible');
            $('.header__nav__more-box').removeClass('invisible');
        } else {
            $('.header__menu').addClass('invisible');
            $('.header__nav__more-box').addClass('invisible');
        }
    });

    $(document).on('scroll', function() {
        if ($(window).scrollTop() >= 800) {
            $('.up').removeClass('up-invisible');
            $('.up').removeClass('up-invisible');
        } else {
            $('.up').addClass('up-invisible');
            $('.up').addClass('up-invisible');
        }
    });
});

function screenTitle() {
    if ($(window).width() < 750) {
        $('.screen__title').html('ЖК Симфония - гармония<br>ваших будней');
    } else {
        $('.screen__title').html('Жилой комплекс «Симфония»<span>— гармония внутри, гармония снаружи</span>');
    }
}

function adaptiveHeaderNav() {
    let windowWidth = $(window).width();

    $('.header__nav_hidden .header__nav__element').appendTo($('.header__nav'));
    $('.header__nav__more').removeClass('active');

    do {
        let menuWidth = $('.header__burger-button').outerWidth()
            + $('.header__button').outerWidth()
            + $('.header__menu').outerWidth()
            + 200
        ;

        if (menuWidth < windowWidth || !$('.header__nav').children().length) {
            return false;
        }

        $('.header__nav .header__nav__element:last-child').prependTo($('.header__nav_hidden')); 
        $('.header__nav__more').addClass('active');
    }
    while(true);
}

