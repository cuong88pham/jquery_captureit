(function($){

  var CaptureIt = {
    init: function(settings, callback){

      var mainContent = this.getMainContent(settings);
      this.setStyleMainContent(mainContent, settings);

      // Export to svg
      if(settings.export_svg){
        var svg_url = this.renderSvgToDataUri(mainContent);
        var filename = document.getElementsByTagName('title')[0].innerHTML;
        filename = filename.replace(/\s/g,'');
        this.saveToSVG(svg_url, filename+Date.now()+'.svg')
      }

      // Call Ajax
      if(settings.url != '' && settings.data.size > 0){
        this.callAjax(settings, callback);
      }

      return mainContent;
    },
    getMainContent: function(settings){
      // Get parent element from paragraph
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
      return main_div;
    },
    saveToSVG: function(uri, filename){
      var link = document.createElement('a');
      if (typeof link.download === 'string') {
          document.body.appendChild(link);
          link.download = filename;
          link.href = uri;
          link.click();
          document.body.removeChild(link);
      } else {
          location.replace(uri);
      }
    },
    renderSvgToDataUri: function(html_data){
      var svg = document.createElement('svg');
      var html_data = html_data.cloneNode(true);
      svg.appendChild(html_data);
      var svgData = new XMLSerializer().serializeToString(svg);
      var encode_base64_url = window.btoa(unescape(encodeURIComponent(svgData)));
      var img = document.createElement( "img" );
      img.src = "data:image/svg+xml;base64," + encode_base64_url;
      return img.src;
    },
    callAjax: function(settings, callback){
      $.ajax({
        url: settings.url,
        type: settings.ajax_type,
        data: settings.data,
        headers: settings.headers,
        success: function (data) {
          callback(data);
        }
      });
    },
    setStyleMainContent: function(element, settings){
      element.style.border = settings.border;
      element.style.background = settings.background;
      if(settings.overlay){
        element.style.zIndex= "99999";
        var overlay = document.createElement('div');
        overlay.style.background = 'black';
        overlay.style.zIndex= "0";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.position= 'fixed';
        overlay.style.opacity = '0.8';
        overlay.style.top = '0px';
        document.body.appendChild(overlay);
      }
    }
  }

  $.captureIt = function(options, callback){
    var settings = $.extend({
      border: '5px solid green',
      background: 'none',
      overlay: true,
      ignores: 'comment|sidebar|aside|footer/i',
      url: '',
      data: {},
      header: {},
      export_svg: false,
      ajax_type: 'post'
    }, options);

    CaptureIt.init(settings, callback);
  }
}(jQuery));