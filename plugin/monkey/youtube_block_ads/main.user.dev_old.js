// ==UserScript==
// @name       Youtube video adds blocker
// @namespace  http://gubnota.github.io/fenki_js_helpers/plugin/monkey/
// @version    0.1.1
// @downloadURL http://gubnota.github.io/fenki_js_helpers/plugin/monkey/youtube_block_ads/main.user.js
// @description adds links to download video at Youtube.com
// @include        https://*.youtube.com/*
// @include        https://youtube.com/*
// @include        http://*.youtube.com/*
// @include        http://youtube.com/*
// @copyright  2016+, Vladislav Muravyev
// @author Vladislav Muravyev
// @grant          none
// @icon http://gubnota.github.io/fenki_js_helpers/plugin/monkey/youtube_block_ads/yb.png
// @run-at document-end
// ==/UserScript==
(function(window, undefined){
var w = window;
    if (w.self != w.top) return;
setInterval(function(e) {
var a = document.getElementsByClassName('html5-video-player')[0];
if (a !== undefined){
//a.className = a.className.replace('ad-showing','');
//a.className = a.className.replace('ad-interrupting','');
a.className = a.className.replace('ytp-autohide','');
}
var a = document.getElementsByClassName('videoAdUiPreSkipContainer')[0],
ev = new Event('click'), ev2 = new Event('touchend'),
b = document.getElementsByClassName('ytp-next-button')[0];
if (a !== undefined) 
    {
a.style.visibility="hidden";
document.getElementsByClassName('videoAdUiSkipContainer')[0].style.display="block";
a = document.getElementsByClassName('videoAdUiSkipButton')[0];
if (a !== undefined) {a.dispatchEvent(ev);a.dispatchEvent(ev2);}
    return;
    }
a = document.getElementsByClassName('video-ads')[0];
if (a !== undefined) 
    {
      if (b !== undefined) 
      {
      a.remove();
      b.dispatchEvent(ev);
      }
    return;
    }

}, 200);
})(window);

