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

<script>(function(f,e,n,k,i){if(!e.getElementById('iframe_window_helper_script')){var n=e.createElement(n),y=e.getElementsByTagName(i)[0];n.setAttribute('id','iframe_window_helper_script');n.async=1;n.src=k;y.appendChild(n);if(typeof(IFrameWindowHelper) == 'undefined'){n.onload = function() {
IFrameWindowHelper.Button("Bing Translate","Collapse");}}}})(window,document,'script','./iframe_window_helper.js','head');</script>

 Or:

<script src="./iframe_window_helper.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', function(event) {
    cookieChoices.IFrameWindowHelper("Bing Translate","Collapse");
  });
</script>
*/

(function(window) {

  if (!!window.IFrameWindowHelper) {
    return window.IFrameWindowHelper;
  }

  var document = window.document;
  // IE8 does not support textContent, so we should fallback to innerText.
  var supportsTextContent = 'textContent' in document.body;

  var IFrameWindowHelper = (function() {
    var IFrameWindowHelperId = 'ihelperChoiceInfo';
    var dismissLinkId = 'ihelperChoiceDismiss';
    var buttonId = 'ihelperButtonOpen';
    var fl = 'zh-CHS';
    var closeText = 'Close';
    function _createDialogElement(dismissText, linkHref) {
      var glassStyle = 'position:fixed;width:100%;height:100%;z-index:999;' +
          'top:0;left:0;opacity:0.3;filter:alpha(opacity=30);' +
          'background-color:#000;';
      var dialogStyle = 'z-index:1000;position:fixed;top:0';
      var contentStyle = 'position:fixed;height:100%;width:100%;' +
          'background-color:#4a9cbc;padding:10px 0;box-shadow:4px 4px 25px #888;font: 15px/17px "PT Sans",Arial;';
//border:5px solid #193441;
      var ihelperWindowElement = document.createElement('div');
      ihelperWindowElement.id = IFrameWindowHelperId;

      var glassPanel = document.createElement('div');
      glassPanel.style.cssText = glassStyle;

      var content = document.createElement('div');
      content.style.cssText = contentStyle;

      var dialog = document.createElement('div');
      dialog.style.cssText = dialogStyle;
      dialog.id = 'ihelper';
      var dismissLink = _createDismissLink(dismissText);
      dismissLink.style.cssText = dismissLink.style.cssText+';display:block;background-color:#193441;'+
      'text-align:center;padding:4px;font:normal 15px/17px \'PT Sans\',Arial';

      content.appendChild(dismissLink);
      var iframe = document.createElement('iframe');
      iframe.src = linkHref;
      iframe.width = "100%";
      iframe.height = "100%";
      content.appendChild(iframe);

      dialog.appendChild(content);

      ihelperWindowElement.appendChild(glassPanel);
      ihelperWindowElement.appendChild(dialog);
      return ihelperWindowElement;
    }

    function _setElementText(element, text) {
      if (supportsTextContent) {
        element.textContent = text;
      } else {
        element.innerText = text;
      }
    }

    function _createDismissLink(dismissText) {
      var dismissLink = document.createElement('a');
      _setElementText(dismissLink, dismissText);
      dismissLink.id = dismissLinkId;
      dismissLink.href = '#';
      dismissLink.style.cssText = 'color:#fff;margin:4px 10px 10px;text-decoration:none;font:normal 15px/17px \'PT Sans\',Arial';
      return dismissLink;
    }

    function _dismissLinkClick() {
      _close();
      return false;
    }

    function _showIFrameWindowHelper(dismissText, linkHref) {
        // _close();
      var ihelperChoiceElement = document.getElementById(IFrameWindowHelperId);
      if (ihelperChoiceElement != null) {
        ihelperChoiceElement.style.display = 'block';
      }
      else{
        var consentElement = 
            _createDialogElement(dismissText, linkHref);
        var fragment = document.createDocumentFragment();
        fragment.appendChild(consentElement);
        document.body.appendChild(fragment.cloneNode(true));
        document.getElementById(dismissLinkId).onclick = _dismissLinkClick;
        }
    }

    function Bar(dismissText, linkHref) {
      _showIFrameWindowHelper(dismissText, linkHref, false);
    }

    function Dialog(dismissText, linkHref) {
      _showIFrameWindowHelper(dismissText, linkHref, true);
    }

    function _close() {
      var ihelperChoiceElement = document.getElementById(IFrameWindowHelperId);
      if (ihelperChoiceElement != null) {
        ihelperChoiceElement.style.display = 'none';
      }
    }
// Cookie detector of current lang, you can also use window.navigator.language to detect it
    function _get_user_lang() {
      var match = document.cookie.match(new RegExp('lang=([^;]+)'));
      if (match && match[1] != undefined) return match[1].toString();
      return IFrameWindowHelper.fl;
    }

    function Button(buttonText,closeText){
      IFrameWindowHelper.closeText = closeText;
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
      var from_lang = _get_user_lang();
      if (from_lang == 'zh') from_lang = 'zh-CHS';
      (from_lang == 'ru') ? to_lang = 'zh-CHS' : to_lang = 'ru';
      Dialog(IFrameWindowHelper.closeText,'http://www.bing.com/translator/?from='+from_lang+'&to='+to_lang);
    }


    var exports = {};
    exports.Button = Button;
    exports.Dialog = Dialog;
    return exports;
  })();

  window.IFrameWindowHelper = IFrameWindowHelper;
  return IFrameWindowHelper;
})(this);
