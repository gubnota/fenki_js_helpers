// ==UserScript==
// @name       Video grabber
// @namespace  http://gubnota.github.io/fenki_js_helpers/plugin/monkey/
// @version    0.0.1
// @downloadURL http://gubnota.github.io/fenki_js_helpers/plugin/monkey/video_grabber/main.user.js
// @description try to grab video urls from iframes etc. (edit localhost to domain-specific keyword)
// @include        https://*.localhost/*
// @include        https://localhost/*
// @include        http://*.localhost/*
// @include        http://localhost/*
// @copyright  2020+, Larry Moore
// @author Larry Moore
// @grant          none
// @icon http://gubnota.github.io/fenki_js_helpers/plugin/monkey/video_grabber/icon.png
// @run-at document-end
// ==/UserScript==
(function(window, undefined){
var w = window;
    if (w.self != w.top) {
        return;
    }
// url pattern test
// if (/:\/\/www\.domain\.com\//.test(w.location.href)) {
        var el = document.getElementById('video_grabber_window_helper_script');
        if (el === null) {
(function(f,e,n,k,i){
var n=e.createElement(n);
n.setAttribute('id','video_grabber_window_helper_script');
n.async=true;
n.src=k;
if(typeof(IFrameWindowHelper) == 'undefined'){
// browser specific condition: if (/Safari/g.test(window.navigator.appVersion)){window_helper.js}
n.onload = function(){VideoGrabberWindowHelperScript.Button('');};
}
(e[i]('head')[0] || e[i]('body')[0]).appendChild(n);
})(window,document,'script',(6 == document.location.protocol.length ? 'https:' : 'http:') + '//gubnota.github.io/fenki_js_helpers/plugin/monkey/video_grabber/window_helper.js','getElementsByTagName');

        }//undefined el
//}//url pattern
})(window);