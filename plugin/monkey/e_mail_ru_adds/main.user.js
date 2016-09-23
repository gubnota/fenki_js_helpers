// ==UserScript==
// @name       e.mail.ru adds and news remover
// @namespace  http://gubnota.github.io/fenki_js_helpers/plugin/monkey/e_mail_ru_adds/
// @version    0.1.2
// @downloadURL http://gubnota.github.io/fenki_js_helpers/plugin/monkey/e_mail_ru_adds/main.user.js
// @description removes adds block(s) in mail.yeah.net
// @include      http://e.mail.ru/*
// @include      https://e.mail.ru/*
// @copyright  2016+, Vladislav Muravyev
// @author Vladislav Muravyev
// @grant          none
// @icon http://gubnota.github.io/fenki_js_helpers/plugin/monkey/e_mail_ru_adds/yandex.ico
// @run-at document-end
// ==/UserScript==
(function(){
var t = setInterval(function(){
[].forEach.call(document.querySelectorAll('#YaDirectLine,#rb-direct-left-slot,#AdLeftInformer,.b-slot_left_banner'),function(el) {
el.remove();});
},400);
})();
