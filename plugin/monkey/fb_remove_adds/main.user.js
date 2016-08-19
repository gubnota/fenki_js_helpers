// ==UserScript==
// @name       Facebook remove adds
// @namespace  http://gubnota.github.io/fenki_js_helpers/plugin/monkey/fb_remove_adds/
// @version    0.1.3
// @downloadURL http://gubnota.github.io/fenki_js_helpers/plugin/monkey/fb_remove_adds/main.user.js
// @description removes adds block in Facebook
// @include      https://www.facebook.com/*
// @copyright  2015+, Vladislav Muravyev
// @author Vladislav Muravyev
// @grant          none
// @icon http://gubnota.github.io/fenki_js_helpers/plugin/monkey/fb_remove_adds/fb.ico
// @run-at document-end
// ==/UserScript==
(function(){
var t = setInterval(function(){
var el = document.getElementsByClassName('ego_column');
    for(var i =0; i<el.length; i++){
    el[i].remove();//clearInterval(t);
    }

var r = RegExp(/">Реклама<\/a>/);
el = document.querySelectorAll('._5jmm._5pat._3lb4._59m._x72'); for(var i=0; i<el.length; i++) {
if (r.test(el[i].innerHTML)) el[i].remove();
}

    },100);
})();

