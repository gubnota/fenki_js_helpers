// ==UserScript==
// @name       *mail.yandex.ru blocks all images from amazon, ebay, optional load images by click
// @namespace  http://gubnota.github.io/fenki_js_helpers/plugin/monkey/mail_yandex_ru_adds/
// @version    0.0.4
// @downloadURL http://gubnota.github.io/fenki_js_helpers/plugin/monkey/mail_yandex_ru_adds/hide_img.user.js
// @description removes adds block(s) in mail.yeah.net
// @include      http://*mail.yandex.*/*
// @include      https://*mail.yandex.*/*
// @copyright  2016+, Vladislav Muravyev
// @author Vladislav Muravyev
// @grant          none
// @icon http://gubnota.github.io/fenki_js_helpers/plugin/monkey/mail_yandex_ru_adds/yandex.ico
// @run-at document-start
// ==/UserScript==
(function(){

var imgscope='.mail-Message-Body *',/*image searching scope*/
empty_dot="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==",/*.placedb-letter*/
click_handlers='.ns-view-messages-item',/*on click which items to (re)-run hide images*/
insert_button_place='.mail-Message-Toolbar-Item',/*where to insert show images button*/
button_id='show_img',/*button id to show images*/
button_code='<span id="show_img" class="mail-Message-Toolbar-Item-Text" style="cursor:pointer;">Показать картинки</span>',
button_where='afterBegin',
button_from='Показ',
button_to='Спрят',
button_search='з',
main_interval_reload=2000;
function bgimg_handler(el){
if(el.style.backgroundImage){
	if (!el.getAttribute('old-bgimg')){
	el.setAttribute('old-bgimg',el.style.backgroundImage.replace(/(.*)/,'/*$1*/'));
	el.style.backgroundImage="url("+empty_dot+")";
	}
	else{
	el.style.backgroundImage=el.getAttribute('old-bgimg').replace(/\/\*(.*)\*\//,'$1');
	el.removeAttribute('old-bgimg');
	}
}
}
function attr_handler(el,attr){
	attr.forEach(function(at){
	if (!el.getAttribute('old-'+at) && el.getAttribute(at)){
	el.setAttribute('old-'+at,el.getAttribute(at));
	el.setAttribute(at,empty_dot);
	}
	else if (el.getAttribute('old-'+at)){
	el.setAttribute(at,el.getAttribute('old-'+at));
	el.removeAttribute('old-'+at);
	}
	});
}

function hide_show_letter_img(){
[].forEach.call(document.querySelectorAll(imgscope),function(el) {
bgimg_handler(el);/*bg-img*/

if (el.nodeName=='IMG') {
	bgimg_handler(el);
	attr_handler(el,['src','srcset']);
}/*img src*/
});}

function init_find_place(){
var a = document.querySelectorAll(insert_button_place);
var b=document.getElementById(button_id);

if (b === null && a.length>0){
a[0].insertAdjacentHTML(button_where,button_code);hide_show_letter_img();
}

if (b!==null){
b.onclick=function(e){var i=e.target.innerText;
var t=button_to,f=button_from;
if(i.indexOf(button_search)>-1){f=button_to;t=button_from;}
e.target.innerText=i.replace(f,t);hide_show_letter_img();
};}
}



document.addEventListener("DOMContentLoaded", function(){init_find_place();});
init_find_place();
window.onload=function(){init_find_place();var t = setInterval(function(){init_find_place();},main_interval_reload);
document.addEventListener('DOMNodeInserted',function(e){init_find_place();});
};
})();