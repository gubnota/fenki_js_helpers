// ==UserScript==
// @name       mail.yeah.net adds remover
// @namespace  http://gubnota.github.io/fenki_js_helpers/plugin/monkey/mail_yeah_net_adds/
// @version    0.1.1
// @downloadURL http://gubnota.github.io/fenki_js_helpers/plugin/monkey/mail_yeah_net_adds/main.user.js
// @description removes adds block(s) in mail.yeah.net
// @include      http://mail.yeah.net/*
// @copyright  2015+, Vladislav Muravyev
// @author Vladislav Muravyev
// @grant          none
// @icon http://gubnota.github.io/fenki_js_helpers/plugin/monkey/mail_yeah_net_adds/yeah.ico
// @run-at document-end
// ==/UserScript==
(function(){
var t = setInterval(function(){
var el = document.querySelectorAll('.xd0,.gWel-promt,.gWel-tabs-promt,.gWel-tabs-panel,.gWel-tabs-panel-hasBg,#_mail_tabitem_2_34');
    for(var i =0; i<el.length; i++){
    el[i].remove();//clearInterval(t);
    }
    },100);
})();
