// Yandex/Google Tracking-B-Gone
// version 0.0.1
// Release Date: 2014-02-28
//
// ===== INSTRUCTIONS =====
//
// This is a Greasemonkey user script.
//
// To use this script, get Greasemonkey (Firefox) / Tampermonkey (Chrome) / NinjaKit (Safari) or Violentmonkey (Opera)
// https://greasyfork.org/ru/scripts/986-%E7%99%BE%E5%BA%A6%E7%BD%91%E7%9B%98%E5%8A%A9%E6%89%8B
// After you've installed it, come back to this page. A dialog box will
// appear asking you if you want to install this script.
// Alternatively, install usercript manually by copy this code and Create new one.
// To uninstall, go to Tools->Greasemonkey->Manage User Scripts, select
// "Google Tracking-B-Gone" from the list on the left, and click
// Uninstall.
//
// ==UserScript==
// @name           Yandex/Google Tracking-B-Gone
// @namespace      http://gubnota.github.io/fenki_js_helpers/plugin/monkey/strip_track_search_res/
// @version        0.1.1
// @copyright  2015+, Vladislav Muravyev
// @author Vladislav Muravyev
// @description    Strips click tracking from Yandex/Google search results
// @downloadURL http://gubnota.github.io/fenki_js_helpers/plugin/monkey/strip_track_search_res/main.user.js
// @include        http://*.google.*
// @include        https://*.google.*
// @include        http://91.213.30.151
// @include        http://95.173.210.42
// @include        http://yandex.*
// @include        https://yandex.*
// @run-at document-end
// @grant          none
// ==/UserScript==
// if (/yandex./.test(document.domain) || /ya.ru/.test(document.domain)){
// var as = document.getElementsByTagName('a');
// for(var i=0; i< as.length; i++){
//     if(as[i].classList.contains('b-link')){
//     as[i].setAttribute('onmousedown','');
//     }
//    }
//b__link
// }//only for google domains
//if(/google/.test(document.domain)){
doIt(); // make sure we run at least once, regardless of search results page version
doRTR(); // strip tracking from inital batch of real-time search results

document.addEventListener('DOMAttrModified', function (event) {
if (/google./.test(document.domain)){
  if (event.target.id == 'gsr' || event.target.id == 'foot') {
    doIt();
  }
}//google search
else if (/yandex./.test(document.domain) || /ya.ru/.test(document.domain)){
  if (event.target.classList.contains('b-link')) {
    doIt();
  }
}//yandex search
}, false);

document.addEventListener('DOMNodeInserted', function (event) {
if (/google./.test(document.domain)){
  if (event.target.parentNode.id == 'rtr') {
    doRTR(event.target);
    console.log('doRTR(event.target)');
  }
}//google search
else if (/yandex./.test(document.domain) || /ya.ru/.test(document.domain)){
  if (event.target.classList && event.target.classList.contains('main-portion')) {
    doIt();
    // doRTR(event.target);
    // console.log('doRTR(event.target)');
  }
}//yandex search
}, false);

function doIt() {
  var resultLinks = $x("//a[@onmousedown]", XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
  resultLinks.forEach(function(link) {  // loop over links
    if (link.getAttribute('onmousedown')) {
      link.removeAttribute('onmousedown');
    }
  });
  resultLinks = $x("//a");
  resultLinks.forEach(function(link) {  // loop over links
    var oldLink = link.href;
    if (/^https?:\/\/.*.google\./.test(oldLink)) {
      var matches = /url\?(url|q)=(.+?)&/.exec(oldLink);
      if (matches !== null) {
        link.href = unescape(matches[2]);
      }
    }
  });
}

function doRTR() {
  var resultLinks = [];
  if (arguments[0] === undefined) {
    // get all real-time result links
    resultLinks = $x("//div[@id='rtr']//a", XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
  } else {
    // get all links from the current real-time result
    resultLinks = $x(arguments[0], "//a", XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
  }
  resultLinks.forEach(function(link) {  // loop over every link
    var oldLink = link.href; console.log(link.href);
    if (/^https?:\/\/.*.google\./.test(oldLink)) {
      var matches = /url\?(url|q)=(.+?)&/.exec(oldLink);
      if (matches !== null) {
        link.href = unescape(matches[2]);
      }
    }
  });
}

// XPath helper, from
// http://wiki.greasespot.net/Code_snippets
function $x() {
  var x='',          // default values
      node=document,
      type=0,
      fix=true,
      i=0,
      toAr=function(xp){      // XPathResult to array
  var final=[], next;
  while(next=xp.iterateNext())
    final.push(next);
  return final
      },
      cur;
  while (cur=arguments[i++])      // argument handler
    switch(typeof cur) {
      case "string":x+=(x=='') ? cur : " | " + cur;continue;
      case "number":type=cur;continue;
      case "object":node=cur;continue;
      case "boolean":fix=cur;continue;
    }
  if (fix) {      // array conversion logic
    if (type==6) type=4;
    if (type==7) type=5;
  }
  if (!/^\//.test(x)) x="//"+x;            // selection mistake helper
    if (node!=document && !/^\./.test(x)) x="."+x;  // context mistake helper
  var temp=document.evaluate(x,node,null,type,null); //evaluate!
  if (fix)
    switch(type) {                              // automatically return special type
      case 1:return temp.numberValue;
      case 2:return temp.stringValue;
      case 3:return temp.booleanValue;
      case 8:return temp.singleNodeValue;
      case 9:return temp.singleNodeValue;
    }
  return fix ? toAr(temp) : temp;
}
