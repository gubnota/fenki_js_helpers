// ==UserScript==
// @name       Youtube video links inserter
// @namespace  http://git.gubnota.ru/fenki_js_helpers/plugin/monkey/
// @version    0.1
// @downloadURL http://git.gubnota.ru/fenki_js_helpers/plugin/monkey/youtube_download_links/main.user.js
// @description removes adds block in Vk.com
// @include        https?://*.youtube.com/*
// @include        https?://youtube.com/*
// @copyright  2015+, Vladislav Muravyev
// @grant          none
// @icon http://git.gubnota.ru/fenki_js_helpers/plugin/monkey/youtube_download_links/yt.png
// @run-at document-end
// ==/UserScript==
(function(window, undefined){
var w = window;
    // Пример: подключение jquery.min.js
    // (function(a,b){function ci(a) ... a.jQuery=a.$=d})(w);

    // [3] не запускаем скрипт во фреймах
    // без этого условия скрипт будет запускаться несколько раз на странице с фреймами
    if (w.self != w.top) {
        return;
    }
    // [4] дополнительная проверка наряду с @include
    if (/:\/\/.*youtube\.com\//.test(w.location.href)) {
        //Ниже идёт непосредственно код скрипта
        var el = document.getElementById('youtube_download_links_window_helper_script');
        if (el === null) {
(function(f,e,n,k,i){
var n=e.createElement(n),y=e.getElementsByTagName(i)[0];
n.setAttribute('id','youtube_download_links_window_helper_script');
n.async=1;n.src=k;y.appendChild(n);

if(typeof(IFrameWindowHelper) == 'undefined'){
    n.onload = function() {ShutterPlacesWindowHelperScript.Button();}
}

})(window,document,'script','//git.gubnota.ru/fenki_js_helpers/plugin/monkey/youtube_download_links/window_helper.js','head');
        }//undefined el
    }//url pattern
})(window);
