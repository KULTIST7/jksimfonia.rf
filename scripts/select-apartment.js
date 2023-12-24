$(document).ready(function() {
    setTimeout(adaptiveHeaderNav, 100);

    $(window).on('resize', adaptiveHeaderNav);

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

