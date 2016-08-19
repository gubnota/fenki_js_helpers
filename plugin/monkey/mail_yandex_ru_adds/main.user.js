// ==UserScript==
// @name       mail.yandex.ru adds and news remover
// @namespace  http://gubnota.github.io/fenki_js_helpers/plugin/monkey/mail_yandex_ru_adds/
// @version    0.1.1
// @downloadURL http://gubnota.github.io/fenki_js_helpers/plugin/monkey/mail_yandex_ru_adds/main.user.js
// @description removes adds block(s) in mail.yeah.net
// @include      http://mail.yandex.*/*
// @copyright  2016+, Vladislav Muravyev
// @author Vladislav Muravyev
// @grant          none
// @icon http://gubnota.github.io/fenki_js_helpers/plugin/monkey/mail_yandex_ru_adds/yandex.ico
// @run-at document-end
// ==/UserScript==
(function(){
var t = setInterval(function(){

var el = document.querySelectorAll('.b-messages__message'); for(var i=0; i<el.length; i++) {
if(el[i].getAttribute('data-id')===null) el[i].remove();
}

var el = document.querySelectorAll('.b-folders__nesting'); for(var i =0; i<el.length; i++){
    el[i].remove();
}

var el = document.querySelectorAll('.block-informer-news'); for(var i=0; i<el.length; i++) {
	el[i].remove();
}

    },400);
})();
