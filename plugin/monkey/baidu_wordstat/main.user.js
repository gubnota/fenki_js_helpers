// ==UserScript==
// @name       Baidu wordstat
// @namespace  http://gubnota.github.io/fenki_js_helpers/plugin/monkey/baidu_wordstat/
// @version    0.0.1
// @downloadURL http://gubnota.github.io/fenki_js_helpers/plugin/monkey/baidu_wordstat/main.user.js
// @description removes adds block in Vk.com
// @include        http://fengchao.baidu.com/nirvana/main.html*
// @include        https://fengchao.baidu.com/nirvana/main.html*
// @copyright  2016+, Vladislav Muravyev
// @author Vladislav Muravyev
// @grant          none
// @icon http://gubnota.github.io/fenki_js_helpers/plugin/monkey/baidu_wordstat/bw.png
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
    if (/:\/\/fengchao.baidu.com/.test(w.location.href)) {
var t = setInterval(function() {
        //Ниже идёт непосредственно код скрипта
        var el = document.getElementsByClassName('aopkg_detail_word');
        if (typeof el == 'undefined') {}
        else{
            for(var i=0; i < el.length; i++) {
            el[i].children[0].innerText=el[i].children[0].title;
            }
        }
}, 1000);
    }
})(window);
