// ==UserScript==
// @name       Facebook remove adds
// @namespace  http://gubnota.github.io/fenki_js_helpers/plugin/monkey/fb_remove_adds/
// @version    0.1.4
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
if (r.test(el[i].innerHTML)) {el[i].style.visibility='hidden';el[i].style.height="1px";}
}
var a = document.querySelectorAll('._5jmm._5pat._3lb4.d_1earfv54ng._x72,._4ikz');
var ads = false;
for (var i = 0; i< a.length; i++){
	ads = false;
	var b = a[i].querySelectorAll('span');
	for (var j = 0; j<b.length;j++){
	if (b[j].innerText == 'Рекомендуемая публикация' || b[j].innerText == 'Реклама') ads=true;
	}
	if (ads) {a[i].style.visibility='hidden';a[i].style.height="10px";}
}

    },100);
})();

