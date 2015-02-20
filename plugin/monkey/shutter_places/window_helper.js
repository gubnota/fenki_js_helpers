/*
 Copyright 2014 Gubnota Tech (Shenzhen) Ltd, Art Well Enterprise (HK) Ltd.
 All rights reserved. Licensed under the Apache License, 
 Version 2.0 (the "License"); you may not use this file except in 
 compliance with the License. You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.

 Written by: Vladislav Muravyev
 Inspired by: Google inc. cookiechoices.js

 To Load button, call it like:

<script>(function(f,e,n,k,i){if(!e.getElementById('shutter_places_window_helper_script')){var n=e.createElement(n),y=e.getElementsByTagName(i)[0];n.setAttribute('id','shutter_places_window_helper_script');n.async=1;n.src=k;y.appendChild(n);if(typeof(IFrameWindowHelper) == 'undefined'){n.onload = function() {
ShutterPlacesWindowHelperScript.Button("Bing Translate","Collapse");}}}})(window,document,'script','//gubnota.github.io/fenki_js_helpers/plugin/monkey/shutter_places/window_helper.js','head');</script>

 Or:

<script src="//gubnota.github.io/fenki_js_helpers/plugin/monkey/shutter_places/window_helper.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', function(event) {
    ShutterPlacesWindowHelperScript.Button("Bing Translate","Collapse");
  });
</script>
*/

