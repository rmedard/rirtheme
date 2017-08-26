(function ($) {
    var isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    if (isMobile.any()) {
        $('nav#block-advertsprimarymenu > ul.nav-pills').removeClass('nav-justified').addClass('nav-mobile-primary');
        $('nav#block-advertssecondarymenu > ul.nav-pills').removeClass('nav-justified');
        $('nav#block-buyadvertssecondarymenu > ul.nav-pills').removeClass('nav-justified');
    }

    $('form#direct-access-form').addClass('form-inline');
    $('form#direct-access-form > button.form-submit').removeClass('btn-sm');
    $('button#edit-submit-agents').removeClass('btn-sm');
    $('section#block-directaccessblock').addClass('well well-sm');
    $('section#block-request-details-webform').addClass('well well-sm');

    $('select#edit-field-advert-district-target-id > option[value="All"]').text('- District -');
    $('select#edit-field-advert-type-value > option[value="All"]').text('- Advert Type -');
    $('select#edit-field-advert-bedrooms-value > option[value="All"]').text('- Rooms -');
    $('select#edit-field-advert-property-type-value > option[value="All"]').text('- Property type -');
    $('select#edit-field-price-in-rwf-value > option[value="All"]').text('- Price -');

    $('select#edit-field-advert-district-target-id > option').each(function () {
        if ($(this).attr('value') === '75' ||
            $(this).attr('value') === '76' ||
            $(this).attr('value') === '77' ||
            $(this).attr('value') === '78' ||
            $(this).attr('value') === '79') {
            $(this).attr('disabled', true);
        }
    });

    $('div.view-adverts > div.view-filters').addClass('well well-sm');
    $('form#views-exposed-form-adverts-page-search-adverts > div.form-inline > div.form-item > div.select-wrapper > select').addClass('input-sm');
    $('form#views-exposed-form-adverts-page-search-adverts > div.form-inline > div.form-item > div.input-group > input#edit-combine')
        .addClass('input-sm').attr("placeholder", "Search address: district, sector or village");
    $('form#views-exposed-form-adverts-page-search-adverts > div.form-inline > div.form-item > div.input-group > span.input-group-addon')
        .addClass('input-sm');

    $('div.form-type-fivestar > div.form-type-select > div').removeClass('select-wrapper');

    /*
     * URL.js docs => https://websanova.com/plugins/url
     */

    var decodedUri = decodeURIComponent(window.location.href);
    // var districtsStr = decodedUri.substring(decodedUri.indexOf('field_advert_district_target_id[]'), decodedUri.lastIndexOf('field_advert_district_target_id[]') + 37);
    // var districts = districtsStr.match(/(\d+)/g) === null ? 'any' : districtsStr.match(/(\d+)/g).join('-');

    // var advertType = url('2', decodedUri); //Get second path variable
    var propertyLocation = getParameterByName('combine');
    var advertType = getParameterByName('field_advert_type_value');
    // var rooms = getParameterByName('field_advert_bedrooms_value');
    var propertyType = getParameterByName('field_advert_property_type_value');
    // var price = getParameterByName('field_price_in_rwf_value');

    $('section#block-rirsearchsubscribeblock > div#search-subscribe-button-id > a')
        .attr('href', '/search-subscribe?advert='+ advertType +'&location='+ propertyLocation +'&property_type=' + propertyType);

    //Activate home link while on homepage
    if ($('nav#block-rir-main-menu > ul.nav > li:first-child > a').hasClass('is-active')) {
        $('nav#block-rir-main-menu > ul.nav > li:first-child').addClass('active');
    }
    //End

    $('div#edit-field-advert-advertiser-wrapper').append("<div><a href='/node/add/agent'>Can't find agent? Click here.</a></div>");
    var menuTab = $('nav#block-advertssecondarymenu > ul.nav > li');
    menuTab.each(function (index) {
        if ($.trim($("nav#block-advertssecondarymenu > ul.nav > li:nth-child(" + (index + 1) + ") > a > span.badge").text()) === '0'){
            $(this).hide();
        }
    });
}(jQuery));

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

