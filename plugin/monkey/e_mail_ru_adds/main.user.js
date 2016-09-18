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

var el = document.querySelectorAll('#b-sticky_left_banners'); for(var i=0; i<el.length; i++) {
el[i].style.display='none';
}
    },400);
})();
