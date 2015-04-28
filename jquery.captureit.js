(function($){
  $.captureit = function(options){
    var settings = $.extend({
      border: '5px solid green',
      background: 'none',
      ignores: 'comment|sidebar|aside|footer/i',
      url: '',
      data: {},
      header: {},
      ajax_type: 'post'
    }, options);

    // Get page content via paragraph
    var divs = $('p').parent().parent();

    if(typeof divs[0] == "undefined" || divs[0].tagName.toLowerCase() == 'body'){
      divs = $('div')[0].getElementsByTagName('div');
    }

    var size = divs[0].innerHTML.length,
        main_div = divs[0],
        main_width_div = divs[0].offsetWidth;

    $.each(divs, function(i, div){
      var tagname = div.tagName.toLowerCase(),
          classname = div.className.toLowerCase(),
          idname    = div.id,
          str_disable   = classname+idname+tagname;

      if(str_disable.search(settings.ignores) == -1){
        if(div.innerText.trim().length > size && div.offsetWidth > 0){
          size = div.innerText.trim().length;
          main_div = div;
          main_width_div = div.offsetWidth;
        }
      }
    });

    main_div.style.border = settings.border;
    main_div.style.background = settings.background;

    // Call ajax
    if(settings.url != '' && settings.data.size != 0){
      $.ajax({
        url: settings.url,
        type: settings.ajax_type,
        data: settings.data,
        headers: settings.headers,
        success: function (data) {
          return {data: data, main_div: main_div};
        }
      });
    }
    return main_div;
  }
}(jQuery));