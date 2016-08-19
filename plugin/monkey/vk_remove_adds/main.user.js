// ==UserScript==
// @name       Vk remove adds
// @namespace  http://gubnota.github.io/fenki_js_helpers/plugin/monkey/vk_remove_adds/
// @version    0.1.4
// @downloadURL http://gubnota.github.io/fenki_js_helpers/plugin/monkey/vk_remove_adds/main.user.js
// @description removes adds block in Vk.com
// @include        http://*.vk.com/*
// @include        https://*.vk.com/*
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
var t = setInterval(function() {
        var el = document.getElementById('ads_left'); if (el !== null) el.remove();
        el = document.getElementById('wall_text_name_explain_promoted_post')||undefined;
        if (typeof el != 'undefined' && el.count>0) {
        el = el[0];
        el = el.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
        if (el.classList.contains('feed_row')) el.remove();
        }
        el = document.getElementsByClassName('ads_ads_news_wrap')||undefined;
        if (el !== null){
        for(var i=0; i<el.length; i++) {
            el[i].setAttribute('style','display:none;');
            el.innerHTML = '';
       }}
}, 100);
})(window);