(function(window) {
if (window !== top) return;
  if (!!window.ShutterPlacesWindowHelperScript) {
    return window.ShutterPlacesWindowHelperScript;
  }

  var document = window.document;
  // IE8 does not support textContent, so we should fallback to innerText.
  var ShutterPlacesWindowHelperScript = (function() {
    var id = Math.ceil(Math.random()*1000);//уникальный id объекта
    var ShutterPlacesWindowHelperScriptId = 'ShutterPlacesInfo'+id;
    var TranslateIframeId = 'ShutterPlacesInfoIframe'+id;
    var dismissLinkId = 'ShutterPlacesDismiss'+id;
    var buttonId = 'translateButtonOpen'+id;
    var fl = 'zh-CHS';
    var tl = 'ru';
    var url = "//submit.shutterstock.com/show_component.mhtml";//"http://localhost/shutter_load/shutter_places/response.json";
    var closeText = 'Collapse';
    var buttonText = 'Places';
    function _createDialogElement(dismissText, linkHref) {
      var glassStyle = 'position:fixed;width:100%;height:100%;z-index:9999;' +
          'top:0;left:0;opacity:0.3;filter:alpha(opacity=30);' +
          'background-color:#000;';
      var dialogStyle = 'z-index:10000;position:fixed;top:0';
      var contentStyle = 'position:fixed;height:100%;width:100%;' +
          'background-color:#5B7F98;padding:10px 0;box-shadow:4px 4px 25px #888;font: 15px/17px "PT Sans",Arial;z-index: 10000;';
//border:5px solid #193441;
      var ShutterPlacesWindowHelperScriptElement = document.createElement('div');
      ShutterPlacesWindowHelperScriptElement.id = ShutterPlacesWindowHelperScriptId;

      var glassPanel = document.createElement('div');
      glassPanel.style.cssText = glassStyle;

      var content = document.createElement('div');
      content.style.cssText = contentStyle;

      var css = document.createElement('style');
      css.innerHTML = '#'+TranslateIframeId+' table{'+
['background:#fff6e9',
'width:100%',
'margin-bottom:50px',
'border-bottom:2px solid #bdb6ad',
'margin:10px 0'].join(';')+'}'+'#'+TranslateIframeId+' th{'+['display:table-cell',
'padding:2px 10px',
'border:solid #ece4d8',
'border-width:0 2px 2px 0',
'color:#cd596b',
'font-family:"Open Sans", Myriad, Calibri, sans-serif',
'font-weight:bold',
'font-size:.85em',
].join(';')+'}'+'#'+TranslateIframeId+' td{'+
['border-width:0 2px 0 0','border:solid #ece4d8','vertical-align:middle','text-align:center'].join(';')
+'}'+'#'+TranslateIframeId+' table:after{'+
['content:" "','display:block','width:100%','height:100px'].join(';')
+'}';

      var dialog = document.createElement('div');
      dialog.style.cssText = dialogStyle;
      dialog.id = 'translate';
      var dismissLink = _createDismissLink(dismissText||closeText);
      dismissLink.style.cssText = dismissLink.style.cssText+';display:block;background-color:#193441;'+
      'text-align:center;padding:4px;font:normal 15px/17px \'PT Sans\',Arial';

      content.appendChild(dismissLink);
      var frame = document.createElement('div');
      frame.id = TranslateIframeId;
      frame.style.cssText = "width:100%;height:100%;overflow-y:scroll;";
      content.appendChild(frame);
      dialog.appendChild(content);
      ShutterPlacesWindowHelperScriptElement.appendChild(glassPanel);
      ShutterPlacesWindowHelperScriptElement.appendChild(dialog);
      ShutterPlacesWindowHelperScriptElement.appendChild(css);
      return ShutterPlacesWindowHelperScriptElement;
    }

    function _setElementText(element, text) {
        element.innerHTML = text;
    }

    function _createDismissLink(dismissText) {
      var dismissLink = document.createElement('a');
      _setElementText(dismissLink, dismissText||closeText);
      dismissLink.id = dismissLinkId;
      dismissLink.href = '#';
      dismissLink.style.cssText = 'color:#fff;margin:4px 10px 10px;text-decoration:none;font:normal 15px/17px \'PT Sans\',Arial;';
      return dismissLink;
    }

    function _dismissLinkClick() {
      _close();
      return false;
    }

    function _showShutterPlacesWindowHelperScript(dismissText, linkHref) {
      var ShutterPlacesElement = document.getElementById(ShutterPlacesWindowHelperScriptId);
      if (ShutterPlacesElement != null) {
        ShutterPlacesElement.style.display = 'block';
      }
      else{
        var consentElement = 
            _createDialogElement(dismissText||closeText, linkHref||'/');
        var fragment = document.createDocumentFragment();
        fragment.appendChild(consentElement);
        document.body.appendChild(fragment.cloneNode(true));
        document.getElementById(dismissLinkId).onclick = _dismissLinkClick;
        }
    }

    function Bar(dismissText, linkHref) {
      _showShutterPlacesWindowHelperScript(dismissText, linkHref, false);
    }

    function Dialog(_buttonText,dismissText,_url) {
      Button(_buttonText||buttonText,dismissText||closeText,_url||url);
      _showShutterPlacesWindowHelperScript(dismissText||closeText, _url||url);
    ShutterPlacesWindowHelperScript.draw_table();
    ShutterPlacesWindowHelperScript.load_info(_url);
    }

    function _close() {
      var ShutterPlacesElement = document.getElementById(ShutterPlacesWindowHelperScriptId);
      if (ShutterPlacesElement != null) {
        ShutterPlacesElement.style.display = 'none';
      }
    }

    function _get_user_lang() {
      var match = document.cookie.match(new RegExp('lang=([^;]+)'));
      if (match && match[1] != undefined) return match[1].toString();
      return fl;
    }

    function Button(_buttonText,_closeText,_url){
      var ButtonElem = document.getElementById(buttonId);
      if (ButtonElem != null) {return;} // уже существует кнопка
      if (_closeText != undefined)
        closeText = _closeText;
      if (_buttonText != undefined)
        buttonText = _buttonText;
      if (_url != undefined)
        {url = _url;}
      else{
      var from_lang = _get_user_lang();
      if (from_lang == 'zh') from_lang = 'zh-CHS';
      (from_lang == tl) ? to_lang = 'zh-CHS' : to_lang = tl;
      // url = 'http://www.bing.com/translator/?from='+from_lang+'&to='+to_lang;
      }
      var el = document.createElement('div');

      var css = document.createElement('style');

      css.innerHTML = ['#'+buttonId+'{position:fixed',
      'padding:11px 16px 10px',
      'background:#5B7F98',
      'background: linear-gradient(to bottom, #949494 0, #6B6B6B 100%) repeat scroll 0 0 transparent;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#949494\', endColorstr=\'#6B6B6B\', GradientType=0)',
      'color:#fff',
      'font-size:14px',
      'font-weight:bold',
      'margin:0',
      'border-radius:0 0 5px 0',
      'left:0',
      'max-width:200px',
      'cursor: pointer',
      'font-family:Franklin Gothic Medium, FranklinGothicMedium, Arial, sans-serif',
      'border: 0',
      'top: 0',
      'top: 0',
      'z-index: 9999',
      'line-height: 19px',
      'height:19px',
      'overflow:hidden',
      'text-align:center'].join(';')+'}';
      css.innerHTML += '#'+buttonId+':hover{'+['background:#525252'].join(';')+'}'; 
      el.id = buttonId;
      el.innerHTML = buttonText;
      document.body.appendChild(css.cloneNode(true));
      // document.body.insertBefore(el.cloneNode(true),document.body.firstChild);
      document.body.appendChild(el.cloneNode(true));
      document.getElementById(buttonId).onclick = _buttonIdClick;
    }

    function _buttonIdClick(){
      Dialog(buttonText,closeText,url);
    }

function TranslatorInit(callback,args){
if (typeof Microsoft == 'undefined'){
if (typeof jQuery == 'undefined') {jQuery={browser:{msie:null}};}
else if (typeof jQuery.browser == 'undefined') {jQuery.browser={msie:null};}
(function(f,e,n,k,i){
if(!e.getElementById('trans_landing_script')){var n=e.createElement(n),y=e.getElementsByTagName(i)[0];n.setAttribute('id','trans_landing_script');n.async=1;n.src=k;y.appendChild(n);if(typeof(Microsoft) == 'undefined'){n.onload = function() {
Microsoft={Translator:{Configurations:{rttAppId:Microsoft.Translator.Configurations.rttAppId}}};e.getElementById('trans_landing_script').remove();
var id = Microsoft.Translator.Configurations.rttAppId;
// callback.call(this,id);
}}}})(window,document,'script','http://www.bing.com/translator/dynamic/js/LandingPage.js','head');
}
}

function _resolve_place(placespot,lon,lat,zoom){
//latitude,longtitude
if (zoom == undefined) zoom = '11';
jQuery.get( "http://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lon, function( data ) {
if (typeof data.results[0] !== 'undefined' && typeof data.results[0].formatted_address !== 'undefined') {var o = data.results[0].formatted_address;}
else if (typeof lat !== 'undefined') {var o = '@'+lat+","+lon;}
if (typeof o !== 'undefined') placespot.html(o); // add place name to place cell
}, "json");
}
function _draw_table(url){
  var t = jQuery('#'+TranslateIframeId+' table');
  if (typeof t.html() == 'undefined'){
      // console.log(document.getElementById(TranslateIframeId));
      // var t = document.createElement('table');
      // t.width = "100%";
      // t.height = "100%";
      // document.getElementById(TranslateIframeId).appendChild(t);
      jQuery('#'+TranslateIframeId).html('<table></table>');
      jQuery('#'+TranslateIframeId+' table').append('<tr>'+'<th>Thumb</th>'+'<th>Similar on Stock</th>'+'<th>Google images</th>'+'<th>Time</th>'+'<th>Place</th>'+'</tr>');
      }
  // jQuery('#'+TranslateIframeId+' table').append('<tr>'+'<td>thumb</td>'+'<td>Stock</td>'+'<td>Google</td>'+'<td>time</td>'+'<td>place</td>'+'</tr>');
}

function _load_info(url){
var t = jQuery('#'+TranslateIframeId+' table tr td');
if (t.length < 1){
jQuery.ajax({
url:url,
type:'POST',
data:{component_path: "download_map/recent_downloads.mh"},
success: function( data ) {
  for (var i = data.length - 1; i >= 0; i--) {//data.length - 1
if (jQuery('#'+TranslateIframeId+' table .'+data[i].media_id) == null) continue; // если уже есть такой id
var place = 'null';
if (data[i].longitude !== null && data[i].latitude !== null) {
  place = 'https://www.google.com/maps/@'+data[i].latitude+','+data[i].longitude+',11z';
  place = '<a href="'+place+'" target="_blank">Google map place</a>';
}
jQuery('#'+TranslateIframeId+' table').append('<tr class="'+data[i].media_id+'" style="max-height:40px;">'+'<td class="thumb" style="width:105px"><a href="http://www.shutterstock.com/pic-'+data[i].media_id+'/index.html" target="_blank"><img src="'+data[i].thumb_url+'"></a></td>'+'<td class="similar"><a href="http://www.shutterstock.com/similar-'+data[i].media_id+'/index.html" target="_blank">Stock</a></td>'+'<td class="google"><a href="https://www.google.com/searchbyimage?&amp;image_url='+window.encodeURI('http://thumb101.shutterstock.com/display_pic_with_logo/0/0/'+data[i].media_id+'.jpg')+'" target="_blank">Google</a></td>'+'<td class="time" style="max-width:80px">'+(new Date(data[i].time*1000))+'</td>'+'<td class="place" style="max-width:100px;">'+place+'</td>'+'</tr>');
ShutterPlacesWindowHelperScript.resolve_place(jQuery('#'+TranslateIframeId+' table .'+data[i].media_id+' .place a'), data[i].longitude, data[i].latitude, 11);
  };
},
cache:false,
crossDomain:true,
dataType:"json"});
          }
}


    var exports={Button:Button,Dialog:Dialog,TranslatorInit:TranslatorInit,'draw_table':_draw_table,'load_info':_load_info,'resolve_place':_resolve_place};
    exports.id = {'id':id,'ShutterPlacesWindowHelperScriptId':ShutterPlacesWindowHelperScriptId,'dismissLinkId':dismissLinkId,
'buttonId':buttonId,'fl':fl,'tl':tl,'url':url,'closeText':closeText,'buttonText':buttonText,};
    return exports;
  })();

  window.ShutterPlacesWindowHelperScript = ShutterPlacesWindowHelperScript;
  return ShutterPlacesWindowHelperScript;
})(this);
