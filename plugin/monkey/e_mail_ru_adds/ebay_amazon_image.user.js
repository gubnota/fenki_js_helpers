// ==UserScript==
// @name       e.mail.ru blocks all images from amazon, ebay, optional load images by click
// @3namespace  http://gubnota.github.io/fenki_js_helpers/plugin/monkey/e_mail_ru_adds/
// @version    0.0.2
// @3downloadURL http://gubnota.github.io/fenki_js_helpers/plugin/monkey/e_mail_ru_adds/ebay_amazon_image.user.js
// @description removes adds block(s) in mail.yeah.net
// @include      https://e.mail.ru/*
// @include      https://*mailru.webagent.mail.ru/webim/agent/rpc.html?*
// @copyright  2016+, Vladislav Muravyev
// @author Vladislav Muravyev
// @grant          none
// @icon http://gubnota.github.io/fenki_js_helpers/plugin/monkey/e_mail_ru_adds/yandex.ico
// @run-at document-start
// ==/UserScript==
(function(){

var imgscope='div.b-letter__body *,.b-letter__head__avatar,div.b-letter__body img',/*image searching scope*/
empty_dot="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==";/*.placedb-letter*/
click_handlers='.b-datalist__item',/*on click which items to (re)-run hide images*/
insert_button_place='.b-letter__head__date',/*where to insert show images button*/
button_id='show_img',/*button id to show images*/
button_code='&nbsp;<span id="show_img" style="color:#15c;cursor:pointer;text-decoration:underline">Показать картинки</span>',
button_from='Показ',
button_to='Спрят',
button_search='з',
main_interval_reload=2000;
function hide_show_letter_img(){
[].forEach.call(document.querySelectorAll(imgscope),function(el) {
var empty_dot="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==";
if(el.style.backgroundImage){
	if (!el.getAttribute('old-bgimg')){
	el.setAttribute('old-bgimg',el.style.backgroundImage.replace(/(.*)/,'/*$1*/'));
	el.style.backgroundImage="url("+empty_dot+")";
	}
	else{
	el.style.backgroundImage=el.getAttribute('old-bgimg').replace(/\/\*(.*)\*\//,'$1');
	el.removeAttribute('old-bgimg');
	}
}/*bg-img*/

if (el.nodeName=='IMG') {
	if (!el.getAttribute('old-src')){
	el.setAttribute('old-src',el.getAttribute('src'));el.setAttribute('src',empty_dot);
	}
	else{
	el.setAttribute('src',el.getAttribute('old-src'));
	el.removeAttribute('old-src');
	}
}/*img src*/
});}

function init_find_place(){
var a = document.querySelectorAll(insert_button_place);
var b=document.getElementById(button_id);

if (b === null && a.length>0){
a[0].insertAdjacentHTML('BeforeEnd',button_code);hide_show_letter_img();
}

if (b!==null){
b.onclick=function(e){var i=e.target.innerText;
var t=button_to,f=button_from;
if(i.indexOf(button_search)>-1){f=button_to;t=button_from;}
e.target.innerText=i.replace(f,t);hide_show_letter_img();
};}
}



document.addEventListener("DOMContentLoaded", function(){
init_find_place();
setTimeout(function(){init_find_place();},100);
});
init_find_place();
window.onload=function(){
init_find_place();
setTimeout(function(){init_find_place();},100);
setTimeout(function(){init_find_place();},200);
var t = setInterval(function(){init_find_place();},main_interval_reload);
document.addEventListener('DOMNodeInserted',function(e){setTimeout(function(){init_find_place();},50);});
};
})();