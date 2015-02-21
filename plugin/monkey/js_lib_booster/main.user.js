// ==UserScript==
// @name       js_lib_booster
// @namespace  http://gubnota.ru/
// @version    0.1
// @description  Replace Google CDN with my jquery libs
// @copyright  2015+, Vladislav Muravyev
// @author Vladislav Muravyev
// @grant          none
// @downloadURL http://gubnota.github.io/fenki_js_helpers/plugin/monkey/js_lib_booster/main.user.js
// @icon http://gubnota.github.io/fenki_js_helpers/plugin/monkey/js_lib_booster/g.png
// @run-at document-start
// ==/UserScript==
// itteration across DOM elems http://callmenick.com/2014/03/10/javascript-foreach-loop/
// http://localhost/p/cdn/jquery/
window.onload = function(){
[].slice.call(document.getElementsByTagName('script')).forEach(function(el,i){
    if (el.src && el.src.match('/yandex.st/') ){
        if ( el.src.match('/1.')) {
        var replace = '//gubnota.github.io/fenki_js_helpers/plugin/monkey/js_lib_booster/jquery-1.11.2.min.js';
        }
        else if ( el.src.match('/2.')){
        var replace = '//gubnota.github.io/fenki_js_helpers/plugin/monkey/js_lib_booster/jquery-2.1.3.min.js';
        }
    }
    if (el.src && el.src.match('/ajax.googleapis.com/') ){
    if (el.src && ( el.src.match('/jquery.') || el.src.match('/jquery/') || el.src.match('/jquery-'))){
    if ( el.src.match('/1.') || el.src.match('1.6') || el.src.match('1.7') || el.src.match('1.8') || el.src.match('1.9') || el.src.match('1.10'))
    var replace = '//gubnota.github.io/fenki_js_helpers/plugin/monkey/js_lib_booster/jquery-1.11.2.min.js';
    else if ( el.src.match('/2.') || el.src.match('2.0') || el.src.match('2.1') || el.src.match('2.2') || el.src.match('2.3'))
    var replace = '//gubnota.github.io/fenki_js_helpers/plugin/monkey/js_lib_booster/jquery-2.1.3.min.js';
    }
    var new_el = document.createElement('script'); new_el.src = replace;
    var parent = el.parentElement;
    }
    if (typeof replace !='undefined'){
    var new_el = document.createElement('script'); new_el.src = replace;
    var parent = el.parentElement;
//  var new2_el = document.createElement('script');
       new_el.src = replace;
    var parent = el.parentElement;
  parent.removeChild(el);
  parent.appendChild(new_el);
//  alert(el.src+' '+new_el.src);
// parent.replaceChild(new_el, el);
            }

});
};


/*
var script = document.createElement('script');
script.src = 'http://localhost/';
document.getElementsByTagName('head')[0].appendChild(script);
*/
