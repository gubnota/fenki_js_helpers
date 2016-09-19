// ==UserScript==
// @name       e.mail.ru blocks inlined images from amazon, ebay
// @3namespace  http://gubnota.github.io/fenki_js_helpers/plugin/monkey/e_mail_ru_adds/
// @version    0.0.1
// @3downloadURL http://gubnota.github.io/fenki_js_helpers/plugin/monkey/e_mail_ru_adds/ebay_amazon_image.user.js
// @description removes adds block(s) in mail.yeah.net
// @include      https://e.mail.ru/*
// @include      https://*mailru.webagent.mail.ru/webim/agent/rpc.html?*
// @copyright  2016+, Vladislav Muravyev
// @author Vladislav Muravyev
// @grant          none
// @icon http://gubnota.github.io/fenki_js_helpers/plugin/monkey/e_mail_ru_adds/yandex.ico
// @run-at document-end
// ==/UserScript==
(function(){var t = setInterval(function(){

var el = (document.querySelectorAll('.b-contact-informer-target')[0]||{}).innerText || "";

if (el.match(/amazon/gi) || el.match(/ebay/gi)) {

var el = document.querySelectorAll('div.b-letter__body *'); for(var i=0; i<el.length; i++) {el[i].style.backgroundImage='none';}
el = document.querySelectorAll('div.b-letter__body img'); for(var i=0; i<el.length; i++) {el[i].src='';}

}

},50);
})();