(function($){
  $.captureit = function(options){
    var settings = $.extend({
      border: '5px solid green',
      background: 'none',
      ignore: ['comment']
    }, options);
    var divs = $('p').parent().parent(),
        size = divs[0].innerHTML.length,
        main_div = divs[0];
    $.each(divs, function(i, div){
      if(div.innerHTML.trim().length > size){
        size = div.innerHTML.trim().length
        main_div = div;
      }
    });

    main_div.style.border = settings.border;
    main_div.style.background = settings.background;
    return main_div;
  }
}(jQuery));