// ==UserScript==
// @name       Shutterstock show places table
// @namespace  http://gubnota.github.io/fenki_js_helpers/plugin/monkey/
// @version    0.1.4
// @downloadURL http://gubnota.github.io/fenki_js_helpers/plugin/monkey/shutter_places/main.user.js
// @description removes adds block in Vk.com
// @include        http://submit.shutterstock.com/home.mhtml*
// @include        https://submit.shutterstock.com/home.mhtml*
// @copyright  2012+, Vladislav Muravyev
// @grant          none
// @icon http://gubnota.github.io/fenki_js_helpers/plugin/monkey/shutter_places/ss.png
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
    if (/:\/\/submit\.shutterstock\.com\/home.mhtml/.test(w.location.href)) {
        //Ниже идёт непосредственно код скрипта
        var el = document.getElementById('shutter_places_window_helper_script');
        if (el === null) {
(function(f,e,n,k,i){


var n=e.createElement(n),y = e.getElementsByTagName(n)[0];
n.setAttribute('id','shutter_places_window_helper_script');
n.async=1;n.src=k;y.parentNode[i](n, y);

if(typeof(IFrameWindowHelper) == 'undefined'){
    n.onload = function() {ShutterPlacesWindowHelperScript.Button();}
}

})(window,document,'script','//gubnota.github.io/fenki_js_helpers/plugin/monkey/shutter_places/window_helper.js','insertBefore');
        }//undefined el
    }//url pattern
})(window);
