// ==UserScript==
// @name       Vk remove adds
// @namespace  http://gubnota.github.io/fenki_js_helpers/plugin/monkey/vk_remove_adds/
// @version    0.1.2
// @downloadURL http://gubnota.github.io/fenki_js_helpers/plugin/monkey/vk_remove_adds/main.user.js
// @description removes adds block in Vk.com
// @include        http://vk.com/*
// @include        https://vk.com/*
// @copyright  2015+, Vladislav Muravyev
// @author Vladislav Muravyev
// @grant          none
// @icon http://gubnota.github.io/fenki_js_helpers/plugin/monkey/vk_remove_adds/vk.ico
// @run-at document-end
// ==/UserScript==
(function(window, undefined){
var w = window;
    // В юзерскрипты можно вставлять практически любые javascript-библиотеки.
    // Код библиотеки копируется прямо в юзерскрипт.
    // При подключении библиотеки нужно передать w в качестве параметра окна window
    // Пример: подключение jquery.min.js
    // (function(a,b){function ci(a) ... a.jQuery=a.$=d})(w);

    // [3] не запускаем скрипт во фреймах
    // без этого условия скрипт будет запускаться несколько раз на странице с фреймами
    if (w.self != w.top) {
        return;
    }
    // [4] дополнительная проверка наряду с @include
    if (/:\/\/vk.com/.test(w.location.href)) {
var t = setInterval(function() {
        //Ниже идёт непосредственно код скрипта
        var el = document.getElementById('left_ads');
        if (typeof el == 'undefined') {}
        else{
        var style = el.getAttribute('style')||'';
        style = style.replace('block','none');
        el.setAttribute('style',style);
        el.innerHTML = '';
        }
        var el = document.getElementsByClassName('ads_ads_news_wrap');
        if (typeof el == 'undefined') {}
        else if(el.length>0){
            el[0].setAttribute('style','display:none;');
            el.innerHTML = '';
}
}, 1000);
    }
})(window);
