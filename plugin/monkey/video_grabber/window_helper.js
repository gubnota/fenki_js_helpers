  (function(window) {
  if (window !== top) return;
  if ( !! window.VideoGrabberWindowHelperScript) {
      return window.VideoGrabberWindowHelperScript;
  }

  var document = window.document;
  // IE8 does not support textContent, so we should fallback to innerText.
  var VideoGrabberWindowHelperScript = (function() {
      var id = Math.ceil(Math.random() * 1000); //уникальный id объекта
      var VideoGrabberWindowHelperScriptId = 'VideoGrabberInfo' + id;
      var VideoGrabberIframeId = 'VideoGrabberInfoIframe' + id;
      var dismissLinkId = 'VideoGrabberDismiss' + id;
      var buttonId = 'VideoGrabberButtonOpen' + id;
      var lang = 'en'; var url='';
      var keys = ['buttonText','closeText','nameText','linkText','altText','titleText'];
      var dic = 
      {'en':['Videos','Collapse','Name','Download video','Alternative name', 'Title']};
      var param = {buttonText:dic['en'][0], closeText:dic['en'][1], url:url};
      function _sort(stock){
          for (var i = 1; i<stock.length; i++){
              if (stock[i].time < stock[i-1].time) {
                  var new_stock = stock[i];
                  stock[i] = stock[i-1];
                  stock[i-1] = new_stock;
              }
          }
          return stock;
      }
      function _createDialogElement(dismissText, linkHref) {
          var glassStyle = 'position:fixed;width:100%;height:100%;z-index:9999;' +
              'top:0;left:0;opacity:0.3;filter:alpha(opacity=30);' +
              'background-color:#000;';
          var dialogStyle = 'z-index:10000;position:fixed;top:0';
          var contentStyle = 'position:fixed;height:100%;width:100%;' +
              'background-color:#fff6e9;padding:10px 0;box-shadow:4px 4px 25px #888;font: 15px/17px "PT Sans",Arial;z-index: 10000;';
          var VideoGrabberWindowHelperScriptElement = document.createElement('div');
          VideoGrabberWindowHelperScriptElement.id = VideoGrabberWindowHelperScriptId;

          var glassPanel = document.createElement('div');
          glassPanel.style.cssText = glassStyle;

          var content = document.createElement('div');
          content.style.cssText = contentStyle;

          var css = document.createElement('style');
          css.innerHTML = '#' + VideoGrabberIframeId + ' table{' + ['background:#fff6e9',
              'width:100%',
              'margin-bottom:50px',
              'border-bottom:2px solid #bdb6ad',
              'margin:10px 0'
          ].join(';') + '}' + '#' + VideoGrabberIframeId + ' th{' + ['display:table-cell',
              'padding:2px 10px',
              'border:solid #ece4d8',
              'border-width:0 2px 2px 0',
              'color:#cd596b',
              'font-family:"Open Sans",Myriad,Calibri,sans-serif',
              'font-weight:bold',
              'font-size:.85em',
          ].join(';') + '}' + '#' + VideoGrabberIframeId + ' td{' + ['border-width:0 2px 0 0', 'border:solid #ece4d8', 'vertical-align:middle', 'text-align:center'].join(';') + '}' + '#' + VideoGrabberIframeId + ' table:after{' + ['content:" "', 'display:block', 'width:100%', 'height:100px'].join(';') + '}' + '#' + VideoGrabberIframeId + ' td.thumb img{' + ['min-width:50px', 'min-height:50px', 'max-width:100px'].join(';') + '}';
          var dialog = document.createElement('div');
          dialog.style.cssText = dialogStyle;
          dialog.id = VideoGrabberWindowHelperScriptId+'dialog';
          var dismissLink = _createDismissLink(dismissText || param.closeText);
          dismissLink.style.cssText = dismissLink.style.cssText + ';display:block;background-color:#193441;' +
              'text-align:center;padding:4px;font:normal 15px/17px \'PT Sans\',Arial';

          content.appendChild(dismissLink);
          var frame = document.createElement('div');
          frame.id = VideoGrabberIframeId;
          frame.style.cssText = "width:100%;height:100%;overflow-y:scroll;";
          content.appendChild(frame);
          dialog.appendChild(content);
          VideoGrabberWindowHelperScriptElement.appendChild(glassPanel);
          VideoGrabberWindowHelperScriptElement.appendChild(dialog);
          VideoGrabberWindowHelperScriptElement.appendChild(css);
          return VideoGrabberWindowHelperScriptElement;
      }

      function _setElementText(element, text) {
          element.innerHTML = text;
      }

      function _createDismissLink(dismissText) {
          var dismissLink = document.createElement('a');
          _setElementText(dismissLink, dismissText || param.closeText);
          dismissLink.id = dismissLinkId;
          dismissLink.href = '#';
          dismissLink.style.cssText = 'color:#fff;margin:4px 10px 10px;text-decoration:none;font:normal 15px/17px \'PT Sans\',Arial;';
          return dismissLink;
      }
      function OpenInNewTab(url) {
        var win = window.open(url, '_blank');
        win.focus();
      }

      function _dismissLinkClick() {
          _close();
          return false;
      }


      function _showVideoGrabberWindowHelperScript(dismissText, linkHref) {
    var VideoGrabberElement = document.getElementById(VideoGrabberWindowHelperScriptId);
    if (VideoGrabberElement != null) {
      VideoGrabberElement.style.display = 'block';
    }
    else{


              var consentElement =
                  _createDialogElement(dismissText || param.closeText, linkHref || '/');
              var fragment = document.createDocumentFragment();
              fragment.appendChild(consentElement);
              document.body.appendChild(fragment.cloneNode(true));
              document.getElementById(dismissLinkId).onclick = _dismissLinkClick;
        }
      }


      function Dialog(_buttonText, dismissText, _url) {
          Button(_buttonText || param.buttonText, dismissText || param.closeText, _url || url);
          _showVideoGrabberWindowHelperScript(dismissText || param.closeText, _url || url);
          VideoGrabberWindowHelperScript.draw_table();
          VideoGrabberWindowHelperScript.load_info(param.url);
      }

      function _close() {
          var VideoGrabberElement = document.getElementById(VideoGrabberWindowHelperScriptId);
          if (VideoGrabberElement !== null) {
              VideoGrabberElement.style.display = 'none';
          }
      }

      function _get_user_lang() {
          var match = document.cookie.match(new RegExp('lang=([^;]+)')); ///ru/g.test(window.navigator.language)
          if (match && match[1] !== undefined) return match[1].toString();
          if (typeof window.navigator.languages[0] !== 'undefined')
            return window.navigator.languages[0].substring(0,2).toLowerCase();
          return lang;
      }
      function _select_and_copy(el){
        const el2 = document.createElement('textarea');
        el2.value = el.innerText;
        document.body.appendChild(el2);
        el2.select();
        document.execCommand('copy');
        document.body.removeChild(el2);
var range = document.createRange();
range.selectNode(el);
window.getSelection().removeAllRanges();
window.getSelection().addRange(range);
      }
      function Button(_param) {
        if (typeof _param === 'string') url = _param;
        for (var i in _param) { param[i] = _param[i]; }
          var ButtonElem = document.getElementById(buttonId);
          if (ButtonElem !== null) {
              return;
          }
        var lang = _get_user_lang();
          if (_param !== undefined) {
              url = _param.url||url;
          }
              for (var i in keys) {
                if (dic[lang][i] !== undefined && _param === undefined || _param[keys[i]] === undefined){
                  param[keys[i]] = dic[lang][i];
                }
              };
          var el = document.createElement('div');

          var css = document.createElement('style');
          css.innerHTML = ['#' + buttonId + '{position:fixed',
              'padding:11px 11px 22px',
              'background:#c33',
              'color:#fff',
              'font-size:14px',
              'font-weight:800',
              'margin:0',
              'border-radius:3px',
              'right:-22px',
              'max-width:200px',
              'cursor: pointer',
              'font-family:PT Sans,Helvetica Neue,Helvetica,Arial,sans-serif',
              'top:65px',
              'z-index:9999',
              'line-height:11px',
              'height:15px',
              'transform:rotate(-90deg)',
              'text-transform:uppercase',
              'overflow:hidden',
              'text-align:center'
          ].join(';') + '}';
          css.innerHTML += '#' + buttonId + ':hover{' + ['right:-21px','background:#df3b3b','box-shadow:0 2px 4px 0 rgba(71,0,0,.31)'].join(';') + '}';
          el.id = buttonId;
          el.innerHTML = param.buttonText;
          document.body.appendChild(css.cloneNode(true));
          document.body.appendChild(el.cloneNode(true));
          document.getElementById(buttonId).onclick = _buttonIdClick;
      }

      function _buttonIdClick() {
          Dialog(param.buttonText, param.closeText, url);
      }


      function _draw_table(url) {
          var t = document.getElementById(VideoGrabberIframeId);//jQuery('#' + VideoGrabberIframeId + ' table');
          if (t.innerHTML.length>0) {t.innerHTML='';}
              var b = document.createElement('table');
              b.width = "100%";
              b.height = "100%";
              var h = document.createElement('tr');
              h.innerHTML = '<th>'+param.nameText+'</th>' + '<th>'+param.altText+'</th>'+ '<th>'+param.titleText+'</th>' + '<th>'+param.linkText+'</th>';
              b.appendChild(h);
              t.appendChild(b);
      }

      function _parse_video_src(src){
          var p = document.getElementsByTagName('h1')[0]||document.createElement('h1');
          var globalName = p.innerHTML||new Date();
          var host = document.location.host;
                                      var d = src.lastIndexOf('/');
                                      var name = src.substr(d+1);
                                      if (name.length<1) name = new Date();
                                      var date = new Date();
                                      var titleName = host; var altName = new Date().getTime();
                                      if (globalName.length>0) {titleName = globalName + ' - ' + host;}
                                      else {titleName = new Date() + ' - ' + host;}
                                      //altName forms with a part before the last dash '-'
                                      var p = src.substr(0,d).lastIndexOf('/');
                                      var j = src.substring(p+1,d);
                                      if (j.length>0) altName = j;
                                      return {altName:altName,globalName:globalName,name:name,src:src,titleName:titleName};
      }
      function _insert_video_result(src){
          var t = document.getElementById(VideoGrabberIframeId).children;
          if (t.length > 0) {
              var t = t[0];
              var o = _parse_video_src(src);
              var h = document.createElement('tr');
              h.innerHTML = '<td onClick="VideoGrabberWindowHelperScript.select_and_copy(this);">'+o.name+'</td>' + '<td onClick="VideoGrabberWindowHelperScript.select_and_copy(this);">'+o.altName+'</td>' + '<td onClick="VideoGrabberWindowHelperScript.select_and_copy(this);">'+o.titleName+'</td>' + '<td><a href="'+o.src+'" target="_blank">Download video</a></td>';
              t.appendChild(h);                                                    
          }
      }
      function _process_all_videos_in_window(el){
          var iframe = false;
          if (el.contentDocument !== undefined) iframe = true;
          if (iframe){
          var list =  el.contentDocument.getElementsByTagName('video');
          }
          else {var list = el.getElementsByTagName('video');}
          if (!iframe) {var host = el.location.host;} else {var host = el.contentDocument.location.host;}
          for (let vi of list) {
              if (vi.src.search(';base64,')>0) continue;
              if (vi.src.length==0){
              var ss = vi.getElementsByTagName('source');
                  for (let sr of ss) {
                      if (sr.src.length>0){
                       _insert_video_result(sr.src);
                      }
                  }
              }
              else{_insert_video_result(vi.src);}
          };
      }

      function _load_info(url) {
          var el = document;
          _process_all_videos_in_window(el);
          var list = document.getElementsByTagName('iframe');
           for (let el of list) {
              _process_all_videos_in_window(el);
                  var list2 = el.contentDocument.getElementsByTagName('iframe');//iframes within iframes  
                   for (let el2 of list2) {
                      _process_all_videos_in_window(el2);
                  }
           }
                  
      }


      var exports = {
          Button: Button,
          Dialog: Dialog,
          'draw_table': _draw_table,
          'load_info': _load_info,
          'select_and_copy':_select_and_copy
      };
      exports.id = {
          'id': id,
          'VideoGrabberWindowHelperScriptId': VideoGrabberWindowHelperScriptId,
          'dismissLinkId': dismissLinkId,
          'buttonId': buttonId,
          'lang': lang,
          'url': url,
          'dic': dic,
          'keys': keys,
          param: param
      };
      return exports;
  })();

  window.VideoGrabberWindowHelperScript = VideoGrabberWindowHelperScript;
  return VideoGrabberWindowHelperScript;
})(this);