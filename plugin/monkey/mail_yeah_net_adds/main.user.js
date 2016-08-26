// ==UserScript==
// @name       mail.yeah.net adds remover
// @namespace  http://gubnota.github.io/fenki_js_helpers/plugin/monkey/mail_yeah_net_adds/
// @version    0.1.3
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
var el = document.querySelectorAll('.xd0,.gWel-promt,.gWel-tabs-promt,.gWel-tabs-panel,.gWel-tabs-panel-hasBg,#_mail_tabitem_2_34,.js-component-popup'); for(var i =0; i<el.length; i++){
    el[i].remove();//clearInterval(t);
}

var el = document.querySelectorAll('.nui-block'); for(var i=0; i<el.length; i++) {
	el[i].remove();
}

var el = document.querySelectorAll('#dvMultiTab li'); for(var i=0; i<el.length; i++) {
	if(el[i].title.match('一元夺宝')) el[i].remove();
}
var el = document.querySelectorAll('.tN0'); for(var i=0; i<el.length; i++) {
if(el[i].id.match('_AdDiv')) el[i].remove();
}
var el = document.querySelectorAll('.sV0'); for(var i=0; i<el.length; i++) {
if(el[i].innerHTML.match('马上领取|免费|广告')) el[i].remove();
}
var el = document.querySelectorAll('.En0'); for(var i=0; i<el.length; i++) {
if(el[i].innerHTML.match('马上领取|免费|广告')) el[i].remove();
}
    },100);
})();
