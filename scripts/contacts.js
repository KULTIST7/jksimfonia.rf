$(document).ready(function() {
    setTimeout(adaptiveHeaderNav, 100);

    $(window).on('resize', adaptiveHeaderNav);

    Fancybox.bind("[data-fancybox]");

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

    $('.album__input_tel').inputmask({
        mask: '+7 (*{1}99) 999-99-99',
        placeholder: "+7 (___) ___-__-__",
        definitions: {
            '*': {
                validator: "[0-6,9]"
            }
        }
    });

    $('.up').on('click', () => {
        const body = $("html, body");
        body.animate({scrollTop:0}, 500, 'swing');
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

function adaptiveHeaderNav() {
    let windowWidth = $(window).width();

    $('.header__nav_hidden .header__nav__element').appendTo($('.header__nav'));
    $('.header__nav__more').removeClass('active');

    do {
        let menuWidth = $('.header__burger-button').outerWidth()
            + $('.header__logo').outerWidth()
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

