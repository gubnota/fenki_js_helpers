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
ShutterPlacesWindowHelperScript.Button("Bing Translate","Collapse");}}}})(window,document,'script','http://gubnota.github.io/fenki_js_helpers/plugin/monkey/shutter_places/window_helper.js','head');</script>

 Or:

<script src="http://gubnota.github.io/fenki_js_helpers/plugin/monkey/shutter_places/window_helper.js"></script>
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
    var ShutterPlacesWindowHelperScriptId = 'translateChoiceInfo'+id;
    var TranslateIframeId = 'translateChoiceInfoIframe'+id;
    var dismissLinkId = 'translateChoiceDismiss'+id;
    var buttonId = 'translateButtonOpen'+id;
    var fl = 'zh-CHS';
    var tl = 'ru';
    var url = 'http://www.bing.com/translator/?from='+fl+'&to='+tl;
    var closeText = 'Close';
    var buttonText = 'Translate';
    function _createDialogElement(dismissText, linkHref) {
      var glassStyle = 'position:fixed;width:100%;height:100%;z-index:999;' +
          'top:0;left:0;opacity:0.3;filter:alpha(opacity=30);' +
          'background-color:#000;';
      var dialogStyle = 'z-index:1000;position:fixed;top:0';
      var contentStyle = 'position:fixed;height:100%;width:100%;' +
          'background-color:#4a9cbc;padding:10px 0;box-shadow:4px 4px 25px #888;font: 15px/17px "PT Sans",Arial;';
//border:5px solid #193441;
      var ShutterPlacesWindowHelperScriptElement = document.createElement('div');
      ShutterPlacesWindowHelperScriptElement.id = ShutterPlacesWindowHelperScriptId;

      var glassPanel = document.createElement('div');
      glassPanel.style.cssText = glassStyle;

      var content = document.createElement('div');
      content.style.cssText = contentStyle;

      var dialog = document.createElement('div');
      dialog.style.cssText = dialogStyle;
      dialog.id = 'translate';
      var dismissLink = _createDismissLink(dismissText||closeText);
      dismissLink.style.cssText = dismissLink.style.cssText+';display:block;background-color:#193441;'+
      'text-align:center;padding:4px;font:normal 15px/17px \'PT Sans\',Arial';

      content.appendChild(dismissLink);
      var iframe = document.createElement('iframe');
      iframe.src = linkHref;
      iframe.id = TranslateIframeId;
      iframe.width = "100%";
      iframe.height = "100%";
      content.appendChild(iframe);

      dialog.appendChild(content);

      ShutterPlacesWindowHelperScriptElement.appendChild(glassPanel);
      ShutterPlacesWindowHelperScriptElement.appendChild(dialog);
      return ShutterPlacesWindowHelperScriptElement;
    }

    function _setElementText(element, text) {
        element.innerHTML = text;
    }

    function ChangeHref(new_href){
      var iframe = document.getElementById(TranslateIframeId);
      iframe.src = new_href;
    }

    function _createDismissLink(dismissText) {
      var dismissLink = document.createElement('a');
      _setElementText(dismissLink, dismissText||closeText);
      dismissLink.id = dismissLinkId;
      dismissLink.href = '#';
      dismissLink.style.cssText = 'color:#fff;margin:4px 10px 10px;text-decoration:none;font:normal 15px/17px \'PT Sans\',Arial';
      return dismissLink;
    }

    function _dismissLinkClick() {
      _close();
      return false;
    }

    function _showShutterPlacesWindowHelperScript(dismissText, linkHref) {
      var translateChoiceElement = document.getElementById(ShutterPlacesWindowHelperScriptId);
      if (translateChoiceElement != null) {
        translateChoiceElement.style.display = 'block';
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
    }

    function _close() {
      var translateChoiceElement = document.getElementById(ShutterPlacesWindowHelperScriptId);
      if (translateChoiceElement != null) {
        translateChoiceElement.style.display = 'none';
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
      url = 'http://www.bing.com/translator/?from='+from_lang+'&to='+to_lang;
      }
      var el = document.createElement('div');

      var css = document.createElement('style');

      css.innerHTML = ['#'+buttonId+'{position:fixed',
      'padding:0 10px',
      'background:#0191D6',
      'color:#fff',
      'font-size:15px',
      'text-shadow:1px 1px 0 #333, -1px 1px 0 #333, 1px -1px 0 #333, -1px -1px 0 #333',
      'margin:0',
      'left:40%',
      'right:40%',
      'max-width:200px',
      'cursor: pointer',
      'border: 0',
      'top: 0',
      'line-height: 34px',
      'max-height:36px',
      'overflow:hidden',
      'text-align:center'].join(';')+'}';
      css.innerHTML += '#'+buttonId+':hover{'+['background:#4a9cbc'].join(';')+'}'; 
      el.id = buttonId;
      el.innerHTML = buttonText;
      document.body.appendChild(css.cloneNode(true));
      document.body.appendChild(el.cloneNode(true));
      document.getElementById(buttonId).onclick = _buttonIdClick;
    }

    function _buttonIdClick(){
      Dialog(buttonText,closeText,url);
    }

function TranslatorInit(callback,args){
if (typeof Microsoft == 'undefined'){
if (typeof $ == 'undefined') {$={browser:{msie:null}};}
else if (typeof $.browser == 'undefined') {$.browser={msie:null};}
(function(f,e,n,k,i){
if(!e.getElementById('trans_landing_script')){var n=e.createElement(n),y=e.getElementsByTagName(i)[0];n.setAttribute('id','trans_landing_script');n.async=1;n.src=k;y.appendChild(n);if(typeof(Microsoft) == 'undefined'){n.onload = function() {
Microsoft={Translator:{Configurations:{rttAppId:Microsoft.Translator.Configurations.rttAppId}}};e.getElementById('trans_landing_script').remove();
var id = Microsoft.Translator.Configurations.rttAppId;
// callback.call(this,id);
}}}})(window,document,'script','http://www.bing.com/translator/dynamic/js/LandingPage.js','head');
}
}

    var exports={Button:Button,Dialog:Dialog,TranslatorInit:TranslatorInit,ChangeHref:ChangeHref};
    exports.id = {'id':id,'ShutterPlacesWindowHelperScriptId':ShutterPlacesWindowHelperScriptId,'dismissLinkId':dismissLinkId,
'buttonId':buttonId,'fl':fl,'tl':tl,'url':url,'closeText':closeText,'buttonText':buttonText};
    return exports;
  })();

  window.ShutterPlacesWindowHelperScript = ShutterPlacesWindowHelperScript;
  return ShutterPlacesWindowHelperScript;
})(this);
