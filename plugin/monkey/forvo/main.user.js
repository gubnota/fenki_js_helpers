// ==UserScript==
// @name       Forvo links
// @namespace  http://gubnota.github.io/fenki_js_helpers/plugin/monkey/forvo/
// @version    0.0.2
// @downloadURL http://gubnota.github.io/fenki_js_helpers/plugin/monkey/forvo/main.user.js
// @description Forvo links
// @include        http://*.forvo.com/*
// @include        https://*.forvo.com/*
// @include        http://forvo.com/*
// @include        https://forvo.com/*
// @copyright  2018+, Larry Moore
// @author Larry Moore
// @grant          none
// @run-at document-end
// ==/UserScript==
(function(window, undefined){
var w = window;
    // без этого условия скрипт будет запускаться несколько раз на странице с фреймами
    if (w.self != w.top) {
        return;
    }
var a = document.getElementsByClassName('play');
for (var i = a.length - 1; i >= 0; i--) {
var b = a[i].getAttribute('onclick');
if (/^PlayPhrase\(/.test(b))
    {
    var g = /'([^\']+)'/.exec(b);
if (g[1] !== undefined) 
    {
       a[i].setAttribute('onclick','window.open(\'//audio00.forvo.com/phrases/mp3/'+atob(g[1])+'\')');
    }

    }
else if (/^Play\(/.test(b)) {
    var g = /'([^\']+)'/.exec(b);
if (g[1] !== undefined) 
    {
       a[i].setAttribute('onclick','window.open(\'//audio00.forvo.com/mp3/'+atob(g[1])+'\')');
    }
    }
}

})(window);
