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
    }
}); 

$(document).ready(function() {
    adaptiveHeaderNav();

    $(window).on('resize', adaptiveHeaderNav);

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

    Fancybox.bind("[data-fancybox]");
});

function adaptiveHeaderNav() {
    let windowWidth = $(window).width();

    $('.header__nav_hidden .header__nav__element').appendTo($('.header__nav'));

    do {
        let menuWidth = $('.header__burger-button').outerWidth()
            + $('.header__select-ap').outerWidth()
            + $('.header__menu').outerWidth()
            + 200
        ;

        if (menuWidth < windowWidth || !$('.header__nav').children().length) {
            return false;
        }

        $('.header__nav .header__nav__element:last-child').prependTo($('.header__nav_hidden')); 
    }
    while(true);
}

$(document).on('scroll', function() {
	if ($(window).scrollTop() >= 200) {
        $('.header__menu').removeClass('invisible');
	} else {
		$('.header__menu').addClass('invisible');
	}
});