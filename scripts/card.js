$(document).ready(function() {
    var calcTimer, sliderVznos;

    // let swiper = new Swiper('.apartment__swiper', {
    //     slidesPerView: 2,
    //     spaceBetween: 1
    // });
    
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
    
    $("#ipoteka_price_all").slider({
        range: 'min',
        value: 7040000,
        step: 30000,
        min: 1155000,
        max: 20405000,
        slide: function (event, ui) {

            $("#ipoteka_price_all_text").val(number_format(ui.value, 0, '', ' ') + ' руб.');
            $("#ipoteka_vznos").slider('option', 'max', ui.value);

            if ($("#ipoteka_vznos").slider('value') + 11000 > ui.value) {
                var newMin = parseInt(ui.value / 2);
                $("#ipoteka_vznos").slider('value', newMin);
                $('#ipoteka_vznos_text').val(number_format(newMin, 0, '', ' ') + ' руб.');
            }

            clearInterval(calcTimer);
            calcTimer = setTimeout('ipotekaCalc();', 0);
        }
    });

    sliderVznos = $("#ipoteka_vznos").slider({
        range: 'min',
        value: 3401666,
        step: 10000,
        min: 115500,
        max: 20395500,
        slide: function (event, ui) {
            $("#ipoteka_vznos_text").val(number_format(ui.value, 0, '', ' ') + ' руб.');
            clearInterval(calcTimer);
            calcTimer = setTimeout('ipotekaCalc();', 0);
        }
    });

    $("#ipoteka_srok").slider({
        range: 'min',
        value: 300,
        step: 12,
        min: 12,
        max: 360,
        slide: function (event, ui) {
            $("#ipoteka_srok_text").val(number_format(ui.value, 0, '', ' ') + ' мес.');
            clearInterval(calcTimer);
            calcTimer = setTimeout('ipotekaCalc();', 0);
        }
    });

    ipotekaCalc();
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

function number_format(number, decimals, dec_point, separator) {
    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof separator === 'undefined') ? ',' : separator,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return '' + (Math.round(n * k) / k)
                .toFixed(prec);
        };
    // Фиксим баг в IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
        .split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '')
        .length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1)
            .join('0');
    }
    return s.join(dec);
}

function ipotekaCalc() {
    var price_all = $("#ipoteka_price_all").slider('value');
    var vznos = $("#ipoteka_vznos").slider('value');
    var sum_kredit = price_all - vznos;
    var month = $("#ipoteka_srok").slider('value');
    var srok = month;
    var percent = Math.round(vznos * 100 / price_all);
    var all_sum = sum_kredit + (sum_kredit * 1105.98 / 100 * (month / 12));
    var platezh = all_sum / srok;
    $('#ipoteka_percent').val(percent + '%');

    $.each($('.calc-ipoteka__banks_item'), function (i, bank) {
        var show = true;
        if (srok < $(bank).data('srok-min') || srok > $(bank).data('srok-max')) {
            show = false;
        }

        if (percent < $(bank).data('vznos')) {
            show = false;
        }

        if (show) {
            $(bank).removeClass('disabled');

            var bankPlatezh = (sum_kredit + (sum_kredit * parseFloat($(bank).data('stavka')) / 100 * (month / 12))) / srok;
            $(bank).find('.calc-ipoteka__banks_item_platezh .value').html('<span>' + number_format(bankPlatezh, 0, '', ' ') + '</span>' + ' руб/мес')
        }
        else {
            $(bank).addClass('disabled')
        }
    });
}