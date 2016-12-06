// ==UserScript==
// @name       mail.yandex.ru adds and news remover
// @namespace  http://gubnota.github.io/fenki_js_helpers/plugin/monkey/mail_yandex_ru_adds/
// @version    0.1.3
// @downloadURL http://gubnota.github.io/fenki_js_helpers/plugin/monkey/mail_yandex_ru_adds/main.user.js
// @description removes adds block(s) in mail.yeah.net
// @include      http://mail.yandex.*/*
// @include      https://mail.yandex.*/*
// @copyright  2016+, Vladislav Muravyev
// @author Vladislav Muravyev
// @grant          none
// @icon http://gubnota.github.io/fenki_js_helpers/plugin/monkey/mail_yandex_ru_adds/yandex.ico
// @run-at document-start
// ==/UserScript==
(function(){
var t = setInterval(function(){
var a = document.querySelectorAll('.mail-FolderList'); if (a.length>1) {for(var i=0; i<a.length; i++){if (i!==3) {a[i].style="background:#fff !important;opacity:0;height:1px !important;min-height:1px !important;overflow:hidden !important";}}}
var el = document.querySelectorAll('.b-direct_messages'); for(var i=0; i<el.length; i++) {
el[i].style.display='none';
}

var el = document.querySelectorAll('.b-messages__message'); for(var i=0; i<el.length; i++) {
if(el[i].getAttribute('data-id')===null) el[i].style.display='none';
}

var el = document.querySelectorAll('.b-folders__nesting'); for(var i =0; i<el.length; i++){
    el[i].remove();
}

var el = document.querySelectorAll('.block-informer-news'); for(var i=0; i<el.length; i++) {
	el[i].remove();
}

    },400);
})();
